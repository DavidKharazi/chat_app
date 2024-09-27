import { AppShell, Overlay } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import ChatFooter from "../components/ChatFooter/ChatFooter";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatNavBar from "../components/ChatNavBar/ChatNavBar";
import ChatMainBlock from "../components/ChatMainBlock/ChatMainBlock";
import { useEffect } from "react";

const HEADER_CONFIG = { height: 60 };
const NAVBAR_CONFIG = {
  width: 260,
  breakpoint: "sm",
};

export function ChatPage() {
  const [isNavClosed, { toggle: toggleNav }] = useDisclosure();
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if ((!matches && !isNavClosed) || matches) {
      toggleNav();
    }
  }, [matches]);

  return (
    <AppShell
      header={HEADER_CONFIG}
      navbar={{
        ...NAVBAR_CONFIG,
        collapsed: { mobile: isNavClosed },
      }}
      withBorder={false}
    >
      <ChatHeader isNavClosed={isNavClosed} toggleNav={toggleNav} />
      <ChatNavBar isNavClosed={isNavClosed} toggleNav={toggleNav} />
      <ChatMainBlock isNavClosed={isNavClosed} />
      <ChatFooter isNavClosed={isNavClosed} />
      {!isNavClosed && !matches && (
        <Overlay
          onClick={toggleNav}
          color='var(--background-color-primary)'
          opacity={0.9}
          zIndex={99}
        />
      )}
    </AppShell>
  );
}
