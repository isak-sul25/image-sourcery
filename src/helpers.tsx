import { Devvit, MenuItemOnPressEvent, Post } from "@devvit/public-api";

/**
 * Returns post image link or thumbnail if gallery, Imgur album, etc.
 * "" is returned if no thumbnail is available.
 */
export async function getImageURL(event: MenuItemOnPressEvent, context: Devvit.Context) {
	let image_link: string;
	const post: Post = await context.reddit.getPostById(event.targetId);

	if (isDirectImageURL(post.url)) {
		image_link = post.url;
	} else {
		image_link = await getThumbnail(post);
	}

	return image_link;
}

/**
 * Check if link is a direct image link - ends in jpeg, png, etc.
 */
export function isDirectImageURL(url: string) {
	return /\S+\.(jpe?g|png|gifv?)(\?\\S*)?$/.test(url);
}

/**
 * Get thumbnail if available, or return "" if not
 */
async function getThumbnail(post: Post): Promise<string> {
	const eThumb = await post.getEnrichedThumbnail();

	if (eThumb?.image?.url) {
		const eThumbImage = eThumb.image.url;

		// If possible, use enriched thumbnail
		if (eThumbImage.includes("/preview")) {
			// Replace "preview" with "i" (better quality) and remove query parameters
			return eThumbImage.replace("preview", "i").split("?")[0];
		}
	}

	// Normal thumbnail if enriched not available
	if (post.thumbnail?.url) {
		return post.thumbnail.url;
	}

	// Default return if no enriched thumbnail or thumbnail URL is found
	return "";
}


/**
 * Get external link to the given search engine and for the given image
 */
export function getReverseImageSearchURL(engine: string, image_url: string): string {

	switch (engine) {
		case "google-images":
			return `https://www.google.com/searchbyimage?image_url=${image_url}&client=app`;
		case "google-lens":
			return `https://lens.google.com/uploadbyurl?url=${image_url}&safe=off`;
		case "sauce-nao":
			return `https://saucenao.com/search.php?url=${image_url}`;
		case "iqdb":
			return `https://iqdb.org/?url=${image_url}`;
		case "yandex":
			return `https://yandex.com/images/search?rpt=imageview&url=${image_url}`;
		default:
			throw new Error("Invalid search engine selected.");
	}
}