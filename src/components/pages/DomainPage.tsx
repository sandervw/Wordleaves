import type { ReactElement } from "react";
import type { DomainEntry } from "../../types/DomainEntry";
import { DomainCard } from "../parts/DomainCard";

interface DomainPageProps {
  readonly domain: DomainEntry;
  readonly onNavigate: (page: string) => void;
}

const DomainPage = ({
  domain,
  onNavigate,
}: DomainPageProps): ReactElement => {
  return (
    <main className="page container">
      <div className="display-flex-column gap-medium">
        {domain.cards.map((card) => (
          <DomainCard
            key={card.name}
            title={card.title}
            preview={card.preview}
            onNavigate={() => onNavigate(card.name)}
          />
        ))}
      </div>
    </main>
  );
};

export { DomainPage };
