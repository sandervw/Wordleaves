import MarkdownText from "./MarkdownText";
import SVG from "./SVG";

interface SidebarProps {
  variant?: "nav" | "cards";
  onNavigate?: (page: "home" | "modals" | "expandables") => void;
}

const Sidebar = ({ variant = "nav", onNavigate }: SidebarProps) => {
  if (variant === "cards") {
    return (
      <aside className="sidebar container">
        {[
          {
            title: "Recent Tracks",
            description: "Your most played soundtracks this week",
          },
          {
            title: "Favorites",
            description: "Bookmarked albums and composers",
          },
          { title: "Playlists", description: "Custom OST collections" },
          {
            title: "Recommendations",
            description: "Discover similar soundtracks",
          },
          {
            title: "New Releases",
            description: "Latest game music releases",
          },
          {
            title: "Community",
            description: "Join discussions about retro gaming music",
          },
        ].map((card, index) => (
          <div key={index} className="card container">
            <div className="card-header">
              <SVG name="drag" cursor="grab" />
              <div>{card.title}</div>
            </div>
            <div className="card-description">
              <MarkdownText text={card.description} />
            </div>
          </div>
        ))}
        <div className="card container">
          <div className="card-header">
            <SVG name="drag" cursor="grab" />
            <div>Quick Notes</div>
          </div>
          <MarkdownText isEditable={true} />
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar container">
      <nav>
        <ul className="list">
          <li className="list-item">
            <a
              href="#"
              className="list-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("home");
              }}
            >
              Home
            </a>
          </li>
          <li className="list-item">
            <a
              href="#"
              className="list-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("modals");
              }}
            >
              Modals Test
            </a>
          </li>
          <li className="list-item">
            <a
              href="#"
              className="list-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.("expandables");
              }}
            >
              Expandables Test
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="list-link">
              Reviews
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="list-link">
              Archive
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
