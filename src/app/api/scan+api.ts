import { createFireworks } from "@ai-sdk/fireworks";
import { generateText, type ImagePart, type ModelMessage, Output } from "ai";
import { z } from "zod";

const requestSchema = z.object({
	images: z.array(z.string().min(1)),
	allergies: z.array(z.string().min(1)),
});

function parseImageDataUrl(image: string) {
	const match = image.match(/^data:(.+);base64,(.+)$/);

	if (!match) {
		return null;
	}

	const [, mediaType, base64] = match;

	if (!mediaType.startsWith("image/") || base64.length === 0) {
		return null;
	}

	return {
		mediaType,
		base64,
	};
}

const fireworks = createFireworks({
	apiKey: process.env.AI_GATEWAY_API_KEY,
});

export async function POST(request: Request) {
	const data = await request.json();

	const result = requestSchema.safeParse(data);

	if (
		!result.success ||
		result.data.images.length === 0 ||
		result.data.allergies.length === 0
	) {
		return Response.json({ error: "Invalid request data" }, { status: 400 });
	}

	const { images, allergies } = result.data;

	const parsedAllergies = allergies
		.map((allergy) => allergy.toLowerCase())
		.join(", ");

	// const prompt = [
	// 	"You are a nutritionist expert in allergies.",
	// 	"Analyze the provided images and determine whether all of them correspond to menus from a restaurant, bar, ice-cream parlour, or similar establishment.",
	// 	"If any image does not correspond to a menu, answer with incorrect image.",
	// 	`The user's allergies are: ${parsedAllergies}.`,
	// 	"If all images are menus, classify each menu item into one of three categories:",
	// 	"- canEat: Items that are safe for the user to eat.",
	// 	"- cannotEat: Items that the user should avoid.",
	// 	"- askRestaurant: Items that might be risky and require confirmation from the restaurant.",
	// ].join("\n\n");

	let prompt = `You are a nutritionist expert in allergies. Your task is to analyze the following images to determine if they all correspond to menus from a restaurant, bar, ice-cream parlour, or similar establishment. If any image does not correspond to a menu, return the JSON: {"success": false}. If all images are confirmed to be menus, proceed to analyze the content based on the user's allergies`;

	prompt += `\n\nThe user allergies are: ${parsedAllergies}.\n\n`;

	prompt += ` Classify each menu item into one of three categories:

  - **canEat**: Items that are safe for the user to eat.
  - **cannotEat**: Items that the user should avoid.
  - **askRestaurant**: Items that might be risky and require confirmation from the restaurant.

  Return the result in the following JSON format:
  {
    "canEat": [],
    "cannotEat": [],
    "askRestaurant": [],
    "success": true
  }`;

	const parsedImages = images
		.map(parseImageDataUrl)
		.filter(
			(image): image is NonNullable<ReturnType<typeof parseImageDataUrl>> =>
				image !== null,
		);

	if (parsedImages.length !== images.length) {
		return Response.json(
			{ error: "One or more images were not sent in a valid format." },
			{ status: 400 },
		);
	}

	const imageMessages: ImagePart[] = parsedImages.map((image) => ({
		type: "image",
		image: image.base64,
		mediaType: image.mediaType,
	}));

	const messages: ModelMessage[] = [
		{
			role: "user",
			content: [
				{
					type: "text",
					text: prompt,
				},
				...imageMessages,
			],
		},
	];

	try {
		console.log("Sending prompt and images to the model...");
		const { output } = await generateText({
			model: fireworks("accounts/fireworks/routers/kimi-k2p5-turbo"),
			messages,
			output: Output.object({
				schema: z.object({
					canEat: z.array(z.string()).default([]),
					cannotEat: z.array(z.string()).default([]),
					askRestaurant: z.array(z.string()).default([]),
					success: z.boolean(),
				}),
			}),
		});

		return Response.json({ output });
	} catch (error) {
		console.error("Error generating text:", error);
		return Response.json(
			{ error: "Failed to analyze the menu. Please try again." },
			{ status: 500 },
		);
	} finally {
		console.log("Finished processing the request.");
	}
}
