import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import type { SidebarLink } from "../../types/SidebarLink";

interface SidebarProps {
  readonly items: readonly SidebarLink[];
  readonly title: string;
}

const Sidebar = ({ items, title }: SidebarProps): ReactElement => {
  return (
    <aside className="sidebar container">
      <h3 className="padding-medium">{title}</h3>
      <nav>
        <ul className="list">
          {items.map((item) => (
            <li key={item.slug} className="list-item">
              <Link to={`/${item.slug}`} className="link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
