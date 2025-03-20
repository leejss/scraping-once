"use client";

import { create } from "zustand";
import { ScrapeResponse } from "@/app/api/scrape/route";

interface ScrapResultLoaderState {
  selectedHistoryItem: ScrapeResponse | null;
  setSelectedHistoryItem: (item: ScrapeResponse) => void;
  clearSelectedHistoryItem: () => void;
}

export const useScrapResultLoader = create<ScrapResultLoaderState>((set) => ({
  selectedHistoryItem: null,
  setSelectedHistoryItem: (item: ScrapeResponse) =>
    set({ selectedHistoryItem: item }),
  clearSelectedHistoryItem: () => set({ selectedHistoryItem: null }),
}));
