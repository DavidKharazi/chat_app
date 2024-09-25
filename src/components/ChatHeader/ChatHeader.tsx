import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Flex,
  Group,
} from "@mantine/core";
import React from "react";
import ChatModeButton from "../ChatModeButton";
import menuButtonIcon from "../../assets/menuButton.svg";
import newChatButtonIcon from "../../assets/newChatButton.svg";
import styles from "./ChatHeader.module.scss";

type ChatHeaderProps = {
  isNavClosed: boolean;
  toggleNav: () => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ isNavClosed, toggleNav }) => {
  return (
    <AppShell.Header>
      <Burger
        opened={!isNavClosed}
        onClick={toggleNav}
        hiddenFrom='sm'
        size='sm'
      />
      <Flex h='100%' visibleFrom='sm'>
        <Box
          className={`${styles.headerButtons} ${isNavClosed && styles.compactHeaderButtons}`}
        >
          <ActionIcon size={40} variant='transparent' onClick={toggleNav}>
            <img src={menuButtonIcon} />
          </ActionIcon>
          <ActionIcon size={40} variant='transparent'>
            <img src={newChatButtonIcon} />
          </ActionIcon>
        </Box>
        <Group justify='space-between' flex={1} px={12} py={8}>
          <ChatModeButton />
          <Avatar variant='filled' color='pink' radius='xl'>
            UT
          </Avatar>
        </Group>
      </Flex>
    </AppShell.Header>
  );
};

export default ChatHeader;
