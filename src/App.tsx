import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { DomainPage } from "./components/pages/DomainPage";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import {
  buildEntries,
  groupByDomain,
  getListEntries,
} from "./services/docParser";

// Import markdown files as set of raw strings
const allDocs = import.meta.glob("./storydocs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// From imports derive maps of names and content for all entries, grouped by domain
const allEntries = buildEntries(allDocs);
const storyEntries = allEntries.filter((e) => !e.meta.domain); // Entries without a domain
const domainMap = groupByDomain(allEntries);
const domainNames = Array.from(domainMap.keys()) // Top-level domain names (excluding subdomains)
  .filter((name) => !name.includes(" | "))
  .sort();
const entryMap = new Map(allEntries.map((e) => [e.name, e]));

/**
 * Main app component that manages navigation and rendering of content based on the current page.
 */
const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // Determine if the current page corresponds to a domain or a specific entry
  const domainEntries = currentPage
    ? (domainMap.get(currentPage) ?? null)
    : null;
  const pageEntry =
    currentPage && !domainEntries ? (entryMap.get(currentPage) ?? null) : null;

  // Determine what content to render based on the current page
  const renderContent = (): ReactElement => {
    if (domainEntries) {
      return (
        <DomainPage
          entries={getListEntries(currentPage!, domainMap)}
          onNavigate={setCurrentPage}
        />
      );
    }
    if (pageEntry) {
      return <Page title={pageEntry.name} content={pageEntry.content} />;
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
          items={domainNames}
          title="Domains"
          onNavigate={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export { App };
