import MarkdownText from "../parts/MarkdownText";

const Page = ({ pageText }: { pageText?: string }) => {
  // TODO: Fetch page text from text passed from file in domaindocs or storydocs
  // for now use placeholder text
  if (!pageText) {
    pageText = "TODO Page text Here";
  }

  return (
    <main className="page container">
      <div className="page-text">
        <MarkdownText text={pageText} isEditable={true} />
      </div>
    </main>
  );
};

export { Page };
