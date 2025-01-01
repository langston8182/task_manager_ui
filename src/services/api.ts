import { useAuthStore } from './auth';

const API_URL = 'https://task.cyrilmarchive.com/task';

export const sendMessage = async (question: string): Promise<string> => {
  const { accessToken, userInfo } = useAuthStore.getState();
  const username = userInfo?.givenName || 'Utilisateur';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        question,
        username,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la communication avec le serveur');
    }

    const data = await response.json();
    if (typeof data === 'object' && 'answer' in data) {
      return data.answer;
    }
    if (typeof data === 'object' && 'body' in data) {
      return data.body;
    }
    if (typeof data === 'string') {
      return data;
    }
    
    throw new Error('Format de réponse invalide');
  } catch (error) {
    throw new Error('Impossible de communiquer avec le serveur. Veuillez réessayer.');
  }
};