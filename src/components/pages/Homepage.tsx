import MarkdownText from "../../components/parts/MarkdownText";

const Homepage = () => {
  return (
    <main className="page container">
      <div className="page-text">
        <MarkdownText text="TODO Homepage text Here" isEditable={true} />
      </div>
    </main>
  );
};

export { Homepage };
