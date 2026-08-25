import Dompurify from "dompurify";
import type React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function RichTextRenderer({ content, className }: Props) {
  const sanitizedContent = Dompurify.sanitize(content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={className}
    ></div>
  );
}

export default RichTextRenderer;
