import { useState } from 'react';
import { Message, ErrorNotification } from '../types';
import { sendMessage } from '../services/api';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [errors, setErrors] = useState<ErrorNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedMessageIds, setFailedMessageIds] = useState<string[]>([]);

  const handleSendMessage = async (content: string) => {
    const messageId = Date.now().toString();
    const userMessage: Message = {
      id: messageId,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setFailedMessageIds((prev) => prev.filter(id => id !== messageId));
    } catch (error) {
      setFailedMessageIds((prev) => [...prev, messageId]);
      const newError: ErrorNotification = {
        id: Date.now().toString(),
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
      setErrors((prev) => [...prev, newError]);
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      await handleSendMessage(message.content);
    }
  };

  const dismissError = (id: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  return {
    messages,
    errors,
    isLoading,
    failedMessageIds,
    handleSendMessage,
    retryMessage,
    dismissError
  };
};