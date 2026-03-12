import type { ReactElement } from "react";
import type { DocEntry } from "../../types/DocEntry";
import { extractPreview } from "../../services/docParser";
import { DomainCard } from "../parts/DomainCard";

interface DomainPageProps {
  readonly domainName: string;
  readonly entries: readonly DocEntry[];
  readonly onNavigate: (page: string) => void;
}

/**
 * Main section component for displaying list of stories/content in a domain
 * @param entries List of domain entries
 * @param onNavigate Function to navigate to a specific entry
 */
const DomainPage = ({ entries, onNavigate }: DomainPageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="display-flex-column gap-medium">
        {entries.map((entry) => (
          <DomainCard
            key={entry.name}
            title={entry.meta.title}
            preview={extractPreview(entry.content)}
            onNavigate={() => onNavigate(entry.name)}
          />
        ))}
      </div>
    </main>
  );
};

export { DomainPage };
