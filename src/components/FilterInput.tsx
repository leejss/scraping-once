"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface FilterInputProps {
  value: string;
  onChangeAction: (value: string) => void;
  placeholder: string;
  onReset?: () => void;
}

export default function FilterInput({
  value,
  onChangeAction,
  placeholder,
  onReset,
}: FilterInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChangeAction(e.target.value)}
          placeholder={placeholder}
          className="pl-8"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1.5 h-6 w-6 p-0"
            onClick={() => onChangeAction("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {onReset && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
