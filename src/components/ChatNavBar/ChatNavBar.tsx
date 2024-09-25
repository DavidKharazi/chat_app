import {
  AppShell,
  Box,
  Flex,
  NavLink,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import updatePlanIcon from "../../assets/updatePlan.svg";
import a100Icon from "../../assets/a100_logo.png";
import translateIcon from "../../assets/translate.svg";
import reviewChatIcon from "../../assets/reviewChat.svg";
import styles from "./ChatNavBar.module.scss";

type NavItemProps = {
  iconSrc?: string;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ iconSrc, label }) => (
  <NavLink
    label={label}
    leftSection={
      iconSrc && <img width={24} src={iconSrc} alt={`${label} icon`} />
    }
    variant='subtle'
    component='a'
    href='#'
    className={styles.navLink}
  />
);

type ChatFooterProps = {
  isNavClosed: boolean;
};

const ChatNavBar: React.FC<ChatFooterProps> = ({ isNavClosed }) => {
  return (
    <AppShell.Navbar
      className={`${styles.navBar} ${isNavClosed && styles.navBarHidden}`}
    >
      <Stack gap={20}>
        <Box>
          <NavItem iconSrc={a100Icon} label='CyberMan A100' />
          <NavItem iconSrc={translateIcon} label='Translater' />
          <NavItem iconSrc={reviewChatIcon} label='Обзор CyberMan’s' />
        </Box>

        <Box>
          <Title fz='xs' c='#7D7D7D' mb={5}>
            Сегодня
          </Title>
          <NavItem label='Режим дискавери дорожная карта' />
        </Box>

        <Box>
          <Title fz='xs' c='#7D7D7D' mb={5}>
            Предыдущие 7 дней
          </Title>
          <NavItem label='Новые офисные стулья' />
          <NavItem label='Translate English to French' />
          <NavItem label='Новый чат' />
        </Box>
      </Stack>

      <Flex gap={8} align='center'>
        <img src={updatePlanIcon} alt='Update plan icon' />
        <Box>
          <Text fz='sm' fw={600}>
            Обновить план
          </Text>
          <Text fz='xs' fw={400} c='#B4B4B4'>
            Получите CyberMan Plus и…
          </Text>
        </Box>
      </Flex>
    </AppShell.Navbar>
  );
};

export default ChatNavBar;
