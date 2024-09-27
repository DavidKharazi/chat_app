import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Flex,
  Group,
  Image,
} from "@mantine/core";
import { FC } from "react";
import ChatModeButton from "../ChatModeButton";
import menuButtonIcon from "../../assets/menuButton.svg";
import newChatButtonIcon from "../../assets/newChatButton.svg";
import styles from "./ChatHeader.module.scss";
import clsx from "clsx";

type ChatHeaderProps = {
  isNavClosed: boolean;
  toggleNav: () => void;
};

const ChatHeader: FC<ChatHeaderProps> = ({ isNavClosed, toggleNav }) => {
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
          className={clsx(
            styles.headerButtons,
            isNavClosed && styles.compactHeaderButtons
          )}
        >
          <ActionIcon size={40} variant='transparent' onClick={toggleNav}>
            <Image src={menuButtonIcon} />
          </ActionIcon>
          <ActionIcon size={40} variant='transparent'>
            <Image src={newChatButtonIcon} />
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
