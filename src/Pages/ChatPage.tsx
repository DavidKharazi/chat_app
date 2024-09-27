import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ChatFooter from "../components/ChatFooter/ChatFooter";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatNavBar from "../components/ChatNavBar/ChatNavBar";
import ChatMainBlock from "../components/ChatMainBlock";

const HEADER_CONFIG = { height: 60 };
const NAVBAR_CONFIG = {
  width: 260,
  breakpoint: "sm",
};

export function ChatPage() {
  const [isNavClosed, { toggle: toggleNav }] = useDisclosure();

  return (
    <AppShell
      header={HEADER_CONFIG}
      navbar={{
        ...NAVBAR_CONFIG,
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
