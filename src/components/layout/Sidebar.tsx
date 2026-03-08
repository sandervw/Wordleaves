import type { ReactElement } from "react";
import type { DocEntry } from "../../types/DocEntry";

interface SidebarProps {
  readonly items: readonly DocEntry[];
  readonly title: string;
  readonly onNavigate: (page: string) => void;
}

const formatName = (name: string): string => {
  return name.replace(/-/g, " ");
};

const Sidebar = ({ items, title, onNavigate }: SidebarProps): ReactElement => {
  return (
    <aside className="sidebar container">
      <h3 className="padding-small">{title}</h3>
      <nav>
        <ul className="list">
          {items.map((item) => (
            <li key={item.name} className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => { e.preventDefault(); onNavigate(item.name); }}
              >
                {formatName(item.name)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
