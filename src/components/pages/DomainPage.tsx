import type { ReactElement } from "react";
import type { DocEntry } from "../../types/DocEntry";
import { extractPreview } from "../../services/docParser";
import { DomainCard } from "../parts/DomainCard";

interface SubDomainInfo {
  readonly key: string;
  readonly displayName: string;
  readonly preview: string;
}

interface DomainPageProps {
  readonly domainName: string;
  readonly entries: readonly DocEntry[];
  readonly subDomains: readonly SubDomainInfo[];
  readonly onNavigate: (page: string) => void;
}

/**
 * Main section component for displaying list of stories/content in a domain
 * @param entries List of domain entries
 * @param subDomains List of child sub-domains to display as navigable cards
 * @param onNavigate Function to navigate to a specific entry or sub-domain
 */
const DomainPage = ({
  entries,
  subDomains,
  onNavigate,
}: DomainPageProps): ReactElement => {
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
        {subDomains.map((sub) => (
          <DomainCard
            key={sub.key}
            title={sub.displayName}
            onNavigate={() => onNavigate(sub.key)}
          />
        ))}
      </div>
    </main>
  );
};

export { DomainPage };
