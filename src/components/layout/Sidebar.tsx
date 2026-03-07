interface SidebarProps {
  variant?: "stories" | "info";
  onNavigate?: (page: "sparse" | "corplore" | "tod") => void;
}

const Sidebar = ({ variant = "stories", onNavigate }: SidebarProps) => {
  if (variant === "info") {
    return (
      <aside className="sidebar container">
        <h3 className="sidebar-title">Navigation</h3>
        <nav>
          <ul className="list">
            <li className="list-item">
              <a
                href="#"
                className="list-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("sparse");
                }}
              >
                Sparse CSS
              </a>
            </li>
            <li className="list-item">
              <a
                href="#"
                className="list-link"
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
                className="list-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("tod");
                }}
              >
                Time of Dying
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  } else return <aside className="sidebar container"></aside>;
};

export default Sidebar;
