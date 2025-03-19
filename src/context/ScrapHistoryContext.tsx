"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ScrapHistoryItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  scrapedAt: string;
};

type ScrapHistoryContextType = {
  history: ScrapHistoryItem[];
  addToHistory: (item: Omit<ScrapHistoryItem, "id" | "scrapedAt">) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
};

const ScrapHistoryContext = createContext<ScrapHistoryContextType | undefined>(
  undefined,
);

export const useScrapHistory = () => {
  const context = useContext(ScrapHistoryContext);
  if (!context) {
    throw new Error(
      "useScrapHistory must be used within a ScrapHistoryProvider",
    );
  }
  return context;
};

export function ScrapHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<ScrapHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("scrapHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse history from localStorage:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("scrapHistory", JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<ScrapHistoryItem, "id" | "scrapedAt">) => {
    const newItem: ScrapHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      scrapedAt: new Date().toISOString(),
    };

    setHistory((prev) => [newItem, ...prev]);
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <ScrapHistoryContext.Provider
      value={{ history, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </ScrapHistoryContext.Provider>
  );
}
