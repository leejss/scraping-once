"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

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
        throw new Error("Failed to scrape URL");
      }

      const data = await response.json();
      onScrapResultAction(data);
    } catch (error) {
      console.error("Error scraping URL:", error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Scraping..." : "Scrape"}
        </Button>
      </div>
    </form>
  );
}
