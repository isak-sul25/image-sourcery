import { Post } from "@devvit/public-api";

/**
 * Replaces placeholders in a given message with their corresponding values.
 */
export async function formatHeader(message: string, post: Post): Promise<string> {
	// Handle AutoModerator placeholders
	const user = await post.getAuthor();
	const author = post.authorName;

	let authorFlairText = "";
	let authorFlairCssClass = "";
	let authorFlairTemplateId = ""; // Not implemented.

	if (user) {
		const flair = await user.getUserFlairBySubreddit(post.subredditName);

		if (flair) {
			authorFlairText = flair.flairText || "";
			authorFlairCssClass = flair.flairCssClass || "";
		}
	}

	const postBody = post.body;
	const permalink = post.permalink;
	const subreddit = post.subredditName;
	const kind = "submission"; // Currently, only posts are handled.
	const postTitle = post.title;
	const postUrl = post.url;
	const domain = getDomainName(postUrl);

	// Not implemented
	let mediaAuthor = "";
	let mediaAuthorUrl = "";
	let mediaTitle = "";
	let mediaDescription = "";

	message = message
		.replace(/\{\{author}}/g, author || "")
		.replace(/\{\{author_flair_text}}/g, authorFlairText || "")
		.replace(/\{\{author_flair_css_class}}/g, authorFlairCssClass || "")
		.replace(/\{\{author_flair_template_id}}/g, authorFlairTemplateId || "")

		.replace(/\{\{body}}/g, postBody || "")
		.replace(/\{\{permalink}}/g, permalink || "")
		.replace(/\{\{subreddit}}/g, subreddit || "")
		.replace(/\{\{kind}}/g, kind || "")
		.replace(/\{\{title}}/g, postTitle || "")
		.replace(/\{\{domain}}/g, domain || "")
		.replace(/\{\{url}}/g, postUrl || "")

		.replace(/\{\{media_author}}/g, mediaAuthor || "")
		.replace(/\{\{media_author_url}}/g, mediaAuthorUrl || "")
		.replace(/\{\{media_title}}/g, mediaTitle || "")
		.replace(/\{\{media_description}}/g, mediaDescription || "");

	return message;
}

/**
 * Get the domain name of a given url.
 */
function getDomainName(url: string) {
	try {
		// Create a URL object
		const urlObject = new URL(url);

		// Return the hostname (domain name)
		return urlObject.hostname;
	} catch (error) {
		console.error("Invalid URL:", error);
		return "";
	}
}