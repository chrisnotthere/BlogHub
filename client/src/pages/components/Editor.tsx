import 'react-quill/dist/quill.snow.css';
import React, { FC } from "react";
import ReactQuill from "react-quill";
import styles from '../../assets/styles/create-post.module.css'

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
    <div className={styles.content}>
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules} 
        className={styles.quill}
      />
    </div>
  );
}

export default Editor;
