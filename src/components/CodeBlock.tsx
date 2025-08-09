import React, { useState } from "react";
import { Copy, CheckCheck, ChevronDown, ChevronUp } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Asegurarse de que el código tenga los saltos de línea correctos
  const formattedCode = code.replace(/\\n/g, '\n');

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(formattedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mt-4 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-t-lg transition-colors duration-200"
      >
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          {isExpanded ? "Ocultar código" : "Ver código"}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative bg-gray-900 dark:bg-gray-900 rounded-b-lg">
          <SyntaxHighlighter 
            language={language} 
            style={oneDark}
            wrapLines={true}
            showLineNumbers={true}
          >
            {formattedCode}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-btn-primary hover:bg-blue-400 rounded-md transition-colors duration-200"
            aria-label="Copy code"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;