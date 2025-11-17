import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconCode,
  IconList,
  IconListNumbers,
  IconQuote,
  IconHeading,
  IconH1,
  IconH2,
  IconH3,
  IconEraser,
  IconMinus,
  IconRotate2,
  IconRotateClockwise2,
  IconLink,
  IconLinkOff,
} from "@tabler/icons-react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import LinkExtension from "@tiptap/extension-link";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const extensions = [
  TextStyleKit,
  StarterKit,
  LinkExtension.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
];

function MenuBar({ editor }: { editor: Editor }) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkLabel, setLinkLabel] = useState("");
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),
      isParagraph: ctx.editor.isActive("paragraph"),
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isBulletList: ctx.editor.isActive("bulletList"),
    isOrderedList: ctx.editor.isActive("orderedList"),
    isCodeBlock: ctx.editor.isActive("codeBlock"),
    isBlockquote: ctx.editor.isActive("blockquote"),
    isLink: ctx.editor.isActive("link"),
    canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
    }),
  });

  const getButtonClass = (isActive: boolean) =>
    isActive ? "bg-white/10 text-white" : "text-white/70";
  const buttonSize = "icon";

  const openLinkDialog = () => {
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(
      selection.from,
      selection.to,
      " "
    );
    const currentUrl = editor.getAttributes("link").href as string | undefined;
    setLinkLabel(selectedText ?? "");
    setLinkUrl(
      currentUrl ?? (selectedText?.startsWith("http") ? selectedText : "https://")
    );
    setIsLinkDialogOpen(true);
  };

  const handleApplyLink = () => {
    const href = linkUrl.trim();
    if (!href) {
      setIsLinkDialogOpen(false);
      return;
    }
    const label = linkLabel.trim();
    const { from, to } = editor.state.selection;
    const hasSelection = to > from;

    if (hasSelection) {
      if (label) {
        editor.chain().focus().insertContentAt({ from, to }, label).run();
        editor
          .chain()
          .focus()
          .setTextSelection({ from, to: from + label.length })
          .extendMarkRange("link")
          .setLink({ href })
          .run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
      }
    } else {
      const textToInsert = label || href;
      const startPosition = editor.state.selection.from;
      editor.chain().focus().insertContent(textToInsert).run();
      editor
        .chain()
        .focus()
        .setTextSelection({
          from: startPosition,
          to: startPosition + textToInsert.length,
        })
        .setLink({ href })
        .run();
    }

    const finalPosition = editor.state.selection.to;
    editor.chain().focus().setTextSelection(finalPosition).run();
    const tr = editor.state.tr.setStoredMarks([]);
    editor.view.dispatch(tr);

    setLinkUrl("https://");
    setLinkLabel("");
    setIsLinkDialogOpen(false);
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-white/10 bg-[#1b0508] p-2">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={getButtonClass(editorState.isBold)}
      >
        <IconBold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={getButtonClass(editorState.isItalic)}
      >
        <IconItalic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={getButtonClass(editorState.isStrike)}
      >
        <IconStrikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={getButtonClass(editorState.isCode)}
      >
        <IconCode className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={getButtonClass(editorState.isParagraph)}
      >
        <IconHeading className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={getButtonClass(editorState.isHeading1)}
      >
        <IconH1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={getButtonClass(editorState.isHeading2)}
      >
        <IconH2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={getButtonClass(editorState.isHeading3)}
      >
        <IconH3 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={getButtonClass(editorState.isBulletList)}
      >
        <IconList className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={getButtonClass(editorState.isOrderedList)}
      >
        <IconListNumbers className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={openLinkDialog}
        className={getButtonClass(editorState.isLink)}
      >
        <IconLink className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <IconLinkOff className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={getButtonClass(editorState.isBlockquote)}
      >
        <IconQuote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <IconMinus className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <IconEraser className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <CornerDownLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <IconRotate2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <IconRotateClockwise2 className="h-4 w-4" />
      </Button>
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="border-white/20 bg-[#120104] text-white">
          <DialogHeader>
            <DialogTitle>Tambahkan Link</DialogTitle>
            <DialogDescription className="text-white/60">
              Pilih teks di editor atau isi label baru untuk membuat tautan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-white/50">
                URL
              </label>
              <Input
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                className="border-white/20 bg-black/30 text-white placeholder-white/40"
                placeholder="https://unlsh.society"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.4em] text-white/50">
                Label (Opsional)
              </label>
              <Input
                value={linkLabel}
                onChange={(event) => setLinkLabel(event.target.value)}
                className="border-white/20 bg-black/30 text-white placeholder-white/40"
                placeholder="Teks yang ditampilkan"
              />
            </div>
          </div>
          <DialogFooter className="mt-4 gap-2 sm:gap-3">
            <Button
              type="button"
              variant="ghost"
              className="border border-white/20 text-white hover:bg-white/5"
              onClick={() => setIsLinkDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              className="bg-[#ff6f61] text-white hover:bg-[#ff3f43]"
              onClick={handleApplyLink}
            >
              Simpan Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  minHeight?: number;
  id?: string;
  className?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  label,
  description,
  error,
  placeholder,
  minHeight = 240,
  id,
  className,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions,
    content: value || "",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && current !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    if (!value && current !== "") {
      editor.commands.setContent("", { emitUpdate: false });
    }
  }, [editor, value]);

  const placeholderText =
    placeholder ?? "Mulai tulis konten panjang di sini...";
  const showPlaceholder =
    editor && editor.isEmpty && !editor.isDestroyed && !value;

  return (
    <div className={cn("space-y-2 text-white font-sans", className)}>
      {label ? (
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      ) : null}
      {description ? (
        <p className="text-sm text-white/70">{description}</p>
      ) : null}
      <div
        className="overflow-hidden rounded-2xl border border-white/15 bg-[#1b0508] shadow-sm"
        id={id}
      >
        {editor ? <MenuBar editor={editor} /> : null}
        <div
          className="relative prose prose-sm max-w-none bg-white px-4 py-3"
          style={{ minHeight }}
        >
          {showPlaceholder ? (
            <p className="pointer-events-none absolute left-4 top-3 text-sm">
              {placeholderText}
            </p>
          ) : null}
          <EditorContent editor={editor} className="relative z-[1]" />
        </div>
      </div>
      {error ? <p className="text-xs text-[#b4231f]">{error}</p> : null}
    </div>
  );
};

export default RichTextEditor;
