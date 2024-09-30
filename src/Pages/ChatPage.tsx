import { AppShell } from "@mantine/core";
import ChatFooter from "../components/ChatFooter/ChatFooter";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import ChatNavBar from "../components/ChatNavBar/ChatNavBar";
import ChatMainBlock from "../components/ChatMainBlock/ChatMainBlock";
import { useAppSelector } from "../store/hooks";
import NavOverlay from "../components/UI/NavOverlay";

const HEADER_CONFIG = { height: 60 };
const NAVBAR_CONFIG = {
  width: 260,
  breakpoint: "sm",
};

export function ChatPage() {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);

  return (
    <AppShell
      header={HEADER_CONFIG}
      navbar={{
        ...NAVBAR_CONFIG,
        collapsed: { mobile: isNavClosed },
      }}
      withBorder={false}
    >
      <ChatHeader />
      <ChatNavBar />
      <ChatMainBlock />
      <ChatFooter />
      <NavOverlay />
    </AppShell>
  );
}
