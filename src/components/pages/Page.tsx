import type { ReactElement } from "react";
import MarkdownText from "../parts/MarkdownText";

interface PageProps {
  readonly title: string;
  readonly content: string;
}

/**
 * Simple component to render main section with markdown
 * @param title Page title
 * @param content Page content in markdown format
 */
const Page = ({ title, content }: PageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="page-text padding-medium">
        <MarkdownText key={title} text={content} />
      </div>
    </main>
  );
};

export { Page };
