
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MessageMarkdownProps {
  content: string;
  className?: string;
}

const MessageMarkdown: React.FC<MessageMarkdownProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      className={cn("markdown-content text-sm leading-relaxed", className)}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MessageMarkdown;
