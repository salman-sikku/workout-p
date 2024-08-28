import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: {
    Container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: ['extra-small', 'small', 'medium', 'large',] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }
}

interface TextData {
  data: any;
  handleData: any;
}

const TextEditor: React.FC<TextData> = ({ data, handleData }) => {
  const handleChange = (value: any) => {
    handleData('content', value)
  }

  return (
    <>
      <div className='my-6 w-[40vw]'>
        <ReactQuill value={data?.content}
          onChange={handleChange}
          modules={modules}
          placeholder='Enter your content hare...' />
      </div>
    </>
  )
}

export default TextEditor
