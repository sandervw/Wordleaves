import type { ReactElement } from "react";
import { DomainCard } from "../parts/DomainCard";
import type { ListEntry } from "../../types/ListEntry";

interface DomainPageProps {
  readonly entries: readonly ListEntry[];
}

const DomainPage = ({ entries }: DomainPageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="display-flex-column gap-medium">
        {entries.map((entry) => (
          <DomainCard
            key={entry.key}
            title={entry.name}
            slug={entry.key}
            preview={entry.preview ?? ""}
          />
        ))}
      </div>
    </main>
  );
};

export { DomainPage };
