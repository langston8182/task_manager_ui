import React, { useRef, useEffect } from 'react';
import { MessageSquare, LogOut } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ErrorToast } from './components/ErrorToast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { IntroductionPage } from './components/IntroductionPage';
import { useAuthStore } from './services/auth';
import { exchangeCodeForToken } from './services/cognito';
import { useMessages } from './hooks/useMessages';

export default function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userInfo, setAuthCode, logout } = useAuthStore();
  const {
    messages,
    errors,
    isLoading,
    failedMessageIds,
    handleSendMessage,
    retryMessage,
    dismissError
  } = useMessages();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    if (authCode) {
      setAuthCode(authCode);
      exchangeCodeForToken(authCode).catch(error => {
        dismissError(Date.now().toString());
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setAuthCode]);

  if (!isAuthenticated) {
    return <IntroductionPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-green-500 text-white p-3 md:p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
            <div>
              <h1 className="text-lg md:text-xl font-bold">Assistant de Tâches</h1>
              {userInfo && (
                <p className="text-xs md:text-sm">
                  Bonjour {userInfo.givenName} {userInfo.familyName}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Se déconnecter</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-2 md:p-4">
        <div className="container mx-auto max-w-3xl">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              hasError={failedMessageIds.includes(message.id)}
              onRetry={() => retryMessage(message.id)}
            />
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-2 md:px-4 pb-2 md:pb-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>

      {errors.map((error) => (
        <ErrorToast key={error.id} error={error} onDismiss={dismissError} />
      ))}
    </div>
  );
}