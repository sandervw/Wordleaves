import type { DocEntry } from "../types/DocEntry";
import type { Frontmatter } from "../types/Frontmatter";
import type { ListEntry } from "../types/ListEntry";
import type { SidebarLink } from "../types/SidebarLink";

// Util function to split a frontmatter block from the main file content
const parseFrontmatter = (
  raw: string,
): { readonly meta: Frontmatter; readonly body: string; } => {
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
  };

  return { meta, body };
};

// Derive a URL slug from a file path, stripping the storydocs prefix and .md suffix
const deriveSlug = (path: string): string => {
  return path
    .replace(/^\.\/storydocs\//, "")
    .replace(/\.md$/, "");
};

// Util function to extract a short preview of text from the document body
const extractPreview = (content: string): string => {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const previewLines = lines.slice(1, 3).join(" ");
  const stripped = previewLines.replace(/[#*_`[\]]/g, "");
  return stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped;
};

// Convert raw markdown text into array of DocEntry objects with metadata
const buildEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DocEntry[] =>
  Object.entries(docs).map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    return {
      name: meta.title,
      slug: deriveSlug(path),
      content: body,
      meta,
    };
  });

// Return a map of domain name to array of DocEntry objects belonging to that domain
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

// Build a map from domain display name to its folder URL slug
const buildDomainSlugMap = (
  entries: readonly DocEntry[],
): ReadonlyMap<string, string> => {
  const map = new Map<string, string>();

  for (const entry of entries) {
    const domain = entry.meta.domain;
    if (!domain || map.has(domain)) continue;

    // The domain slug is the folder containing this entry
    const lastSlash = entry.slug.lastIndexOf("/");
    if (lastSlash !== -1) {
      map.set(domain, entry.slug.slice(0, lastSlash));
    }
  }

  return map;
};

// Build sidebar links for top-level domain names
const buildDomainLinks = (
  domainMap: ReadonlyMap<string, readonly DocEntry[]>,
  domainSlugMap: ReadonlyMap<string, string>,
): readonly SidebarLink[] =>
  Array.from(domainMap.keys())
    .filter((name) => !name.includes(" | "))
    .sort()
    .map((name) => ({
      label: name,
      slug: domainSlugMap.get(name) ?? name,
    }));

// Build sidebar links for story entries (no domain)
const buildStoryLinks = (
  entries: readonly DocEntry[],
): readonly SidebarLink[] =>
  entries
    .filter((e) => !e.meta.domain)
    .map((e) => ({
      label: e.meta.title || e.name,
      slug: e.slug,
    }));

// This function returns an array of page and subdomain names, given a domain/subdomain name
const getListEntries = (
  domain: string,
  domainMap: ReadonlyMap<string, readonly DocEntry[]>,
  domainSlugMap: ReadonlyMap<string, string>,
): readonly ListEntry[] => {
  const entries = domainMap.get(domain) ?? [];
  const entryList: readonly ListEntry[] = entries.map((e) => ({
    key: e.slug,
    name: e.meta.title,
    preview: extractPreview(e.content),
  }));

  const prefix = domain + " | ";
  const subdomainList: readonly ListEntry[] = Array.from(domainMap.keys())
    .filter((k) => k.startsWith(prefix) && !k.slice(prefix.length).includes(" | "))
    .sort()
    .map((fullKey) => ({
      key: domainSlugMap.get(fullKey) ?? fullKey,
      name: fullKey.slice(prefix.length),
    }));

  return [...subdomainList, ...entryList];
};

export {
  buildEntries,
  groupByDomain,
  getListEntries,
  buildDomainSlugMap,
  buildDomainLinks,
  buildStoryLinks,
};
