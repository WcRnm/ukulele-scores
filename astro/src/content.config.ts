import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guitar = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/guitar'}),
    schema: () => z.object({
        name: z.string(),
        ver: z.string(),
        tuning: z.string(),

        arranger: z.string().optional(),
        composer: z.string(),

        pdf: z.string(), 

        yt: z.string().optional(),
    }),
});

export const collections = { guitar };