import { AppShell, Box, Flex, Overlay } from "@mantine/core";
import { FC } from "react";
import ChatModeButton from "../UI/ChatModeButton";
import styles from "./ChatHeader.module.scss";
import clsx from "clsx";
import Avatar from "../UI/Avatar";
import CreateChatButton from "../UI/CreateChatButton";
import { useMediaQuery } from "@mantine/hooks";
import NavMenuButton from "../UI/NavMenuButton";

type ChatHeaderProps = {
  isNavClosed: boolean;
  toggleNav: () => void;
};

const ChatHeader: FC<ChatHeaderProps> = ({ isNavClosed, toggleNav }) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <AppShell.Header>
      <Flex h="100%">
        <Box
          className={clsx(
            styles.leftButtonsGroup,
            isNavClosed && styles.compactLeftButtonsGroup
          )}
        >
          <NavMenuButton onClick={toggleNav} />
          <CreateChatButton className={styles.createChatButton} />
        </Box>
        <Box className={styles.rightButtonsGroup}>
          <ChatModeButton />
          <Avatar visibleFrom="sm" />
        </Box>
      </Flex>
      {!isNavClosed && !matches && (
        <Overlay onClick={toggleNav} color="#fff" opacity={0.9} zIndex={99} />
      )}
    </AppShell.Header>
  );
};

export default ChatHeader;
