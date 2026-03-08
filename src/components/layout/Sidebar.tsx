import type { ReactElement } from "react";

interface SidebarProps {
  readonly variant?: "stories" | "domain";
  readonly onNavigate?: (page: "sparse" | "corplore" | "tod") => void;
}

const Sidebar = ({ variant = "stories", onNavigate }: SidebarProps): ReactElement => {
  const handleNavigate = (page: "sparse" | "corplore" | "tod"): void => {
    onNavigate?.(page);
  };

  if (variant === "domain") {
    return (
      <aside className="sidebar container">
        <h3 className="padding-small">Domains</h3>
        <nav>
          <ul className="list">
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={() => handleNavigate("corplore")}
              >
                CorpLore
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={() => handleNavigate("tod")}
              >
                Time of Dying
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={() => handleNavigate("sparse")}
              >
                Sparse CSS
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar container">
      <h3 className="padding-small">Stories</h3>
      <nav>
        <ul className="list">
          <li className="list-item">
            <a
              href="#"
              className="link"
              onClick={(e) => e.preventDefault()}
            >
              story 1
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
