"use client";

import { ScrapeResponse } from "@/app/api/scrape/shcema";
import { create } from "zustand";

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
