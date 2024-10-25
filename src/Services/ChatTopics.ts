import { BASE_URL } from './authService';

export const loadChatTopics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat-topics`);

    if (!response.ok) {
      throw new Error("Failed to load chat topics");
    }

    const topics = await response.json();

    // Преобразуем массив в объект, где ключ - это id, а значение - это topic
    return topics.reduce((acc: { [key: number]: string }, item: { id: number; topic: string }) => {
      acc[item.id] = item.topic;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error loading chat topics:", error);
    return {};
  }
};
