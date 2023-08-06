import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const RichTextEditor = ({ value, onChange, placeholder, error, errorMessage }) => {
  const handleChange = (content) => {
    onChange(content);
  };



  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={error ? 'is-invalid' : ''}
      />
      {error && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};



export default RichTextEditor;
