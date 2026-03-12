import type { ReactElement } from "react";
import { DomainCard } from "../parts/DomainCard";
import type { ListEntry } from "../../types/ListEntry";

interface DomainPageProps {
  readonly entries: readonly ListEntry[];
  readonly onNavigate: (page: string) => void;
}

/**
 * Main section component for displaying list of stories/content in a domain
 * @param entries List of domain entries
 * @param onNavigate Function to navigate to a specific entry or sub-domain
 */
const DomainPage = ({ entries, onNavigate }: DomainPageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="display-flex-column gap-medium">
        {entries.map((entry) => (
          <DomainCard
            key={entry.key}
            title={entry.name}
            preview={entry.preview ?? ""}
            onNavigate={() => onNavigate(entry.key)}
          />
        ))}
      </div>
    </main>
  );
};

export { DomainPage };
