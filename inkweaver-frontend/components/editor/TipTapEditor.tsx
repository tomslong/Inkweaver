'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/useAppStore';
import { useState } from 'react';

interface TipTapEditorProps {
  initialContent?: string;
  placeholder?: string;
  readOnly?: boolean;
  onContentChange?: (content: string) => void;
}

export function TipTapEditor({
  initialContent = '',
  placeholder = '开始写作...',
  readOnly = false,
  onContentChange,
}: TipTapEditorProps) {
  const { setEditorContent, isEditorLoading, setIsEditorLoading } = useAppStore();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Blockquote,
      OrderedList,
      BulletList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      HorizontalRule,
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    editable: !readOnly && !isEditorLoading,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setEditorContent(content);
      onContentChange?.(content);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      setSelectedText(text);
      setIsSelecting(text.length > 0);
    },
  });

  const handleRewrite = async () => {
    if (!editor || !selectedText) return;

    setIsEditorLoading(true);
    try {
      // 这里将在后续实现AI划词重写功能
      // 暂时模拟一个简单的替换
      editor.chain().focus().deleteSelection().insertContent(`${selectedText} [重写后]`).run();
    } catch (error) {
      console.error('重写失败:', error);
    } finally {
      setIsEditorLoading(false);
    }
  };

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleCode = () => editor?.chain().focus().toggleCode().run();
  const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleHeading3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run();
  const insertHorizontalRule = () => editor?.chain().focus().setHorizontalRule().run();
  const insertCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();

  return (
    <div className="flex flex-col h-full">
      {/* 工具栏 */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleBold}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('bold') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          <strong>B</strong>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleItalic}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('italic') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          <em>I</em>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleUnderline}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('underline') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          <u>U</u>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleStrike}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('strike') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          <s>S</s>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCode}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('code') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          <code>Code</code>
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleBlockquote}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('blockquote') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          引用
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleOrderedList}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('orderedList') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          有序列表
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleBulletList}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('bulletList') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          无序列表
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHeading1}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('heading', { level: 1 }) ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          H1
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHeading2}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          H2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHeading3}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('heading', { level: 3 }) ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          H3
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={insertCodeBlock}
          disabled={!editor || isEditorLoading}
          className={editor?.isActive('codeBlock') ? 'bg-blue-100 dark:bg-blue-900' : ''}
        >
          代码块
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={insertHorizontalRule}
          disabled={!editor || isEditorLoading}
        >
          分隔线
        </Button>
        <div className="ml-auto">
          {isSelecting && (
            <Button
              variant="default"
              size="sm"
              onClick={handleRewrite}
              disabled={!editor || isEditorLoading}
            >
              AI重写
            </Button>
          )}
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-md">
        <EditorContent editor={editor} className="prose dark:prose-invert max-w-none" />
        {isEditorLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
            <div className="text-lg font-semibold text-white">AI正在写作...</div>
          </div>
        )}
      </div>
    </div>
  );
}
