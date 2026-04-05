import { generateText, type ImagePart, type ModelMessage, Output } from "ai";
import { ollama } from "ai-sdk-ollama";
import { z } from "zod";
import { scanOutputSchema } from "@/types/scan";

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

	const prompt = `You are a strict food menu classifier and allergy-aware nutritionist.

STEP 1 — MENU VALIDATION:
Analyze ALL provided images and determine if they are restaurant menus.

A valid menu MUST:
- Contain a list of food or drink items
- Include item names, descriptions, or prices
- Belong to a restaurant, bar, cafe, or similar

NOT a menu (FAIL immediately if ANY image matches these):
- Receipts or tickets
- Invoices
- Random food photos
- Product packaging
- Signs without food listings
- Screenshots not showing a menu
- Text documents without food items

If ANY image is NOT a valid menu, return ONLY:
{"success": false}

Do not continue to STEP 2.

STEP 2 — ALLERGY ANALYSIS:
If ALL images are valid menus, extract all menu items and classify them based on the user's allergies.

User allergies:
${parsedAllergies}

Classify each item into EXACTLY one category:

- "canEat": clearly safe (no allergens present)
- "cannotEat": clearly contains allergens
- "askRestaurant": unclear, incomplete info, or possible cross-contamination

Be conservative:
- If unsure → "askRestaurant"
- Do NOT guess ingredients

OUTPUT FORMAT (strict JSON only, no explanation):
{
  "canEat": [],
  "cannotEat": [],
  "askRestaurant": [],
  "success": true
}
`;
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
		const { output } = await generateText({
			model: ollama("gemma3:4b"),
			messages,
			output: Output.object({
				schema: scanOutputSchema,
			}),
		});

		return Response.json(output);
	} catch (error) {
		return Response.json(
			{ error: "Failed to analyze the menu. Please try again." },
			{ status: 500 },
		);
	} finally {
		console.log("IA finished.");
	}
}
