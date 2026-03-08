import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { DomainPage } from "./components/pages/DomainPage";
import { Sidebar } from "./components/layout/Sidebar";
import { buildEntries, buildDomainEntries } from "./services/docParser";
import type { DocEntry } from "./types/DocEntry";
import type { DomainEntry } from "./types/DomainEntry";

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

  const domain = currentPage ? (domainMap.get(currentPage) ?? null) : null;
  const pageContent =
    currentPage && !domain ? (allEntries.get(currentPage) ?? null) : null;

  const renderContent = (): ReactElement => {
    if (domain) {
      return <DomainPage domain={domain} onNavigate={setCurrentPage} />;
    }
    if (pageContent) {
      return <Page pageText={pageContent} />;
    }
    return <Homepage onNavigate={setCurrentPage} />;
  };

  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-grid-3-column">
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
