import type { ReactElement } from "react";
import { Link } from "react-router-dom";

const Homepage = (): ReactElement => {
  return (
    <main className="page container">
      <div className="page-text">
        <h3 className="title">
          This site hosts my stories and fiction settings.
        </h3>
        <p>Random stories are on the left sidebar.</p>
        <p>Grouped stories and documents are on the right.</p>
        <Link to="/Sparse-Code" className="link font-italic">
          Built to Sparse Laws
        </Link>
      </div>
    </main>
  );
};

export { Homepage };
