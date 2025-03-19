"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useScrapHistory } from "@/context/ScrapHistoryContext";

// Zod schema for URL validation
const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

interface ScrapURLFormProps {
  onScrapResultAction: (result: {
    title: string;
    description: string;
    content: string;
    contentHtmls: string[];
    links: { url: string; content: string }[];
  }) => void;
  isLoading: boolean;
  setIsLoadingAction: (isLoading: boolean) => void;
}

export default function ScrapURLForm({
  onScrapResultAction,
  isLoading,
  setIsLoadingAction,
}: ScrapURLFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { addToHistory } = useScrapHistory();

  const validateUrl = (value: string): boolean => {
    try {
      urlSchema.parse({ url: value });
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Invalid URL");
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      setError("URL is required");
      return;
    }

    // Validate URL before submitting
    if (!validateUrl(url)) {
      return;
    }

    try {
      setIsLoadingAction(true);

      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to scrape URL");
      }

      const data = await response.json();

      // Add to history
      addToHistory({
        url,
        title: data.title || "Untitled Page",
        description: data.description || "",
      });

      onScrapResultAction(data);
    } catch (error) {
      console.error("Error scraping URL:", error);
      setError(error instanceof Error ? error.message : "Failed to scrape URL");
    } finally {
      setIsLoadingAction(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full">
          <Input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) validateUrl(e.target.value);
            }}
            placeholder="Enter URL to scrape"
            required
            aria-invalid={!!error}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Scraping..." : "Scrape"}
        </Button>
      </div>
    </form>
  );
}
