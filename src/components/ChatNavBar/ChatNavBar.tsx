


import {
  AppShell,
  Box,
  Stack,
  Title,
  NavLink,
  Text,
  Flex,
  Image,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import clsx from "clsx";
import styles from "./ChatNavBar.module.scss";

// Import icons
import updatePlanIcon from "../../assets/updatePlan.svg";
import a100Icon from "../../assets/a100_logo.png";
import translateIcon from "../../assets/translate.svg";
import reviewChatIcon from "../../assets/reviewChat.svg";
import dotsIcon from "../../assets/submenu.svg"; // Импорт иконки для кнопки

// Import components
import NavMenuButton from "../UI/NavMenuButton";
import { closeNav, openNav } from "../../slices/navBarSlice";
import { BASE_URL } from '../../services/authService';

type NavItemProps = {
  iconSrc?: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  chatId?: number;
  onEditClick?: (chatId: number) => void;
  onDeleteClick?: (chatId: number) => void;
};

const NavItem: FC<NavItemProps> = ({ iconSrc, label, onClick, isActive, chatId, onEditClick, onDeleteClick }) => (
  <div className={styles.navItem}>
    <NavLink
      label={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {iconSrc && <Image w={24} src={iconSrc} alt={`${label} icon`} />}
            <span style={{ marginRight: 8 }}>{label}</span>
          </div>
          <Image
            src={dotsIcon}
            alt="Options"
            onClick={(e) => {
              e.stopPropagation();
              if (chatId) {
                onEditClick?.(chatId);
              }
            }}
            className={styles.optionsIcon}
            style={{ cursor: 'pointer', width: 20, height: 20 }} // Уменьшаем размер иконки
          />
        </div>
      }
      variant="subtle"
      component="a"
      href="#"
      className={clsx(styles.navLink, isActive && styles.activeNavLink)}
      onClick={onClick}
    />
  </div>
);



const ChatNavBar: FC = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);
  const dispatch = useAppDispatch();

  const [chatTopics, setChatTopics] = useState<{ [key: number]: string }>({});
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [userChats, setUserChats] = useState<number[]>([]);
  const [popupMenuVisible, setPopupMenuVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newChatTitle, setNewChatTitle] = useState("");

  const loadUserSpecificChats = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) return;

      const response = await fetch(`${BASE_URL}/get_user_chats/${username}`);
      if (!response.ok) throw new Error('Failed to load user chats');

      const data = await response.json();
      setUserChats(data.chats.map((chat: any) => chat.id));
    } catch (error) {
      console.error('Error loading user chats:', error);
    }
  };

  const loadChatTopics = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat-topics`);
      if (!response.ok) throw new Error("Failed to load chat topics");

      const topics = await response.json();
      const topicsMap = topics.reduce((acc: { [key: number]: string }, item: { id: number; topic: string }) => {
        acc[item.id] = item.topic;
        return acc;
      }, {});
      setChatTopics(topicsMap);
    } catch (error) {
      console.error("Error loading chat topics:", error);
    }
  };

  const switchChat = async (chatId: number) => {
    try {
      localStorage.setItem("currentChatId", chatId.toString());
      setActiveChatId(chatId);

      const response = await fetch(`${BASE_URL}/get_chat_messages/${chatId}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error('Failed to load chat messages');

      const chatElement = document.getElementById("chat-window");
      if (chatElement) {
        chatElement.innerHTML = "";
        setTimeout(() => {
          chatElement.scrollTop = chatElement.scrollHeight;
        }, 100);
      }
    } catch (error) {
      console.error("Failed to switch chat:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadUserSpecificChats();
      await loadChatTopics();

      const storedChatId = localStorage.getItem("currentChatId");
      if (storedChatId) {
        setActiveChatId(Number(storedChatId));
      }
    };

    init();

    if (matches) {
      dispatch(openNav());
    } else {
      dispatch(closeNav());
    }
  }, [matches, dispatch]);

  const handleChatClick = (chatId: number) => {
    switchChat(chatId);
  };

  const filterUserChats = (topics: { [key: number]: string }) => {
    return Object.entries(topics).reduce((acc: { [key: number]: string }, [id, topic]) => {
      if (userChats.includes(Number(id))) {
        acc[Number(id)] = topic;
      }
      return acc;
    }, {});
  };

  const userSpecificChatTopics = filterUserChats(chatTopics);

  const handleEditClick = (chatId: number) => {
    setSelectedChatId(chatId);
    setNewChatTitle(chatTopics[chatId]);
    setPopupMenuVisible(true);
  };

  const handleDeleteClick = async (chatId: number) => {
    const isConfirmed = confirm("Вы действительно хотите удалить этот чат?");
    if (isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}/delete_chat/${chatId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await loadUserSpecificChats(); // Обновляем список чатов после удаления
          if (chatId === activeChatId) {
            localStorage.removeItem("currentChatId");
            setActiveChatId(null);
          }
        } else {
          console.error("Failed to delete chat", response.statusText);
        }
      } catch (error) {
        console.error("Failed to delete chat", error);
      }
    }
    setPopupMenuVisible(false);
  };

  const saveChatTitle = async () => {
    if (selectedChatId !== null) {
      const newTopic = newChatTitle.trim();

      if (!newTopic) {
        alert("Название чата не может быть пустым");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/update-topic`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: selectedChatId,
            new_topic: newTopic,
          }),
        });

        if (response.ok) {
          await loadChatTopics(); // Обновляем список тем после изменения
        } else {
          const error = await response.json();
          alert("Ошибка: " + error.detail);
        }
      } catch (error) {
        alert("Ошибка сети: " + error.message);
      }

      setPopupMenuVisible(false);
    }
  };

  const handleBlur = () => {
    saveChatTitle();
  };

  return (
    <AppShell.Navbar
      className={clsx(styles.navBar, isNavClosed && styles.navBarHidden)}
    >
      <NavMenuButton hiddenFrom="sm" />
      <Stack gap={20}>
        <Box>
          <NavItem iconSrc={a100Icon} label="CyberMan A100" />
          <NavItem iconSrc={translateIcon} label="Translater" />
          <NavItem iconSrc={reviewChatIcon} label="Обзор CyberMan's" />
        </Box>

        <Box className={styles.navBarScrollable}>
          <Title fz="xs" c="var(--font-color-secondary)" mb={5}>
            Сегодня
          </Title>

          {Object.entries(userSpecificChatTopics).map(([id, topic]) => (
            <NavItem
              key={id}
              label={topic || 'Новый чат'}
              onClick={() => handleChatClick(Number(id))}
              isActive={activeChatId === Number(id)}
              chatId={Number(id)}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </Box>

        <Box className={styles.navBarScrollable}>
          <Title fz="xs" c="var(--font-color-secondary)" mb={5}>
            Предыдущие 7 дней
          </Title>
          <NavItem label="Новые офисные стулья" />
          <NavItem label="Translate English to French" />
          <NavItem label="Новый чат" />
        </Box>

        {popupMenuVisible && (
          <div className={styles.popupMenu}>
            <input
              type="text"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveChatTitle();
                }
              }}
              placeholder="Введите новое название чата"
            />
            <button onClick={() => handleDeleteClick(selectedChatId!)}>Удалить чат</button>
          </div>
        )}
      </Stack>
    </AppShell.Navbar>
  );
};

export default ChatNavBar;
