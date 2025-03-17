"use client";

import { useState } from "react";
import ScrapURLForm from "@/components/ScrapURLForm";
import ScrapResult from "@/components/ScrapResult";

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
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Web Content Extractor</h1>
        <p className="text-muted-foreground mb-8">
          Enter a URL to extract content using the web-content-extractor library.
        </p>
        
        <ScrapURLForm 
          onScrapResultAction={handleScrapResult}
          isLoading={isLoading}
          setIsLoadingAction={setIsLoading}
        />
        
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
        
        {!isLoading && scrapResult && <ScrapResult result={scrapResult} />}
      </div>
    </main>
  );
}
