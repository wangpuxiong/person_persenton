import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Markdown } from "tiptap-markdown"
import { useTranslation } from "next-i18next"


export default function MarkdownEditor({ content, onChange }: { content: string; onChange: (content: string) => void }) {
    const { t } = useTranslation();
    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        content: content,
        editorProps: {
            attributes: {
                class: "outline-none transition-all duration-200",
            },
        },
        onUpdate: ({ editor }) => {
            const markdown = editor.storage.markdown.getMarkdown();
            onChange(markdown);
        },
        immediatelyRender: false,
    });

    // Update editor content when the content prop changes (for streaming)
    // useEffect(() => {
    //     if (editor && content !== editor.storage.markdown.getMarkdown()) {
    //         editor.commands.setContent(content);
    //     }
    // }, [content, editor]);

    return (
        <div className="relative">

            <EditorContent
                className="text-sm sm:text-base outline-none resize-none min-h-[60px] prose prose-sm max-w-none"
                editor={editor}
                placeholder={t('markdown_editor.placeholder')}
            />
        </div>
    );
}