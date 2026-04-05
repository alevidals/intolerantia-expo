import { z } from "zod";

export const requestSchema = z.object({
	images: z.array(z.string().min(1)),
	allergies: z.array(z.string().min(1)),
});

export const scanOutputSchema = z.object({
	success: z.boolean(),
	canEat: z.array(z.string()).default([]),
	cannotEat: z.array(z.string()).default([]),
	askRestaurant: z.array(z.string()).default([]),
});

export type Scan = {
	id: number;
	images: string[];
	canEat: string[];
	cannotEat: string[];
	askRestaurant: string[];
};

export type ScanOutputSchema = z.infer<typeof scanOutputSchema>;
