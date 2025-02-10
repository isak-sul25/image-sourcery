import { Post, TriggerContext } from "@devvit/public-api";
import { getCommentHeader } from "../settings/getters.js";
import { formatLinks } from "./format_links.js";
import { formatHeader } from "./format_header.js";


/**
 * Returns the RISE comment with a formatted header, links section and footer.
 */
export async function getCommentMessage(url: string, galleryImages: string[], post: Post,
                                        context: TriggerContext): Promise<string> {
	const footer = "\n\n---\n*I am a bot, and this action was performed automatically. "
	               + "Please [contact the moderators of this subreddit](https://www.reddit.com/message/compose/?to=/r/"
	               + post.subredditName + ") if you have any questions or concerns.*";
	let images = new Array<string>();

	if (galleryImages.length > 0) {
		images = galleryImages;
	} else if (url) {
		images.push(url);
	} else {
		return "";
	}

	// Format optional header message
	const rawHeader = await getCommentHeader(context);
	const header = rawHeader ? await formatHeader(rawHeader, post) + "\n\n---\n" : "";

	// Format the reverse image search links
	const links = await formatLinks(images, context);

	return header + links + footer;
}