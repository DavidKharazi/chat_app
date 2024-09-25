import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ChatFooter from "../components/ChatFooter/ChatFooter";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatNavBar from "../components/ChatNavBar/ChatNavBar";
import ChatMainBlock from "../components/ChatMainBlock";

export function ChatPage() {
  const [isNavClosed, { toggle: toggleNav }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: isNavClosed ? !isNavClosed : isNavClosed },
      }}
      withBorder={false}
    >
      <ChatHeader isNavClosed={isNavClosed} toggleNav={toggleNav} />
      <ChatNavBar isNavClosed={isNavClosed} />
      <ChatMainBlock isNavClosed={isNavClosed} />
      <ChatFooter isNavClosed={isNavClosed} />
    </AppShell>
  );
}
