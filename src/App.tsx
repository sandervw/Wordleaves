import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { Sidebar } from "./components/layout/Sidebar";
import type { DocEntry } from "./types/DocEntry";

// Docs for story settings or design descriptions
const domainDocs = import.meta.glob("./domaindocs/*.md", {
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

// From the list of file names, create create an array of name/content objects
const buildEntries = (
  docs: Readonly<Record<string, string>>,
): readonly DocEntry[] =>
  Object.entries(docs).map(([path, content]) => ({
    name: extractName(path),
    content,
  }));

const domainEntries = buildEntries(domainDocs);
const storyEntries = buildEntries(storyDocs);

// Create a map of all entries for easy lookup when navigating to a page
const allEntries = new Map<string, string>([
  ...domainEntries.map(({ name, content }) => [name, content] as const),
  ...storyEntries.map(({ name, content }) => [name, content] as const),
]);

const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const pageContent = currentPage
    ? (allEntries.get(currentPage) ?? null)
    : null;

  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-flex">
        <Sidebar
          items={storyEntries}
          title="Stories"
          onNavigate={setCurrentPage}
        />
        {pageContent ? <Page pageText={pageContent} /> : <Homepage />}
        <Sidebar
          items={domainEntries}
          title="Domains"
          onNavigate={setCurrentPage}
        />
      </div>
    </div>
  );
};

export { App };
