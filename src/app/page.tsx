"use client";

import { useState, useEffect } from "react";
import ScrapURLForm from "@/components/ScrapURLForm";
import ScrapResult from "@/components/ScrapResult";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useScrapResultLoader } from "@/hooks/useScrapResultLoader";
import { ScrapeResponse } from "./api/scrape/shcema";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [scrapResult, setScrapResult] = useState<ScrapeResponse | null>(null);
  const { selectedHistoryItem } = useScrapResultLoader();

  // Set the scrap result from the history item when it changes
  useEffect(() => {
    if (selectedHistoryItem) {
      setScrapResult(selectedHistoryItem);
    }
  }, [selectedHistoryItem]);

  const handleScrapResult = (result: ScrapeResponse) => {
    setScrapResult(result);
  };

  return (
    <main className="py-8 px-4">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Scraping Once</h1>
          <ThemeToggle />
        </div>

        <ScrapURLForm
          onScrapResultAction={handleScrapResult}
          isLoading={isLoading}
          setIsLoadingAction={setIsLoading}
        />

        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
          </div>
        )}

        {!isLoading && scrapResult && <ScrapResult result={scrapResult} />}
      </div>
    </main>
  );
}
