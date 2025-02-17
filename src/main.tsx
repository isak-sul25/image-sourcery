import { Comment, Context, Devvit, MenuItemOnPressEvent } from "@devvit/public-api";
import { getCommentModOptions, getCommentTrigger } from "./settings/getters.js";
import { checkPost } from "./list_check/list_check.js";
import { getImageURL, getReverseImageSearchURL, getThumbnail, isDirectImageURL } from "./helpers.js";
import { getCommentMessage } from "./comment/message.js";
import { addSettings } from "./settings/settings.js";

Devvit.configure({redditAPI: true});

// Initialise settings
addSettings();

/**
 * Adds a Menu Option to posts
 *
 * Provides a link to search the post image on a given Reverse Image Search Engine,
 * or showToast if post type is not supported.
 *
 */
Devvit.addMenuItem({
	location: "post", label: "Reverse Image Search",

	onPress: async(event: MenuItemOnPressEvent, context: Context) => {
		const {ui} = context;
		const image_url: string = await getImageURL(event, context);

		if (image_url) {
			const search_engine_value = await context.settings.get("search-engine") || ["google-lens"]; // Get chosen search engine, default to Google Images
			const search_engine = Array.isArray(search_engine_value) ? search_engine_value[0] : search_engine_value; // Unpack array

			ui.navigateTo(getReverseImageSearchURL(search_engine.toString(), image_url));
		} else {
			ui.showToast(`Post type not supported!`);
		}
	}
});

/**
 * Trigger on new Post or/and FlairUpdate,
 * - check if RISE comment option is enabled and the Post matches the post requirements (black/white list),
 * - if yes, add a RISE comment to the post.
 */
Devvit.addTrigger({
	events: ["PostCreate", "PostFlairUpdate"], onEvent: async(event, context) => {
		console.log("New Post.");
		const postV2 = event.post;

		if (!postV2) {
			return;
		}

		const triggers = await getCommentTrigger(context);

		// Return if function is not enabled or the trigger is not selected.
		if (!triggers.includes(event.type)) {
			return;
		}

		// Check original post for crossposts
		//const postId = postV2.crosspostParentId ? postV2.crosspostParentId : postV2.id;
		const postId = postV2.id;
		const post = await context.reddit.getPostById(postId);

		// Check white/black list
		if (!(await checkPost(context, post))) {
			console.log("New post doesn't match requirements - ignoring...");
			return;
		}

		let postURL = post.url;

		// Continue if an image or gallery
		if (isDirectImageURL(postURL) || postV2.galleryImages.length > 0) {

			// Else, check if crosspost and get thumbnail
		} else if (postV2.crosspostParentId) {
			postURL = await getThumbnail(await context.reddit.getPostById(postV2.crosspostParentId));

			if (!postURL) {
				console.log("New crosspost doesn't contain thumbnail - ignoring...");
				return;
			}
		} else {
			console.log("New post doesn't contain images - ignoring...");
			return;
		}

		console.log("New post matches requirements - processing comment...");

		const commentMessage = await getCommentMessage(postURL, postV2.galleryImages, post, context);
		const modOptions = await getCommentModOptions(context);

		let comment: Comment | undefined;
		const allComments = await post.comments.all();

		// Check if a comment by the app already exists and edit it instead of making a new one if yes
		if (allComments.length > 0) {
			for await (const [i, oldComment] of allComments.entries()) {
				if (oldComment.authorName == context.appName) {
					comment = oldComment;
					await comment.edit({
						text: commentMessage
					});
					break;
				} else if (i === allComments.length - 1) {
					comment = await post.addComment({
						text: commentMessage
					});
				}
			}
		} else {
			comment = await post.addComment({
				text: commentMessage
			});
		}

		// Apply mod options, or change them as needed if editing an existing comment
		// ?? Some of the methods throw weird errors that don't interfere with the functionality, ignoring...
		if (comment) {

			if (!comment.locked) {
				await comment.lock().catch((error) => {
				});
			}

			// Set comment mod options
			if (modOptions.length > 0) {

				if (modOptions.includes("sticky")) {

					if (!comment.isStickied()) {
						await comment.distinguish(true).catch((error) => {
						});
					}
				} else if (modOptions.includes("distinguish")) {
					if (comment.isStickied()) {
						await comment.undistinguish().catch((error) => {
						});
						await comment.distinguish(false).catch((error) => {
						});
					} else if (!comment.isDistinguished()) {
						await comment.distinguish(false).catch((error) => {
						});
					}
				}
			} else if (comment.isDistinguished()) {
				await comment.undistinguish().catch((error) => {
				});
			}
		} else {
			console.log("Failed to create or edit a comment.");
		}
	}
});

export default Devvit;