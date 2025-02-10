import { Post } from "@devvit/public-api";
import { getPostParams } from "./helpers.js";
import { getCommentBlacklist, getCommentWhitelist } from "../settings/getters.js";

/**
 * Given a set of post parameters and a black/whitelist settings,
 * returns a boolean on whether the given Post matches the given criteria.
 * - whitelist: all criteria must be true.
 * - blacklist: all criteria must be false.
 */
export function checkPostParams(postParams: {
	id: string, title: string, flairText: string, flairID: string,
}, settings: {
	titleRegex: RegExp | null, flairTexts: string[], flairIDs: string[]
}, listPreference: string): boolean {

	// Unpack settings
	const {titleRegex, flairTexts, flairIDs} = settings;
	const def = listPreference == "whitelist"; // Default: True for whitelist, False for blacklist

	// Title check
	const titlePass = titleRegex ? titleRegex.test(postParams.title) : def;

	// Flair text check
	const flairTextPass = flairTexts.length > 0 ? flairTexts.includes(postParams.flairText.toLowerCase()) : def;

	// Flair ID check
	const flairIDPass = flairIDs.length > 0 ? flairIDs.includes(postParams.flairID) : def;

	// Whitelist: all criteria must be true
	// Blacklist: all criteria must be false
	return def ? titlePass && flairTextPass && flairIDPass : !(titlePass || flairTextPass || flairIDPass);
}

/**
 * Given a Post,
 * compare it against the black/white list and,
 * returns true if it's a match.
 */
export async function checkPost(context: any, post: Post) {
	const postParams = await getPostParams(post, context);

	return checkPostParams(postParams, await getCommentWhitelist(context), "whitelist") && checkPostParams(postParams,
		await getCommentBlacklist(context), "blacklist");
}