import { BASE_URL } from './authService';

export const getUserChats = async (email: string) => {
  try {
    const chat = localStorage.getItem("currentChatId");
    const response = await fetch(`${BASE_URL}/get_user_chats/${chat}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Получаем текст ответа
      console.error(`Ошибка при выполнении запроса: ${response.statusText}, ответ: ${errorText}`);
      throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
    }

    const data = await response.json(); // Тут будет ошибка, если это не JSON

    if (data.chats && data.chats.length > 0) {
      const chatId = data.chats[0].id;
      // localStorage.setItem('currentChatId', chatId.toString());
      // console.log(`currentChatId сохранен: ${chatId}`);
    } else {
      console.log('Чаты не найдены для данного пользователя.');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};





// Загрузка тем чатов
export const loadChatTopics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat-topics`);

    if (!response.ok) {
      throw new Error("Failed to load chat topics");
    }

    const topics = await response.json();
    return topics.reduce((acc: { [key: number]: string }, item: { id: number; topic: string }) => {
      acc[item.id] = item.topic;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error loading chat topics:", error);
    return {};
  }
};





// Создание нового чата
export const createNewChat = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/create_new_chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to create new chat");
    }

    return await response.json(); // Возвращаем данные чата
  } catch (error) {
    console.error("Error creating new chat:", error);
  }
};

// Переключение на другой чат
export const switchChat = async (chatId: string) => {
  localStorage.setItem("currentChatId", chatId);
  console.log(`Switched to chat: ${chatId}`);
  // Здесь можно реализовать логику загрузки сообщений чата
};

const chat = localStorage.getItem("currentChatId");

export async function loadChatMessages(chatId: number) {
  try {
    const response = await fetch(`${BASE_URL}/get_chat_messages/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error loading chat messages: ${response.statusText}`);
    }

    const messages = await response.json();
    console.log("Loaded chat messages:", messages); // Логируем загруженные сообщения
    return messages;
  } catch (error) {
    console.error("Failed to load chat messages:", error);
    return [];
  }
}