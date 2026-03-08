import type { ReactElement } from "react";
import MarkdownText from "../parts/MarkdownText";

interface PageProps {
  readonly pageText: string;
}

const Page = ({ pageText }: PageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="page-text padding-medium">
        <MarkdownText key={pageText} text={pageText} />
      </div>
    </main>
  );
};

export { Page };
