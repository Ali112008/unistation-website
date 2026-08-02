"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import React, { useEffect, useState, useCallback } from "react";

/* ================================================================
   ICONS — every icon takes an explicit `c` (color) prop.
   No currentColor, no CSS inheritance — pure explicit color.
   ================================================================ */

function IcBold(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>;
}
function IcItalic(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>;
}
function IcUnderline(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>;
}
function IcStrike(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.3 4.9c-1.3-1.1-3-1.8-4.8-1.8-3.3 0-6 2.4-6 5.4 0 .5.1 1 .2 1.5"/><path d="M6.7 19.1c1.3 1.1 3 1.8 4.8 1.8 3.3 0 6-2.4 6-5.4 0-.5-.1-1-.2-1.5"/><line x1="4" y1="12" x2="20" y2="12"/></svg>;
}
function IcH2(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/></svg>;
}
function IcH3(c: string) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 12h-4c0-2.5 1.5-4 3.5-4 .5 0 1.5.5 1.5 1"/></svg>;
}
function IcBullet(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1.5" fill={c} stroke="none"/><circle cx="4" cy="12" r="1.5" fill={c} stroke="none"/><circle cx="4" cy="18" r="1.5" fill={c} stroke="none"/></svg>;
}
function IcOrdered(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="1" y="8" fontSize="9" fill={c} stroke="none" fontWeight="bold">1</text><text x="1" y="14" fontSize="9" fill={c} stroke="none" fontWeight="bold">2</text><text x="1" y="20" fontSize="9" fill={c} stroke="none" fontWeight="bold">3</text></svg>;
}
function IcHr(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><line x1="2" y1="12" x2="22" y2="12"/></svg>;
}
function IcQuote(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/></svg>;
}
function IcColor(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>;
}
function IcLink(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
}
function IcImage(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
}
function IcUndo(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
}
function IcRedo(c: string) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.13-9.36L23 10"/></svg>;
}

/* ================================================================
   TOOLBAR BUTTON
   ================================================================ */

const NORMAL = "#374151";
const ACTIVE_BG = "#28143c";
const ACTIVE_FG = "#ffffff";

function ToolbarBtn({ onClick, active, disabled, title, icon }: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  icon: React.ReactNode;   // pre-rendered SVG with correct color
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: "5px 8px",
        border: active ? `1px solid ${ACTIVE_BG}` : "1px solid #e5e7eb",
        borderRadius: 6,
        background: active ? ACTIVE_BG : "white",
        cursor: disabled ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        minHeight: 30,
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={e => {
        if (!active && !disabled) (e.currentTarget as HTMLElement).style.background = "#f3f4f6";
      }}
      onMouseLeave={e => {
        if (!active && !disabled) (e.currentTarget as HTMLElement).style.background = "white";
      }}
    >
      {icon}
    </button>
  );
}

/* ================================================================
   TOOLBAR
   ================================================================ */

const SEP = <span style={{ display: "inline-block", width: 1, height: 24, background: "#e5e7eb", margin: "0 4px", verticalAlign: "middle" }} />;

function Toolbar({ editor }: { editor: any }) {
  /* Re-render on every transaction so active states stay in sync */
  const [, setTick] = useState(0);
  const onTx = useCallback(() => setTick(t => t + 1), []);
  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", onTx);
    return () => { editor.off("transaction", onTx); };
  }, [editor, onTx]);

  if (!editor) return null;

  const c = (isActive: boolean) => isActive ? ACTIVE_FG : NORMAL;

  const addImage = () => {
    const mode = prompt("Upload or URL? (type 'u' for upload, or paste image URL and press OK):", "");
    if (!mode) return;
    const trimmed = mode.trim().toLowerCase();
    if (trimmed === "u" || trimmed === "upload") {
      const input = document.createElement("input");
      input.type = "file"; input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await fetch("/api/upload", { method: "POST", headers: { "x-admin-password": "unistation2024" }, body: formData });
          if (!res.ok) throw new Error("Upload failed");
          const data = await res.json();
          if (data.url) editor.chain().focus().setImage({ src: data.url }).run();
        } catch {
          alert("Image upload failed. Try entering a URL instead.");
        }
      };
      input.click();
    } else if (trimmed) {
      editor.chain().focus().setImage({ src: trimmed }).run();
    }
  };
  const addLink  = () => { const u = prompt("Enter URL:");     if (u) editor.chain().focus().setLink({ href: u }).run(); };
  const setColor = (clr: string) => editor.chain().focus().setColor(clr).run();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, padding: "8px 6px", borderBottom: "1px solid #e5e7eb", background: "#fafafa", borderRadius: "8px 8px 0 0", alignItems: "center" }}>

      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)" icon={IcBold(c(editor.isActive("bold")))} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)" icon={IcItalic(c(editor.isActive("italic")))} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)" icon={IcUnderline(c(editor.isActive("underline")))} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough" icon={IcStrike(c(editor.isActive("strike")))} />
      {SEP}

      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2" icon={IcH2(c(editor.isActive("heading", { level: 2 })))} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3" icon={IcH3(c(editor.isActive("heading", { level: 3 })))} />
      {SEP}

      <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List" icon={IcBullet(c(editor.isActive("bulletList")))} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List" icon={IcOrdered(c(editor.isActive("orderedList")))} />
      {SEP}

      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Line" icon={IcHr(NORMAL)} />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote" icon={IcQuote(c(editor.isActive("blockquote")))} />
      {SEP}

      <label title="Text Color" style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
        <ToolbarBtn onClick={() => {}} title="Text Color" icon={IcColor(NORMAL)} />
        <input type="color" value="#000000" onChange={e => setColor(e.target.value)} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
      </label>
      {SEP}

      <ToolbarBtn onClick={addLink} active={editor.isActive("link")} title="Add Link" icon={IcLink(c(editor.isActive("link")))} />
      <ToolbarBtn onClick={addImage} title="Add Image" icon={IcImage(NORMAL)} />
      {SEP}

      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo" icon={IcUndo(NORMAL)} />
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo" icon={IcRedo(NORMAL)} />
    </div>
  );
}

/* ================================================================
   EDITOR
   ================================================================ */

const EDITOR_STYLES = `
.tiptap-editor p { margin: 0.6em 0; }
.tiptap-editor h2 { font-size: 1.4em; font-weight: 700; margin: 1em 0 0.4em; color: #28143c; }
.tiptap-editor h3 { font-size: 1.15em; font-weight: 700; margin: 0.8em 0 0.3em; color: #28143c; }
.tiptap-editor ul { list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-editor ol { list-style-type: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-editor li { margin: 0.2em 0; display: list-item; }
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

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden", background: "white" }}>
      <style>{EDITOR_STYLES}</style>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
