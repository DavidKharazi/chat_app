
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: Set<(data: any) => void> = new Set();

  async connect(username: string): Promise<void> {
    this.socket = new WebSocket(`ws://localhost:8222/ws/rag_chat/?email=${encodeURIComponent(username)}`);

    this.socket.onopen = async () => {
      console.log('WebSocket connected');

      // Вызов функции для получения чатов
      try {
        await getUserChats(username);

        // Получаем currentChatId из localStorage
        const currentChatId = localStorage.getItem('currentChatId');
        if (currentChatId) {
          // Загружаем сообщения для текущего чата
          await this.fetchChatMessages(parseInt(currentChatId));
        }
      } catch (error) {
        console.error('Ошибка при получении чатов:', error);
      }
    };

    this.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        console.error(`Ошибка: ${data.error}`);
      } else if (data.messages) {
        // Обработка сообщений
        const currentChatId = localStorage.getItem('currentChatId');
        if (currentChatId) {
          data.messages.forEach((msg: any) => {
            if (msg.session_id === currentChatId) {
              this.messageHandlers.forEach(handler => handler(msg)); // Оповещаем всех слушателей
            }
          });
        }
      } else {
        this.messageHandlers.forEach(handler => handler(data)); // Оповещаем всех слушателей
      }
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log('WebSocket disconnected', event);
    };

    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error', error);
    };
  }

  // Новая функция для получения сообщений по session_id
  private async fetchChatMessages(sessionId: number): Promise<void> {
    try {
      const response = await fetch(`/get_chat_messages/${sessionId}`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Полученные сообщения:', data.messages);
      // Здесь вы можете обновить состояние чата на клиенте, например, вызвав обработчики
      data.messages.forEach((msg: any) => {
        this.messageHandlers.forEach(handler => handler(msg));
      });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  }

  send(message: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      // Получаем currentChatId из localStorage
      const currentChatId = localStorage.getItem('currentChatId');

      // Добавляем session_id к сообщению, если оно доступно
      const messageWithSession = {
        ...message,
        session_id: currentChatId || 1 // Используем currentChatId или дефолтное значение 1
      };

      // Логируем сообщение для проверки
      console.log('Отправляемое сообщение с session_id:', messageWithSession);

      // Отправляем сообщение с session_id
      this.socket.send(JSON.stringify(messageWithSession));
    } else {
      console.error('WebSocket не открыт. ReadyState:', this.socket?.readyState);
    }
  }

  addMessageHandler(handler: (data: any) => void): void {
    this.messageHandlers.add(handler);
  }

  removeMessageHandler(handler: (data: any) => void): void {
    this.messageHandlers.delete(handler);
  }

  close(): void {
    this.socket?.close();
  }
}
