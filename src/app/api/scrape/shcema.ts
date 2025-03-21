import { z } from "zod";
// Zod schema for request validation
export const scrapeRequestSchema = z.object({
  url: z.string().url("Invalid URL format"),
});

// Zod schema for response validation
export const scrapeResponseSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string(),
  contentHtmls: z.array(z.string()),
  scrapedAt: z.number(),
  links: z.array(
    z.object({
      url: z.string(),
      content: z.string(),
    }),
  ),
});
export type ScrapeResponse = z.infer<typeof scrapeResponseSchema>;
