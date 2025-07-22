import { defineCollection } from 'astro:content';

export const collections = {
  about: defineCollection({
    type: 'content',
    schema: () => ({}),
  }),
};