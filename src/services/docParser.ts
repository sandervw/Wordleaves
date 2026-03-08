import type { DocEntry } from "../types/DocEntry";
import type { DomainCardEntry, DomainEntry } from "../types/DomainEntry";

const extractName = (path: string): string => {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(".md", "");
};

const extractTitle = (content: string): string => {
  const firstLine = content.split("\n")[0] ?? "";
  return firstLine.replace(/^#+\s*/, "").trim();
};

const extractPreview = (content: string): string => {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const previewLines = lines.slice(1, 3).join(" ");
  const stripped = previewLines.replace(/[#*_`[\]]/g, "");
  return stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped;
};

const buildEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DocEntry[] =>
  Object.entries(docs).map(([path, content]) => ({
    name: extractName(path),
    content,
  }));

const buildDomainEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DomainEntry[] => {
  const domainMap = new Map<string, DomainCardEntry[]>();

  for (const [path, content] of Object.entries(docs)) {
    const parts = path.split("/");
    const domainName = parts[parts.length - 2] ?? "";
    const fileName = extractName(path);

    if (!domainMap.has(domainName)) {
      domainMap.set(domainName, []);
    }

    const cards = domainMap.get(domainName);
    if (cards) {
      cards.push({
        name: `${domainName}/${fileName}`,
        title: extractTitle(content),
        preview: extractPreview(content),
        content,
      });
    }
  }

  return Array.from(domainMap.entries()).map(([name, cards]) => ({
    name,
    cards: [...cards].sort((a, b) => {
      if (a.name.endsWith("/lore")) return -1;
      if (b.name.endsWith("/lore")) return 1;
      return 0;
    }),
  }));
};

export { buildEntries, buildDomainEntries };
