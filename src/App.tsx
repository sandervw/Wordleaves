import { useState } from "react";
import "./sparse.css";
import "./classic.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ModalsTestPage from "./ModalsTestPage";
import ExpandablesTestPage from "./ExpandablesTestPage";
import Sidebar from "./Sidebar";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "modals" | "expandables"
  >("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage />;
      case "modals":
        return <ModalsTestPage />;
      case "expandables":
        return <ExpandablesTestPage />;
      default:
        return <Homepage />;
    }
  };
  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-flex">
        <Sidebar variant="nav" onNavigate={setCurrentPage} />
        {renderPage()}
        <Sidebar variant="cards" />
      </div>
    </div>
  );
}

export default App;
