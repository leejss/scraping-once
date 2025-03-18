"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type FilterOptions = {
  showContentHtmls: boolean;
  showLinks: boolean;
};

type FilterContextType = {
  filterOptions: FilterOptions;
  toggleContentHtmls: () => void;
  toggleLinks: () => void;
  resetFilters: () => void;
};

const initialFilterOptions: FilterOptions = {
  showContentHtmls: false,
  showLinks: false,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions);

  const toggleContentHtmls = () => {
    setFilterOptions((prev) => ({
      ...prev,
      showContentHtmls: !prev.showContentHtmls,
    }));
  };

  const toggleLinks = () => {
    setFilterOptions((prev) => ({
      ...prev,
      showLinks: !prev.showLinks,
    }));
  };

  const resetFilters = () => {
    setFilterOptions(initialFilterOptions);
  };

  return (
    <FilterContext.Provider
      value={{
        filterOptions,
        toggleContentHtmls,
        toggleLinks,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
