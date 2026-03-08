import type { ReactElement } from "react";
import MarkdownText from "../parts/MarkdownText";

interface PageProps {
  readonly pageText: string;
}

const Page = ({ pageText }: PageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="page-text">
        <MarkdownText key={pageText} text={pageText} isEditable={true} />
      </div>
    </main>
  );
};

export { Page };
