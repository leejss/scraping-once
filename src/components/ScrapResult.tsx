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

      {result.contentHtmls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Content HTML Fragments</h3>
          <div className="space-y-2">
            {result.contentHtmls.map((html) => (
              <div 
                key={`html-${html.substring(0, 20)}`}
                className="p-4 border rounded-md bg-muted/50"
              >
                <pre className="whitespace-pre-wrap text-sm overflow-auto">
                  {html}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.links.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Links</h3>
          <div className="space-y-2">
            {result.links.map((link) => (
              <div 
                key={link.url}
                className="p-4 border rounded-md"
              >
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.content || link.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
