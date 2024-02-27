import 'react-quill/dist/quill.snow.css';
import React, { FC } from "react";
import ReactQuill from "react-quill";

interface EditorProps {
  value: string;
  onChange: (content: string, delta: any, source: any, editor: any) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div>
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules} 
        className="bg-white h-60 max-h-60 w-full"
      />
    </div>
  );
}

export default Editor;
