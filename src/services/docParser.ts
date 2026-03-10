import type { DocEntry } from "../types/DocEntry";
import type { Frontmatter } from "../types/Frontmatter";

const extractName = (path: string): string => {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(".md", "");
};

const parseFrontmatter = (
  raw: string,
): { readonly meta: Frontmatter; readonly body: string } => {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith("---")) {
    return {
      meta: { title: "", author: "", date: "" },
      body: raw,
    };
  }

  const endIndex = trimmed.indexOf("---", 3);
  if (endIndex === -1) {
    return {
      meta: { title: "", author: "", date: "" },
      body: raw,
    };
  }

  const yamlBlock = trimmed.slice(3, endIndex).trim();
  const body = trimmed.slice(endIndex + 3).trimStart();
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: string = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Parse inline YAML arrays: [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      const items = value
        .slice(1, -1)
        .split(",")
        .map((s) => {
          const trimmedItem = s.trim();
          if (
            (trimmedItem.startsWith('"') && trimmedItem.endsWith('"')) ||
            (trimmedItem.startsWith("'") && trimmedItem.endsWith("'"))
          ) {
            return trimmedItem.slice(1, -1);
          }
          return trimmedItem;
        })
        .filter((s) => s.length > 0);
      data[key] = items;
      continue;
    }

    // Parse numbers
    if (/^\d+$/.test(value)) {
      data[key] = Number(value);
      continue;
    }

    data[key] = value;
  }

  const meta: Frontmatter = {
    title: String(data["title"] ?? ""),
    author: String(data["author"] ?? ""),
    date: String(data["date"] ?? ""),
    ...(data["domain"] !== undefined && { domain: String(data["domain"]) }),
    ...(data["collection"] !== undefined && {
      collection: String(data["collection"]),
    }),
    ...(typeof data["part"] === "number" && { part: data["part"] }),
    ...(Array.isArray(data["tags"]) && {
      tags: data["tags"].map(String),
    }),
  };

  return { meta, body };
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
  Object.entries(docs).map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    return {
      name: extractName(path),
      content: body,
      meta,
    };
  });

const getStandaloneStories = (
  entries: readonly DocEntry[],
): readonly DocEntry[] =>
  entries.filter((e) => !e.meta.domain);

const groupByDomain = (
  entries: readonly DocEntry[],
): ReadonlyMap<string, readonly DocEntry[]> => {
  const map = new Map<string, DocEntry[]>();

  for (const entry of entries) {
    const domain = entry.meta.domain;
    if (!domain) continue;

    if (!map.has(domain)) {
      map.set(domain, []);
    }
    map.get(domain)!.push(entry);
  }

  // Sort entries within each domain: by part (if present), then by title
  for (const [, domainEntries] of map) {
    domainEntries.sort((a, b) => {
      const partA = a.meta.part ?? Infinity;
      const partB = b.meta.part ?? Infinity;
      if (partA !== partB) return partA - partB;
      return a.meta.title.localeCompare(b.meta.title);
    });
  }

  return map;
};

export { buildEntries, getStandaloneStories, groupByDomain, extractPreview };
