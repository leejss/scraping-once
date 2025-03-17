import { extractContent } from "@wrtnlabs/web-content-extractor";
import { z } from "zod";

// Zod schema for request validation
const scrapeRequestSchema = z.object({
  url: z.string().url("Invalid URL format")
});

// Zod schema for response validation
const scrapeResponseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  contentHtmls: z.array(z.string()).optional(),
  links: z.array(
    z.object({
      url: z.string(),
      content: z.string()
    })
  ).optional()
});

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const result = scrapeRequestSchema.safeParse(body);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error.errors[0].message || "Invalid request" }),
        { status: 400 }
      );
    }

    const { url } = result.data;

    // Fetch the HTML content from the URL
    const response = await fetch(url);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch URL" }),
        { status: 500 }
      );
    }

    const html = await response.text();
    
    // Extract content using the web-content-extractor
    const extractedContent = extractContent(html);
    
    // Validate the extracted content
    const validatedContent = scrapeResponseSchema.parse(extractedContent);

    return new Response(JSON.stringify(validatedContent));
  } catch (error) {
    console.error("Error scraping URL:", error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: error.errors[0].message || "Validation error" }),
        { status: 400 }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Failed to scrape URL" }),
      { status: 500 }
    );
  }
}
