"use client"

import { useEffect, useRef } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  id: string
}

const QuillEditor = ({ value, onChange, id }: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)
  const isInitializedRef = useRef(false)

  // Store the latest props in refs to avoid stale closures
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)

  // Keep refs updated with the latest props
  useEffect(() => {
    valueRef.current = value
    onChangeRef.current = onChange
  }, [value, onChange])

  // Initialize Quill only once
  useEffect(() => {
    // Prevent double initialization
    if (editorRef.current && !quillRef.current && !isInitializedRef.current) {
      isInitializedRef.current = true

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
        placeholder: "Start typing here...",
      })

      // Set initial content
      if (valueRef.current) {
        quill.root.innerHTML = valueRef.current
      }

      // Handle content changes
      quill.on("text-change", () => {
        const html = quill.root.innerHTML
        onChangeRef.current(html)
      })

      quillRef.current = quill
    }

    // Cleanup function
    return () => {
      if (quillRef.current) {
        // No explicit destroy method in Quill, but we can clean up if needed
        quillRef.current = null
        isInitializedRef.current = false
      }
    }
  }, []) // Empty dependency array is intentional - we only want to initialize once

  // Handle external value changes
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <div className="quill-editor-container" id={id}>
      <div ref={editorRef} className="min-h-[200px]" />
      <style jsx global>{`
        .quill-editor-container .ql-container {
          border-color: #e2e8f0;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 200px;
        }
        .quill-editor-container .ql-toolbar {
          border-color: #e2e8f0;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: #f8fafc;
        }
        .quill-editor-container .ql-editor {
          min-height: 200px;
        }
        /* Fix for duplicate toolbar issue */
        .quill-editor-container .ql-toolbar + .ql-toolbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default QuillEditor
