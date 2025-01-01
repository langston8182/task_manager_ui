import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  hasError?: boolean;
  onRetry?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, hasError = false, onRetry }) => {
  const isUser = message.sender === 'user';
  const formattedDateTime = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(message.timestamp);

  const formattedContent = message.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < message.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 md:mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-lg px-3 py-2 md:px-4 md:py-2 ${
          isUser
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex items-start gap-2">
          <p className="text-sm md:text-base">{formattedContent}</p>
          {hasError && (
            <div className="flex items-center gap-1 md:gap-2">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
              <button
                onClick={onRetry}
                className="p-1 hover:bg-green-600 rounded-full transition-colors"
                title="Réessayer"
              >
                <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          )}
        </div>
        <p className={`text-[10px] md:text-xs mt-1 ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
          {formattedDateTime}
        </p>
      </div>
    </div>
  );
};