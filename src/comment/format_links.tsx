import { TriggerContext } from "@devvit/public-api";
import { getCommentEngines } from "../settings/getters.js";
import { getReverseImageSearchURL } from "../helpers.js";

/**
 * Formats the links section of the RISE comment by linking to each chosen RISE for each image.
 */
export async function formatLinks(images: string[], context: TriggerContext): Promise<string> {

	const engines = await getCommentEngines(context);
	let message = "Reverse Image Search:\n\n";


	// For every image in the post
	for (const [i, image] of images.entries()) {

		// Add image count if there is more than one image
		if (images.length > 1) {
			message += `Image ${i + 1}: `;
		}

		// For every RISE selected, add the link to the RISE in the comment
		for (const [j, engine] of engines.entries()) {
			switch (engine) {
				case "google-images":
					//message += `[Google Images](${getReverseImageSearchURL(engine, image)})`;
					message += `[Google Lens](${getReverseImageSearchURL(engine, image)})`;
					break;
				case "google-lens":
					message += `[Google Lens](${getReverseImageSearchURL(engine, image)})`;
					break;
				case "sauce-nao":
					message += `[SauceNAO](${getReverseImageSearchURL(engine, image)})`;
					break;
				case "iqdb":
					message += `[IQDB](${getReverseImageSearchURL(engine, image)})`;
					break;
				case "yandex":
					message += `[Yandex](${getReverseImageSearchURL(engine, image)})`;
					break;
			}

			// Add a seperator if not the last engine
			if (!(j === engines.length - 1)) {
				message += " || ";
			} else {
				message += "\n\n";
			}
		}
	}

	return message + "\n";
}