import { extractContent } from "@wrtnlabs/web-content-extractor";
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

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const result = scrapeRequestSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: result.error.errors[0].message || "Invalid request",
        }),
        { status: 400 },
      );
    }

    const { url } = result.data;

    // Fetch the HTML content from the URL
    const response = await fetch(url);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch URL" }), {
        status: 500,
      });
    }

    const html = await response.text();
    // Extract content using the web-content-extractor
    const extractedContent = extractContent(html);

    const data = {
      id: crypto.randomUUID(),
      url,
      scrapedAt: Date.now(),
      ...extractedContent,
    };

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Error scraping URL:", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: error.errors[0].message || "Validation error",
        }),
        { status: 400 },
      );
    }

    return new Response(JSON.stringify({ error: "Failed to scrape URL" }), {
      status: 500,
    });
  }
}
