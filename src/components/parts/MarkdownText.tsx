import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Image from "@tiptap/extension-image";

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
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Image,
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
