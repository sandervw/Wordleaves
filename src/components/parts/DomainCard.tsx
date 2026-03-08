import type { ReactElement } from "react";

interface DomainCardProps {
  readonly title: string;
  readonly preview: string;
  readonly onNavigate: () => void;
}

const DomainCard = ({
  title,
  preview,
  onNavigate,
}: DomainCardProps): ReactElement => {
  return (
    <div
      className="card-link"
      onClick={onNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") onNavigate();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
    >
      <h4 className="card-header">{title}</h4>
      <p className="card-description">{preview}</p>
    </div>
  );
};

export { DomainCard };
