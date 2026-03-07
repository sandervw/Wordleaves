import { useState } from "react";
import "./sparse.css";
import "./classic.css";
import Navbar from "./components/layout/Navbar";
import Homepage from "./components/pages/Homepage";
import ModalsTestPage from "./components/pages/ModalsTestPage";
import ExpandablesTestPage from "./components/pages/ExpandablesTestPage";
import Sidebar from "./components/layout/Sidebar";

function App() {
  const [currentPage, setCurrentPage] = useState<"sparse" | "corplore" | "tod">(
    "sparse",
  );

  const renderPage = () => {
    switch (currentPage) {
      case "sparse":
        return <Homepage />;
      case "corplore":
        return <ModalsTestPage />;
      case "tod":
        return <ExpandablesTestPage />;
      default:
        return <Homepage />;
    }
  };
  return (
    <div className="width-75 margin-center">
      <Navbar />
      <div className="display-flex">
        <Sidebar variant="stories" />
        {renderPage()}
        <Sidebar variant="info" onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
