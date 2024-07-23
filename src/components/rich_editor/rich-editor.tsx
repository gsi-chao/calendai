"use client";

import useDebounce from "@/hooks/useDebounce";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const RichEditor: React.FC<Props> = ({ onChange, value }) => {
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  const debound = useDebounce(content, 1000);

  useEffect(() => {
    try {
      setContent(JSON.parse(value));
    } catch (e) {
      setContent({ type: "doc", content: [] });
    }
  }, [value]);

  useEffect(() => {
    if (debound) {
      onChange(JSON.stringify(debound));
    }
  }, [debound, onChange]);

  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        onUpdate={({ editor }) => {
          const html = editor.getJSON();
          setContent(html);
        }}
      />
    </EditorRoot>
  );
};
export default RichEditor;
