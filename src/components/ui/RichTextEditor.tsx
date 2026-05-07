import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Write your entry..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-6 text-clay-ink',
      },
    },
  })

  if (!editor) {
    return null
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run()

  return (
    <div className="border border-clay-hairline rounded-xl overflow-hidden bg-clay-canvas focus-within:ring-2 focus-within:ring-clay-primary/20 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-clay-hairline bg-clay-surface-soft p-3">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn("w-9 h-9 border-none", editor.isActive('bold') && "bg-clay-primary text-white hover:bg-clay-primary")}
          onClick={toggleBold}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn("w-9 h-9 border-none", editor.isActive('italic') && "bg-clay-primary text-white hover:bg-clay-primary")}
          onClick={toggleItalic}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-[1px] h-4 bg-clay-hairline mx-1" />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn("w-9 h-9 border-none", editor.isActive('bulletList') && "bg-clay-primary text-white hover:bg-clay-primary")}
          onClick={toggleBulletList}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn("w-9 h-9 border-none", editor.isActive('orderedList') && "bg-clay-primary text-white hover:bg-clay-primary")}
          onClick={toggleOrderedList}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-[1px] h-4 bg-clay-hairline mx-1" />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn("w-9 h-9 border-none", editor.isActive('blockquote') && "bg-clay-primary text-white hover:bg-clay-primary")}
          onClick={toggleBlockquote}
        >
          <Quote className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="cursor-text" />
    </div>
  )
}
