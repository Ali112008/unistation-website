"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import React, { useEffect } from "react";

const TOOLBAR_BTN = {
  padding: "5px 8px", border: "1px solid #e5e7eb", borderRadius: 6,
  background: "white", cursor: "pointer", fontSize: 13,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  minWidth: 30, minHeight: 30, color: "#374151",
};
const TOOLBAR_BTN_ACTIVE = { ...TOOLBAR_BTN, background: "#28143c", color: "white", borderColor: "#28143c" };
const TOOLBAR_SEP = { display: "inline-block", width: 1, height: 24, background: "#e5e7eb", margin: "0 4px", verticalAlign: "middle" };

function ToolbarBtn({ onClick, active, disabled, title, children }: {
  onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} title={title}
      style={active ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
      onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.background = "#f3f4f6"; }}
      onMouseLeave={e => { if (!(e.target as HTMLElement).style.background.includes("28143c")) (e.target as HTMLElement).style.background = "white"; }}
    >{children}</button>
  );
}

function Toolbar({ editor }: { editor: any }) {
  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };
  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };
  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  if (!editor) return null;

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 3, padding: "8px 6px",
      borderBottom: "1px solid #e5e7eb", background: "#fafafa", borderRadius: "8px 8px 0 0",
      alignItems: "center",
    }}>
      {/* Text Style */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)"><b>B</b></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)"><i>I</i></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)"><u>U</u></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolbarBtn>
      <span style={TOOLBAR_SEP} />

      {/* Headings */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><b>H2</b></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><b>H3</b></ToolbarBtn>
      <span style={TOOLBAR_SEP} />

      {/* Lists */}
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">1</text><text x="2" y="14" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">2</text><text x="2" y="20" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">3</text></svg>
      </ToolbarBtn>
      <span style={TOOLBAR_SEP} />

      {/* Alignment & Block */}
      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Line">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="2" y1="12" x2="22" y2="12"/></svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/></svg>
      </ToolbarBtn>
      <span style={TOOLBAR_SEP} />

      {/* Color */}
      <label title="Text Color" style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <ToolbarBtn onClick={() => {}} title="Text Color">
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
            <div style={{ width: 14, height: 3, borderRadius: 2, background: "#ef4444" }} />
          </div>
        </ToolbarBtn>
        <input type="color" value="#000000" onChange={e => setColor(e.target.value)} style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }} />
      </label>
      <span style={TOOLBAR_SEP} />

      {/* Link & Image */}
      <ToolbarBtn onClick={addLink} active={editor.isActive("link")} title="Add Link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={addImage} title="Add Image">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </ToolbarBtn>
      <span style={TOOLBAR_SEP} />

      {/* Undo/Redo */}
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.13-9.36L23 10"/></svg>
      </ToolbarBtn>
    </div>
  );
}

const EDITOR_STYLES = `
.tiptap-editor p { margin: 0.6em 0; }
.tiptap-editor h2 { font-size: 1.4em; font-weight: 700; margin: 1em 0 0.4em; color: #28143c; }
.tiptap-editor h3 { font-size: 1.15em; font-weight: 700; margin: 0.8em 0 0.3em; color: #28143c; }
.tiptap-editor ul, .tiptap-editor ol { padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-editor li { margin: 0.2em 0; }
.tiptap-editor blockquote { border-left: 4px solid #f0b414; padding: 0.5em 1em; margin: 0.8em 0; background: #fffbeb; border-radius: 0 6px 6px 0; }
.tiptap-editor hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.2em 0; }
.tiptap-editor a { color: #f0b414; text-decoration: underline; }
.tiptap-editor img { max-width: 100%; height: auto; border-radius: 8px; margin: 0.8em 0; }
.tiptap-editor { min-height: 250px; padding: 16px; outline: none; font-size: 14px; line-height: 1.7; color: #1f2937; }
.tiptap-editor:focus { outline: none; }
.tiptap-editor p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left; color: #9ca3af; pointer-events: none; height: 0;
}
`;

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html === "<p></p>") onChange("");
      else onChange(html);
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        "data-placeholder": placeholder,
      },
    },
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. when switching between items)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden",
      background: "white",
    }}>
      <style>{EDITOR_STYLES}</style>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
