import { NextResponse } from "next/server";
import { extractContent } from "@wrtnlabs/web-content-extractor";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Fetch the HTML content from the URL
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 500 }
      );
    }

    const html = await response.text();
    
    // Extract content using the web-content-extractor
    const { title, description, content, contentHtmls, links } = extractContent(html);

    return NextResponse.json({
      title,
      description,
      content,
      contentHtmls,
      links
    });
  } catch (error) {
    console.error("Error scraping URL:", error);
    return NextResponse.json(
      { error: "Failed to scrape URL" },
      { status: 500 }
    );
  }
}
