import { BASE_URL } from './authService';

export const loadChatMessages = async () => {
  const chatId = localStorage.getItem('currentChatId');
  console.log(`Loading messages for chat ID: ${chatId}`);

  try {
    const response = await fetch(`${BASE_URL}/get_chat_messages/${chatId}`);

    if (!response.ok) {
      throw new Error("Failed to load chat messages");
    }

    const data = await response.json();
    const messages = data.messages;

    // Возвращаем загруженные сообщения
    return messages;
  } catch (error) {
    console.error("Error loading chat messages:", error);
    return [];
  }
};
