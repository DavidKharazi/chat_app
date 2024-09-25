import { Stack, AppShell, Paper, Text, SimpleGrid } from "@mantine/core";
import React from "react";
import logo_a100 from "../assets/a100_logo.png";
import bulbIcon from "../assets/bulb.svg";
import capIcon from "../assets/cap.svg";
import penIcon from "../assets/pen.svg";
import planeIcon from "../assets/plane.svg";

type InfoCardProps = {
  icon: string;
  text: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, text }) => (
  <Paper h={123} w={160} shadow='xs' radius='lg' withBorder p='sm'>
    <img src={icon} alt={text} />
    <Text>{text}</Text>
  </Paper>
);

type ChatMainBlockProps = {
  isNavClosed: boolean;
};

const ChatMainBlock: React.FC<ChatMainBlockProps> = ({ isNavClosed }) => {
  return (
    <AppShell.Main
      pl={isNavClosed ? 0 : 260}
      style={{ transition: "padding 0.3s ease-in-out" }}
    >
      <Stack align='center' pt={130}>
        <img width={114} src={logo_a100} alt='A100 Logo' />
        <SimpleGrid
          cols={{ base: 2, sm: 4 }}
          spacing={{ base: 10, sm: "md" }}
          verticalSpacing='md'
        >
          <InfoCard icon={capIcon} text='Как создать проект в системе?' />
          <InfoCard icon={penIcon} text='Изменить имя документа' />
          <InfoCard icon={bulbIcon} text='Как сохранить проект?' />
          <InfoCard icon={planeIcon} text='Правильное сохрание файла' />
        </SimpleGrid>
      </Stack>
    </AppShell.Main>
  );
};

export default ChatMainBlock;
