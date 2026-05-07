'use client'

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react'

import {
  EditorContent,
  useEditor,
} from '@tiptap/react'

import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

import { Button } from './Button'

import { cn } from '@/lib/utils'

/* =========================================================
   TYPES
========================================================= */

interface RichTextEditorProps {
  value: string

  onChange: (value: string) => void

  placeholder?: string

  readOnly?: boolean
}

/* =========================================================
   TOOLBAR BUTTON
========================================================= */

function ToolbarButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
}) {

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(

        `
        h-8 w-8

        rounded-xl

        border border-transparent

        text-clay-muted

        transition-all duration-200
        `,

        isActive
          ? `
            bg-black/[0.06]

            text-clay-ink
            `
          : `
            hover:bg-black/[0.04]
            hover:text-clay-ink
            `
      )}
    >
      {children}
    </Button>
  )
}

/* =========================================================
   COMPONENT
========================================================= */

export function RichTextEditor({
  value,

  onChange,

  placeholder =
  'Document recovery observations...',

  readOnly = false,
}: RichTextEditorProps) {

  const editor = useEditor({

    editable: !readOnly,

    extensions: [

      StarterKit,

      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          'is-editor-empty',
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },

    editorProps: {
      attributes: {
        class: cn(

          `
          min-h-[220px]

          px-6 py-5

          text-[15px]
          leading-[1.85]

          text-clay-ink

          focus:outline-none
          `,

          `
          prose prose-neutral
          max-w-none
          `,

          `
          prose-p:my-3

          prose-headings:tracking-[-0.03em]

          prose-strong:font-semibold

          prose-blockquote:border-l-black/10
          prose-blockquote:text-clay-body

          prose-li:marker:text-clay-muted
          `
        ),
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div
      className="
        overflow-hidden

        rounded-[24px]

        border border-clay-hairline

        bg-white

        shadow-[0_4px_24px_rgba(0,0,0,0.02)]

        transition-all duration-200

        focus-within:border-black/10
      "
    >

      {/* =================================================
          TOOLBAR
      ================================================= */}

      {!readOnly && (
        <div
          className="
            flex items-center gap-1

            border-b border-clay-hairline

            bg-clay-surface-soft/60

            px-3 py-2
          "
        >

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            isActive={editor.isActive(
              'bold'
            )}
          >
            <Bold size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            isActive={editor.isActive(
              'italic'
            )}
          >
            <Italic size={15} />
          </ToolbarButton>

          <div
            className="
              mx-1

              h-4 w-px

              bg-clay-hairline
            "
          />

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            isActive={editor.isActive(
              'bulletList'
            )}
          >
            <List size={15} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            isActive={editor.isActive(
              'orderedList'
            )}
          >
            <ListOrdered size={15} />
          </ToolbarButton>

          <div
            className="
              mx-1

              h-4 w-px

              bg-clay-hairline
            "
          />

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
            isActive={editor.isActive(
              'blockquote'
            )}
          >
            <Quote size={15} />
          </ToolbarButton>

        </div>
      )}

      {/* =================================================
          EDITOR
      ================================================= */}

      <EditorContent
        editor={editor}
        className="
          cursor-text
        "
      />

    </div>
  )
}