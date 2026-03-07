interface SidebarProps {
  variant?: "stories" | "info";
  onNavigate?: (page: "sparse" | "corplore" | "tod") => void;
}

const Sidebar = ({ variant = "stories", onNavigate }: SidebarProps) => {
  if (variant === "info") {
    return (
      <aside className="sidebar container">
        <h3 className="padding-small">Domains</h3>
        <nav>
          <ul className="list">
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("corplore");
                }}
              >
                CorpLore
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("tod");
                }}
              >
                Time of Dying
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add Cylinder World page
                }}
              >
                Cylinder World
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("sparse");
                }}
              >
                Sparse CSS
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  } else
    return (
      <aside className="sidebar container">
        <h3 className="padding-small">Stories</h3>
        <nav>
          <ul className="list">
            <li className="list-item">
              <a
                href="#"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: story page
                }}
              >
                story 1
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
};

export default Sidebar;
