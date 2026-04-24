import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortName: z.string().optional(),
    category: z.enum(['Software', 'Music', 'Fun']),
    year: z.number(),
    tagline: z.string(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects };
