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
import { buildEntries, groupByDomain } from "./services/docParser";

// Import markdown files as set of raw strings
const allDocs = import.meta.glob("./storydocs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const allEntries = buildEntries(allDocs);
const storyEntries = allEntries.filter((e) => !e.meta.domain);
const domainMap = groupByDomain(allEntries);

const domainNames = Array.from(domainMap.keys()).sort();

const entryLookup = new Map(allEntries.map((e) => [e.name, e]));

const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const domainEntries = currentPage
    ? (domainMap.get(currentPage) ?? null)
    : null;
  const pageEntry =
    currentPage && !domainEntries
      ? (entryLookup.get(currentPage) ?? null)
      : null;

  const renderContent = (): ReactElement => {
    if (domainEntries) {
      return (
        <DomainPage
          domainName={currentPage!}
          entries={domainEntries}
          onNavigate={setCurrentPage}
        />
      );
    }
    if (pageEntry) {
      return <Page pageText={pageEntry.content} />;
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
