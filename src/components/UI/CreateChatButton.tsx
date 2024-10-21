// import { ActionIcon, ActionIconProps, Image } from "@mantine/core";
// import newChatButtonIcon from "../../assets/newChatButton.svg";
// import { FC } from "react";
//
//
// const CreateChatButton: FC<ActionIconProps> = (props) => {
//   return (
//     <ActionIcon size={40} variant='transparent' {...props}>
//       <Image w={40} src={newChatButtonIcon} />
//     </ActionIcon>
//   );
// };
//
// export default CreateChatButton;

import { FC } from "react";
import { ActionIcon, Image } from "@mantine/core";
import newChatButtonIcon from "../../assets/newChatButton.svg";
import { loadChatTopics } from "../../services/chatService"; // ваш сервис для загрузки тем чатов
import { useAppDispatch } from "../../store/hooks"; // если используете redux
import { BASE_URL } from '../../authService';


const CreateChatButton: FC<ActionIconProps> = (props) => {
  const dispatch = useAppDispatch(); // добавим dispatch для обновления темы чатов

  const handleCreateNewChat = async () => {
    const email = localStorage.getItem("username");

    if (!email) {
      console.error("Username not found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:8222/create_new_chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.error("Failed to create new chat", response.statusText);
        return;
      }

      const data = await response.json();
      const { session_id } = data;

      // Загрузим обновленный список чатов
      const updatedTopics = await loadChatTopics();

      // Обновим список тем в redux (если нужно) или в локальном стейте
      dispatch({ type: "chat/updateChatTopics", payload: updatedTopics });

      // Сохраним текущий chatId
      localStorage.setItem("currentChatId", session_id);

    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <ActionIcon
      size={40}
      variant="transparent"
      {...props}
      onClick={handleCreateNewChat} // добавим обработчик
    >
      <Image w={40} src={newChatButtonIcon} />
    </ActionIcon>
  );
};

export default CreateChatButton;

