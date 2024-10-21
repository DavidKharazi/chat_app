


import { AppShell, Paper, Text, SimpleGrid, Image, Box, ScrollArea } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import logo_a100 from "../../assets/a100_logo.png";
import bulbIcon from "../../assets/bulb.svg";
import capIcon from "../../assets/cap.svg";
import penIcon from "../../assets/pen.svg";
import planeIcon from "../../assets/plane.svg";
import styles from "./ChatMainBlock.module.scss";
import clsx from "clsx";
import { useAppSelector } from "../../store/hooks";
import { loadChatMessages } from "../../services/chatService"; // Импорт функции загрузки сообщений

type InfoCardProps = {
  icon: string;
  text: string;
};

const InfoCard: FC<InfoCardProps> = ({ icon, text }) => (
  <Paper h={123} w={160} shadow='xs' radius='lg' withBorder p='sm'>
    <Image w={18} mb={8} src={icon} alt={text} />
    <Text>{text}</Text>
  </Paper>
);

const ChatMainBlock = () => {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);
  const [chatId, setChatId] = useState<number | null>(null); // Текущий выбранный чат
  const [messages, setMessages] = useState<any[]>([]); // Сообщения чата

  useEffect(() => {
    const currentChatId = localStorage.getItem("currentChatId");
    if (currentChatId) {
      setChatId(Number(currentChatId));
    }
  }, []);

  useEffect(() => {
    if (chatId !== null) {
      // Загружаем сообщения для текущего чата
      const fetchMessages = async () => {
        const data = await loadChatMessages(chatId);
        if (data && data.messages) {
          setMessages(data.messages); // Извлекаем массив сообщений из объекта
        }
      };
      fetchMessages();
    }
  }, [chatId]);

  const formatMessage = (message: string) => {
    const imageTemplateRegex = /!\[[^\]]*\]\(|https:\/\/[^\s]+\.png\)?/gi;
    let formattedMessage = message.replace(imageTemplateRegex, (match) => {
      if (match.startsWith('http')) {
        const cleanedMatch = match.replace(/\)$/, '');
        return `<div style="margin-bottom: 10px;">
                    <img src="${cleanedMatch}" style="max-width: 100%; height: auto;"/>
                </div>\n`;
      } else {
        const wordsOnly = match.replace(/[!()[\]]/g, '').trim();
        return wordsOnly;
      }
    });

    return formattedMessage.trim();
  };

  return (
    <AppShell.Main className={clsx(styles.main, isNavClosed && styles.noLeftPadding)}>
      <Box className={styles.mainContent}>
        {/* Блок для отображения сообщений чата */}
        <ScrollArea style={{ height: messages.length > 1 ? 'auto' : 150, marginBottom: 20 }}>
          <div id="chat-window" className={messages.length > 1 ? styles.fullChat : undefined}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className={styles.message}>
                  <strong>{message.sender}:</strong>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(message.messages) }} />
                  <small>{new Date(message.sent_at).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <Text>Нет сообщений</Text>
            )}
          </div>
        </ScrollArea>

        {/* Логотип и информационные карточки */}
        {messages.length <= 1 && (
          <>
            <Image w={114} src={logo_a100} alt='A100 Logo' style={{ marginBottom: 20 }} />
            <SimpleGrid
              cols={{ base: 2, md: 4 }}
              spacing={{ base: 10, md: "md" }}
              verticalSpacing='md'
            >
              <InfoCard icon={capIcon} text='Как создать проект в системе?' />
              <InfoCard icon={penIcon} text='Изменить имя документа' />
              <InfoCard icon={bulbIcon} text='Как сохранить проект?' />
              <InfoCard icon={planeIcon} text='Правильное сохрание файла' />
            </SimpleGrid>
          </>
        )}
      </Box>
    </AppShell.Main>
  );
};

export default ChatMainBlock;

