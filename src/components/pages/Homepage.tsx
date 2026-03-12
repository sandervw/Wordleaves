/**
 * Homepage component with basic site info
 * @param onNavigate  Navigates to Sparse Code
 */
const Homepage = ({
  onNavigate,
}: {
  readonly onNavigate: (page: string) => void;
}) => {
  return (
    <main className="page container">
      <div className="page-text">
        <h3 className="title">
          This site hosts my stories and fiction settings.
        </h3>
        <p>Random stories are on the left sidebar.</p>
        <p>Grouped stories and documents are on the right.</p>
        <a
          href="#"
          className="link font-italic"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("Sparse-Code");
          }}
        >
          Built to Sparse Laws
        </a>
      </div>
    </main>
  );
};

export { Homepage };
