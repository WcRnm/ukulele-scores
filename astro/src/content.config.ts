import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const scores = defineCollection({
    loader: glob({ pattern: '**/**/*.md', base: './src/content'}),
    schema: () => z.object({
        name: z.string(),
        ver: z.string(),
        tuning: z.string(),

        arranger: z.string().optional(),
        composer: z.string(),

        pdf: z.string(), 

        yt: z.string().optional(),
        note: z.string().optional(),
    }),
});

export const collections = { scores };