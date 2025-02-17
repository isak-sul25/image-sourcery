import { Devvit } from "@devvit/public-api";

/**
 * App Settings:
 * - select: choose reverse image search engine
 */
const addSettings = () => {
	Devvit.addSettings([
		{
			type: "select",
			required: true,
			name: "search-engine",
			label: "Reverse Image Search Engine Menu Option",
			defaultValue: ["google-lens"], // Default to Google Images
			helpText: "Select the reverse image search engine to be used for the menu option on the subreddit.",
			options: [
				{label: "Google Lens", value: "google-lens"},
				{label: "SauceNAO", value: "sauce-nao"},
				{label: "IQDB", value: "iqdb"},
				{label: "Yandex", value: "yandex"}
			]
		}, {
			type: "group",
			label: "Reverse Image Search Comment",
			helpText: "Post a comment linking to the chosen reverse image search engines under image posts. This"
			          + " works for multi-image posts and will provide a link for each image in the gallery.",
			fields: [
				{
					type: "boolean",
					name: "comment-enable",
					required: true,
					defaultValue: false,
					label: "Enable Reverse Image Search Comment?"
				}, {
					type: "select",
					multiSelect: true,
					name: "comment-trigger",
					label: "Trigger",
					defaultValue: ["new-post"],
					helpText: "Choose when the app should check posts. If a comment already exists, it will be"
					          + " edited instead.",
					options: [
						{label: "On New Posts", value: "PostCreate"}, {label: "On Flair Update", value: "PostFlairUpdate"}
					]
				}, {
					type: "paragraph",
					name: "comment-header",
					label: "Comment Header",
					helpText: "Enter a message to be attached to the top of the comment (most AutoModerator"
					          + " placeholders are supported)."
				}, {
					type: "select",
					name: "comment-search-engines",
					label: "Reverse Image Search Engines",
					required: true,
					multiSelect: true,
					defaultValue: ["google-lens", "sauce-nao"], // Default to Google Images and SauceNAO
					helpText: "Select the reverse image search engines to use in the comment.",
					options: [
						{label: "Google Lens", value: "google-lens"},
						{label: "SauceNAO", value: "sauce-nao"},
						{label: "IQDB", value: "iqdb"},
						{label: "Yandex", value: "yandex"},
					],
					onValidate: event => validateAtLeastOneSelected(event.value)
				}, {
					type: "select",
					name: "comment-mod-options",
					label: "Moderator Options",
					multiSelect: true,
					defaultValue: ["lock"],
					helpText: "Select moderator actions for the automated comment (locked by default).",
					options: [
						{label: "Distinguish", value: "distinguish"}, {label: "Sticky", value: "sticky"}
					]
				}
			]
		}, {
			type: "group",
			label: "Whitelist",
			helpText: "Specify conditions for posts to include in the reverse image search comment automation.",
			fields: [
				{
					type: "string",
					name: "wl-title-regex",
					label: "Title Regex",
					helpText: "Specify a regex pattern to match post titles for inclusion. Leave blank for no title"
					          + " filtering.",
					onValidate: event => validateRegex(event.value)
				}, {
					type: "paragraph",
					name: "wl-flair-text",
					label: "Flair Text",
					helpText: "Specify flair text (comma-separated) to include in the reverse image search automation."
					          + " Leave blank for no whitelist.",
					onValidate: event => validateCommaSeparatedList(event.value)
				}, {
					type: "paragraph",
					name: "wl-flair-id",
					label: "Flair IDs",
					helpText: "Specify flair IDs (comma-separated) to include in the reverse image search"
					          + " automation. Leave blank for no whitelist.",
					onValidate: event => validateCommaSeparatedList(event.value)
				}
			]
		}, {
			type: "group",
			label: "Blacklist",
			helpText: "Specify conditions for posts to exclude from the reverse image search comment automation.",
			fields: [
				{
					type: "string",
					name: "blacklist-title-regex",
					label: "Title Regex",
					helpText: "Specify a regex pattern to match post titles for exclusion. Leave blank for no title"
					          + " filtering.",
					onValidate: event => validateRegex(event.value)
				}, {
					type: "paragraph",
					name: "blacklist-flair",
					label: "Flair Text",
					helpText: "Specify flair text (comma-separated) to exclude from the reverse image search"
					          + " automation. Leave blank for no blacklist.",
					onValidate: event => validateCommaSeparatedList(event.value)
				}, {
					type: "paragraph",
					name: "blacklist-flair-id",
					label: "Flair IDs",
					helpText: "Specify flair IDs (comma-separated) to exclude from the reverse image search"
					          + " automation. Leave blank for no blacklist.",
					onValidate: event => validateCommaSeparatedList(event.value)
				}
			]
		}
	]);
};

/**
 * Check the correctness of a Regex pattern.
 */
function validateRegex(value: string | undefined) {
	const input = value ?? ""; // If value is undefined, use an empty string
	try {
		new RegExp(input); // Test the regex pattern
	} catch {
		return "Invalid regex pattern.";
	}
}

/**
 * Check the correctness of a comma-separated list of strings.
 */
function validateCommaSeparatedList(value: string | undefined) {
	const input = value ?? ""; // If value is undefined, use an empty string

	if (input && !/^[^,]+(,[^,]+)*$/.test(input)) {
		return "Invalid format. Must be comma-separated list (e.g., \"Value1, Value2\").";
	}
}

/**
 * Ensure at least one selection is made.
 */
function validateAtLeastOneSelected(value: string[] | undefined) {
	if (!value || value.length === 0) {
		return "At least one search engine must be selected.";
	}
}

export { addSettings };