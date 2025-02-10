/**
 * Returns the MenuOptionEngine setting: what RISE to use for the menu option function.
 */
export async function getMenuOptionEngine(context: any) {
	const listPreference = await context.settings.get("search-engine") || ["google-images"];
	return Array.isArray(listPreference) ? String(listPreference[0]) : String(listPreference);
}

/**
 * Returns the CommentTrigger setting: what posts to check for the RISE comment.
 * - returns an empty array if function is not enabled.
 */
export async function getCommentTrigger(context: any) {
	const enable = Boolean(await context.settings.get("comment-enable")) || false;
	const rawOptions = await context.settings.get("comment-trigger") || [];
	const options = Array.isArray(rawOptions) ? rawOptions : [];

	if (!enable) {
		return [];
	} else {
		const rawOptions = await context.settings.get("comment-trigger") || [];
		return Array.isArray(rawOptions) ? rawOptions : [];
	}
}

/**
 * Returns the CommentHeader settings: message to attach to the top of the RISE comment.
 */
export async function getCommentHeader(context: any) {
	return String(await context.settings.get("comment-header")) || "";
}

/**
 * Returns the CommentEngine setting: what RISE to use for the comment function.
 */
export async function getCommentEngines(context: any) {
	const rawOptions = await context.settings.get("comment-search-engines") || [];
	return Array.isArray(rawOptions) ? rawOptions : []; // Unpack array
}

/**
 * Returns the CommentModOptions setting: what mod options to apply to the comment.
 */
export async function getCommentModOptions(context: any) {
	const rawOptions = await context.settings.get("comment-mod-options") || [];
	return Array.isArray(rawOptions) ? rawOptions : []; // Unpack array
}

/**
 * Returns the CommentWhitelist settings: what posts the RISE comment should be made under.
 */
export async function getCommentWhitelist(context: any) {
	const rawTitleRegex = await context.settings.get("wl-title-regex");
	const titleRegex = rawTitleRegex ? RegExp(JSON.parse(JSON.stringify(rawTitleRegex))) : null;

	return {
		titleRegex, // Will be null if no regex is provided
		flairTexts: (String(await context.settings.get("wl-flair-text")) || "") // Divide the input flairs text into a
			// string array
			.split(",")
			.map((flair) => flair.trim().toLowerCase())
			.filter((flair) => flair.length > 0),
		flairIDs: (String(await context.settings.get("wl-flair-id")) || "") // Divide the input flairs IDs into a
			// string array
			.split(",")
			.map((flair) => flair.trim())
			.filter((flair) => flair.length > 0)
	};
}

/**
 * Returns the CommentBlacklist settings: what posts the RISE comment should NOT be made under.
 */
export async function getCommentBlacklist(context: any) {
	const rawTitleRegex = await context.settings.get("bl-title-regex");
	const titleRegex = rawTitleRegex ? RegExp(JSON.parse(JSON.stringify(rawTitleRegex))) : null;

	return {
		titleRegex, // Will be null if no regex is provided
		flairTexts: (String(await context.settings.get("bl-flair-text")) || "") // Divide the input flairs text into a
			// string array
			.split(",")
			.map((flair) => flair.trim().toLowerCase())
			.filter((flair) => flair.length > 0),
		flairIDs: (String(await context.settings.get("bl-flair-id")) || "") // Divide the input flairs IDs into a
			// string array
			.split(",")
			.map((flair) => flair.trim())
			.filter((flair) => flair.length > 0)
	};
}