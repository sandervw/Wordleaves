import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Placeholder from "@tiptap/extension-placeholder";

const MarkdownText = ({
  placeholder = "Write something here...",
  isEditable = false,
  text = "",
}) => {
  const editor = useEditor({
    editable: !!isEditable,
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder,
      }),
    ],
    contentType: "markdown",
    content: text || undefined, // Don't set empty string - let it be truly empty

    onBlur: ({ editor }) => {
      if (isEditable) {
        // Save content as Markdown when editor loses focus
        const resultText = editor.getMarkdown();
        console.log(resultText);
      }
    },
  });

  return <EditorContent editor={editor} />;
};

export default MarkdownText;
