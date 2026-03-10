import type { ReactElement } from "react";
import type { DocEntry } from "../../types/DocEntry";

type SidebarItem = DocEntry | string;

interface SidebarProps {
  readonly items: readonly SidebarItem[];
  readonly title: string;
  readonly onNavigate: (page: string) => void;
}

const getLabel = (item: SidebarItem): string => {
  if (typeof item === "string") return item;
  return item.meta.title || item.name.replace(/-/g, " ");
};

const getKey = (item: SidebarItem): string => {
  if (typeof item === "string") return item;
  return item.name;
};

const Sidebar = ({ items, title, onNavigate }: SidebarProps): ReactElement => {
  return (
    <aside className="sidebar container">
      <h3 className="padding-medium">{title}</h3>
      <nav>
        <ul className="list">
          {items.map((item) => (
            <li key={getKey(item)} className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(getKey(item));
                }}
              >
                {getLabel(item)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
