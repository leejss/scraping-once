"use client";

import React from "react";
import { History, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import {
  useScrapHistory,
  ScrapHistoryItem,
} from "@/context/ScrapHistoryContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarTrigger,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ScrapHistorySidebar() {
  const { history, removeFromHistory, clearHistory } = useScrapHistory();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const formatHistoryDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  const handleVisitUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger>
          <History className="h-5 w-5" />
          <span>Scraping History</span>
        </SidebarTrigger>
      </SidebarHeader>
      {!isCollapsed && (
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between p-2">
              <h3 className="text-lg font-semibold">History</h3>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="h-8 px-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
            <SidebarGroupContent>
              {history.length === 0 ? (
                <div className="py-4 text-center text-muted-foreground">
                  No scraping history yet
                </div>
              ) : (
                <div className="space-y-3 p-2">
                  {history.map((item) => (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onDelete={removeFromHistory}
                      onVisit={handleVisitUrl}
                      formatDate={formatHistoryDate}
                    />
                  ))}
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}

function HistoryItem({
  item,
  onDelete,
  onVisit,
  formatDate,
}: {
  item: ScrapHistoryItem;
  onDelete: (id: string) => void;
  onVisit: (url: string) => void;
  formatDate: (dateString: string) => string;
}) {
  return (
    <div className="rounded-md border bg-card p-3 shadow-sm">
      <div className="mb-1 flex items-start justify-between">
        <h4 className="line-clamp-1 text-sm font-medium">{item.title}</h4>
        <div className="flex space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onVisit(item.url)}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Visit URL</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Visit URL</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </div>
      {item.description && (
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {item.description}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {formatDate(item.scrapedAt)}
        </span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline-offset-2 hover:underline"
        >
          {new URL(item.url).hostname}
        </a>
      </div>
    </div>
  );
}
