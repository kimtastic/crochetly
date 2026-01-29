import { useState, useRef, useEffect } from 'react';
import { Copy, Bot, MessageSquare, ChevronDown, Check } from 'lucide-react';

export default function AIDropdownTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const openInClaude = () => {
    const url = `https://claude.ai/new?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const openInChatGPT = () => {
    const url = `https://chat.openai.com/?q=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="ai-dropdown-tools" ref={dropdownRef}>
      <button
        className="ai-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI tools"
        aria-expanded={isOpen}
      >
        <Bot size={16} />
        <span>AI Tools</span>
        <ChevronDown size={14} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="ai-dropdown-menu">
          <button
            className="ai-dropdown-item"
            onClick={copyPageLink}
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Page Link</span>
              </>
            )}
          </button>
          
          <button
            className="ai-dropdown-item"
            onClick={openInClaude}
          >
            <Bot size={16} />
            <span>Open in Claude</span>
          </button>
          
          <button
            className="ai-dropdown-item"
            onClick={openInChatGPT}
          >
            <MessageSquare size={16} />
            <span>Open in ChatGPT</span>
          </button>
        </div>
      )}
    </div>
  );
}