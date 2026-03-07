import MarkdownText from "./MarkdownText";

const Homepage = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry.target);
      }
    });
  }, {});
  const elements = document.querySelectorAll(".page-text.container");
  elements.forEach((el) => observer.observe(el));
  return (
    <main className="page container">
      <div className="page-text">
        <MarkdownText
          text="
### The Laws of Sparse
*By Sander Vanwilligen*
1. There are no more than 5 of any variable type.
2. There are no hardcoded numeric values - only CSS variables.
3. There are no ems - only rems.
4. There are no more than 3 distinct 'types' of a class.
5. There are 4 percentages: 25%, 50%, 75%, 100%.
6. There are 2 colors: copper and danger.
7. There may be no more than 2 classes applied to any element.
8. There is only one animation speed.
9. There is only one border radius.
10. No box shadows.
*No Exceptions*
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
      <div className="page-text container">
        <MarkdownText
          text="
### The Laws of Sparse
        "
          isEditable={true}
        />
      </div>
    </main>
  );
};

export default Homepage;
