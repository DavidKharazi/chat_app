import { AppShell, Box, Flex } from "@mantine/core";
import ChatModeButton from "../UI/ChatModeButton";
import styles from "./ChatHeader.module.scss";
import clsx from "clsx";
import Avatar from "../UI/Avatar";
import CreateChatButton from "../UI/CreateChatButton";
import NavMenuButton from "../UI/NavMenuButton";
import { useAppSelector } from "../../store/hooks";
import NavOverlay from "../UI/NavOverlay";

const ChatHeader = () => {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);

  return (
    <AppShell.Header>
      <Flex h='100%'>
        <Box
          className={clsx(
            styles.leftButtonsGroup,
            isNavClosed && styles.compactLeftButtonsGroup
          )}
        >
          <NavMenuButton />
          <CreateChatButton className={styles.createChatButton} />
        </Box>
        <Box className={styles.rightButtonsGroup}>
          <ChatModeButton />
          <Avatar visibleFrom='sm' />
        </Box>
      </Flex>
      <NavOverlay />
    </AppShell.Header>
  );
};

export default ChatHeader;
