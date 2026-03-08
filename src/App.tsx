import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { DomainPage } from "./components/pages/DomainPage";
import { Sidebar } from "./components/layout/Sidebar";
import type { DocEntry } from "./types/DocEntry";
import type { DomainCardEntry, DomainEntry } from "./types/DomainEntry";

// Docs for story settings or design descriptions (now in subfolders)
const domainDocs = import.meta.glob("./domaindocs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Docs for actual stories
const storyDocs = import.meta.glob("./storydocs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const extractName = (path: string): string => {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(".md", "");
};

// Pull the # heading from the first line of a markdown file
const extractTitle = (content: string): string => {
  const firstLine = content.split("\n")[0] ?? "";
  return firstLine.replace(/^#+\s*/, "").trim();
};

// Grab the first couple of non-empty content lines after the title
const extractPreview = (content: string): string => {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const previewLines = lines.slice(1, 3).join(" ");
  const stripped = previewLines.replace(/[#*_`[\]]/g, "");
  return stripped.length > 150 ? stripped.substring(0, 150) + "..." : stripped;
};

// Build story entries (unchanged)
const buildEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DocEntry[] =>
  Object.entries(docs).map(([path, content]) => ({
    name: extractName(path),
    content,
  }));

// Build domain entries grouped by subfolder
const buildDomainEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DomainEntry[] => {
  const domainMap = new Map<string, DomainCardEntry[]>();

  for (const [path, content] of Object.entries(docs)) {
    // path like ./domaindocs/CorpLore/lore.md
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

const storyEntries = buildEntries(storyDocs);
const domainEntries = buildDomainEntries(domainDocs);

// Sidebar needs DocEntry[] for domains (just names, content unused)
const domainSidebarEntries: readonly DocEntry[] = domainEntries.map((d) => ({
  name: d.name,
  content: "",
}));

// Map of domain name -> DomainEntry for quick lookup
const domainMap = new Map<string, DomainEntry>(
  domainEntries.map((d) => [d.name, d]),
);

// Map of all individual content pages (stories + domain sub-docs)
const allEntries = new Map<string, string>([
  ...storyEntries.map(({ name, content }) => [name, content] as const),
  ...domainEntries.flatMap((d) =>
    d.cards.map((card) => [card.name, card.content] as const),
  ),
]);

const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const domain = currentPage ? domainMap.get(currentPage) ?? null : null;
  const pageContent =
    currentPage && !domain ? (allEntries.get(currentPage) ?? null) : null;

  const renderContent = (): ReactElement => {
    if (domain) {
      return <DomainPage domain={domain} onNavigate={setCurrentPage} />;
    }
    if (pageContent) {
      return <Page pageText={pageContent} />;
    }
    return <Homepage />;
  };

  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-flex">
        <Sidebar
          items={storyEntries}
          title="Stories"
          onNavigate={setCurrentPage}
        />
        {renderContent()}
        <Sidebar
          items={domainSidebarEntries}
          title="Domains"
          onNavigate={setCurrentPage}
        />
      </div>
    </div>
  );
};

export { App };
