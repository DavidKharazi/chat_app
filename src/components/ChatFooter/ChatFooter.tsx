


import {
  ActionIcon,
  AppShell,
  Image,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import stapleIcon from "../../assets/staple.svg";
import filledArrowIcon from "../../assets/buttonFilledArrow.svg";
import styles from "./ChatFooter.module.scss";
import { clsx } from "clsx";
import questionIcon from "../../assets/question.svg";
import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react"; // Добавили useEffect
import { WebSocketService } from '../../services/WebSocketService'; // Импортируем WebSocketService
import { getUserChats } from '../../services/ChatService'; // Импортируем вашу функцию getUserChats

const ChatFooter = () => {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);
  const [message, setMessage] = useState("");
  const [socketService] = useState(() => new WebSocketService()); // Создаем WebSocketService
  const [chatMessages, setChatMessages] = useState<any[]>([]); // Состояние для сообщений

  const email = localStorage.getItem("username");
  let currentChatId = localStorage.getItem("currentChatId");

  useEffect(() => {
    // Соединение WebSocket при монтировании компонента
    const username = email; // Замените на ваше значение
    socketService.connect(username);

    // Обработчик получения сообщений
    socketService.addMessageHandler((data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]); // Добавляем новые сообщения в чат
    });

    return () => {
      // Закрытие WebSocket при размонтировании компонента
      socketService.close();
    };
  }, [socketService]);

  const sendMessage = async () => {
    if (message.trim()) {
      if (!currentChatId) {
        // Если currentChatId не установлен, пытаемся получить существующую сессию из базы данных
        currentChatId = await getUserChats(email);
        if (!currentChatId) {
          console.error("Не удалось получить chatId");
          return;
        }
        localStorage.setItem("currentChatId", currentChatId); // Сохраняем полученный chatId
      }

      const messagePayload = {
        question_data: {
          question: message,
          session_id: currentChatId, // Передаем правильный sessionId
        },
      };

      socketService.send(messagePayload); // Отправляем сообщение
      setMessage(""); // Очищаем поле ввода после отправки
    }
  };

  return (
    <AppShell.Footer
      className={clsx(styles.footer, isNavClosed && styles.noLeftPadding)}
    >
      <Stack w='100%' maw={768} px={12}>
        <Textarea
          classNames={{ input: styles.input }}
          placeholder='Спросить у CyberMan'
          autosize
          variant='filled'
          radius='xl'
          size='lg'
          minRows={1}
          maxRows={8}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              onClick={sendMessage} // Изменено на sendMessage
              variant='subtle'
              radius='xl'
              size="lg"
            >
              <Image w={32} src={filledArrowIcon} />
            </ActionIcon>
          }
          leftSection={<Image w={32} src={stapleIcon} />}
        />
        <Text
          lineClamp={1}
          fz='xs'
          fw='normal'
          c='var(--font-color-secondary)'
          ta='center'
        >
          CyberMan A100 всегда учится и развивается. Для точных решений
          рекомендуем перепроверять важные данные.
        </Text>

        {/* Отображение сообщений чата */}
        {chatMessages.map((msg, index) => (
          <Text key={index}>{msg.answer ? `AI: ${msg.answer}` : `User: ${msg.question_data?.question}`}</Text>
        ))}
      </Stack>
      <ActionIcon
        className={styles.questionIcon}
        variant='transparent'
        children={<Image w={24} src={questionIcon} />}
        visibleFrom='sm'
      />
    </AppShell.Footer>
  );
};

export default ChatFooter;
