import { Routes, Route, useParams } from "react-router-dom";
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
  buildDomainSlugMap,
  buildDomainLinks,
  buildStoryLinks,
} from "./services/docParser";

// Import markdown files as set of raw strings
const allDocs = import.meta.glob("./storydocs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// From imports derive maps of names and content for all entries, grouped by domain
const allEntries = buildEntries(allDocs);
const domainMap = groupByDomain(allEntries);
const domainSlugMap = buildDomainSlugMap(allEntries);
const slugToEntry = new Map(allEntries.map((e) => [e.slug, e]));
const slugToDomain = new Map(
  Array.from(domainSlugMap.entries()).map(([domain, slug]) => [slug, domain]),
);

// Build sidebar link data
const storyLinks = buildStoryLinks(allEntries);
const domainLinks = buildDomainLinks(domainMap, domainSlugMap);

// Resolves a URL slug to the correct page content
const ContentResolver = (): ReactElement => {
  const { "*": splat = "" } = useParams();

  const domainName = slugToDomain.get(splat);
  if (domainName) {
    return (
      <DomainPage
        entries={getListEntries(domainName, domainMap, domainSlugMap)}
      />
    );
  }

  const entry = slugToEntry.get(splat);
  if (entry) {
    return <Page title={entry.name} content={entry.content} />;
  }

  return <Homepage />;
};

const App = (): ReactElement => {
  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-grid-3-column">
        <Sidebar items={storyLinks} title="Stories" />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="*" element={<ContentResolver />} />
        </Routes>
        <Sidebar items={domainLinks} title="Domains" />
      </div>
      <Footer />
    </div>
  );
};

export { App };
