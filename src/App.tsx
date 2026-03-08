import { useState } from "react";
import type { ReactElement } from "react";
import "./sparse.css";
import "./classic.css";
import { Navbar } from "./components/layout/Navbar";
import { Homepage } from "./components/pages/Homepage";
import { Page } from "./components/pages/Page";
import { Sidebar } from "./components/layout/Sidebar";

const App = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<"sparse" | "corplore" | "tod">(
    "sparse",
  );

  const renderPage = (): ReactElement => {
    switch (currentPage) {
      case "sparse":
        return <Homepage />;
      case "corplore":
        return <Page />;
      case "tod":
        return <Page />;
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
        <Sidebar variant="domain" onNavigate={setCurrentPage} />
      </div>
    </div>
  );
};

export { App };
