import { AppShell, Paper, Text, SimpleGrid, Image, Box } from "@mantine/core";
import { FC } from "react";
import logo_a100 from "../../assets/a100_logo.png";
import bulbIcon from "../../assets/bulb.svg";
import capIcon from "../../assets/cap.svg";
import penIcon from "../../assets/pen.svg";
import planeIcon from "../../assets/plane.svg";
import styles from "./ChatMainBlock.module.scss";
import clsx from "clsx";
import { useAppSelector } from "../../store/hooks";

type InfoCardProps = {
  icon: string;
  text: string;
};

const InfoCard: FC<InfoCardProps> = ({ icon, text }) => (
  <Paper h={123} w={160} shadow='xs' radius='lg' withBorder p='sm'>
    <Image w={18} mb={8} src={icon} alt={text} />
    <Text>{text}</Text>
  </Paper>
);

const ChatMainBlock = () => {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);

  return (
    <AppShell.Main
      className={clsx(styles.main, isNavClosed && styles.noLeftPadding)}
    >
      <Box className={styles.mainContent}>
        <Image w={114} src={logo_a100} alt='A100 Logo' />
        <SimpleGrid
          cols={{ base: 2, md: 4 }}
          spacing={{ base: 10, md: "md" }}
          verticalSpacing='md'
        >
          <InfoCard icon={capIcon} text='Как создать проект в системе?' />
          <InfoCard icon={penIcon} text='Изменить имя документа' />
          <InfoCard icon={bulbIcon} text='Как сохранить проект?' />
          <InfoCard icon={planeIcon} text='Правильное сохрание файла' />
        </SimpleGrid>
      </Box>
    </AppShell.Main>
  );
};

export default ChatMainBlock;
