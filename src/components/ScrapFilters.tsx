"use client";

import { useFilter } from "@/context/FilterContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ScrapFilters() {
  const { filterOptions, toggleLinks } = useFilter();

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-medium">Display Options</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-links" className="cursor-pointer">
            Show Links
          </Label>
          <Switch
            id="show-links"
            checked={filterOptions.showLinks}
            onCheckedChange={toggleLinks}
          />
        </div>
      </div>
    </div>
  );
}
