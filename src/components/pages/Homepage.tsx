const Homepage = ({
  onNavigate,
}: {
  readonly onNavigate: (page: string) => void;
}) => {
  return (
    <main className="page container">
      <div className="page-text">
        <p>This site hosts my stories and fiction settings.</p>
        <ul>
          <li>Random stories are on the left sidebar.</li>
          <li>Grouped stories and documents are on the right.</li>
        </ul>
        <p>
          Built with
          <a
            href="#"
            className="link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("Sparse-Code");
            }}
          >
            Sparse Code
          </a>
        </p>
      </div>
    </main>
  );
};

export { Homepage };
