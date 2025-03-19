"use client";

import { useState } from "react";
import ScrapURLForm from "@/components/ScrapURLForm";
import ScrapResult from "@/components/ScrapResult";
import { ThemeToggle } from "@/components/ThemeToggle";

type ScrapResultType = {
  title: string;
  description: string;
  content: string;
  contentHtmls: string[];
  links: { url: string; content: string }[];
} | null;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [scrapResult, setScrapResult] = useState<ScrapResultType>(null);

  const handleScrapResult = (result: ScrapResultType) => {
    if (!result) return;
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
