import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { Sidebar } from "./components/layout/Sidebar";
import type { DocEntry } from "./types/DocEntry";

const domainDocs = import.meta.glob("./domaindocs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const storyDocs = import.meta.glob("./storydocs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const extractName = (path: string): string => {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(".md", "");
};

const buildEntries = (docs: Readonly<Record<string, string>>): readonly DocEntry[] =>
  Object.entries(docs).map(([path, content]) => ({
    name: extractName(path),
    content,
  }));

const domainEntries = buildEntries(domainDocs);
const storyEntries = buildEntries(storyDocs);

const allEntries = new Map<string, string>([
  ...domainEntries.map(({ name, content }) => [name, content] as const),
  ...storyEntries.map(({ name, content }) => [name, content] as const),
]);

const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const pageContent = currentPage ? allEntries.get(currentPage) ?? null : null;

  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-flex">
        <Sidebar items={storyEntries} title="Stories" onNavigate={setCurrentPage} />
        {pageContent ? <Page pageText={pageContent} /> : <Homepage />}
        <Sidebar items={domainEntries} title="Domains" onNavigate={setCurrentPage} />
      </div>
    </div>
  );
};

export { App };
