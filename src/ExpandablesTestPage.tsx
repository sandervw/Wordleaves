import { useState } from "react";

const ExpandablesTestPage = () => {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);

  return (
    <main className="page container">
      <h1 className="page-title">Expandables Testing Page</h1>
      <p className="page-meta">Test dropdowns, hoverables, and tooltips</p>

      <div className="display-flex-column gap-large">
        <div className="container padding-large">
          <h2 className="page-title">Dropdown with .expandable Class</h2>
          <p>JavaScript-controlled dropdown using .revealed toggle</p>
          <button
            className="btn-color margin-medium"
            onClick={() => setDropdownExpanded(!dropdownExpanded)}
          >
            Toggle Dropdown
          </button>
          <div className={`expandable ${dropdownExpanded ? "revealed" : ""}`}>
            <ul className="list container">
              <li className="list-item">Option 1</li>
              <li className="list-item">Option 2</li>
              <li className="list-item">Option 3</li>
            </ul>
          </div>
        </div>

        <div className="container padding-large">
          <h2 className="page-title">Dropdown with :hover</h2>
          <p>Pure CSS dropdown using :hover pseudo-class</p>
          <div className="hover-trigger">
            <button className="btn-color margin-medium">Hover Over Me</button>
            <ul className="list floatable">
              <li className="list-item">Hover Item 1</li>
              <li className="list-item">Hover Item 2</li>
              <li className="list-item">Hover Item 3</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExpandablesTestPage;
