export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ErrorNotification {
  id: string;
  message: string;
}

export interface ApiResponse {
  statusCode: number;
  body: string;
}