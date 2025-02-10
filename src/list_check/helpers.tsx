import { Context, Post } from "@devvit/public-api";

/**
 * Returns the id, title, flair text and flair ID, and a bool for whether the app has commented already on a given Post.
 */
export async function getPostParams(post: Post, context: Context) {
	return {
		id: post.id,
		title: post.title,
		flairText: post.flair?.text ? post.flair.text : "",
		flairID: post.flair?.templateId ? post.flair.templateId : ""
	};
}
