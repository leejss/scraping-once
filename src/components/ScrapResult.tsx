"use client";

interface ScrapResultProps {
  result: {
    title: string;
    description: string;
    content: string;
    contentHtmls: string[];
    links: { url: string; content: string }[];
  } | null;
}

export default function ScrapResult({ result }: ScrapResultProps) {
  if (!result) return null;

  return (
    <div className="space-y-6 mt-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{result.title}</h2>
        {result.description && (
          <p className="text-muted-foreground">{result.description}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Content</h3>
        <div className="prose max-w-none">
          <p>{result.content}</p>
        </div>
      </div>
    </div>
  );
}
