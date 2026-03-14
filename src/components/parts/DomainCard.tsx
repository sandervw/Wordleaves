import type { ReactElement } from "react";
import { Link } from "react-router-dom";

interface DomainCardProps {
  readonly title: string;
  readonly slug: string;
  readonly preview?: string;
}

const DomainCard = ({
  title,
  slug,
  preview,
}: DomainCardProps): ReactElement => {
  return (
    <Link
      to={`/${slug}`}
      className="card-link"
      aria-label={`Open ${title}`}
    >
      <h4 className="card-header">{title}</h4>
      {preview && <p className="card-description">{preview}</p>}
    </Link>
  );
};

export { DomainCard };
