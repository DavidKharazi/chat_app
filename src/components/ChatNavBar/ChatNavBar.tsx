import {
  AppShell,
  Box,
  Flex,
  Image,
  NavLink,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FC, useEffect } from "react";
import updatePlanIcon from "../../assets/updatePlan.svg";
import a100Icon from "../../assets/a100_logo.png";
import translateIcon from "../../assets/translate.svg";
import reviewChatIcon from "../../assets/reviewChat.svg";
import styles from "./ChatNavBar.module.scss";
import clsx from "clsx";
import Avatar from "../UI/Avatar";
import NavMenuButton from "../UI/NavMenuButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "@mantine/hooks";
import { closeNav, openNav } from "../../slices/navBarSlice";

type NavItemProps = {
  iconSrc?: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ iconSrc, label }) => (
  <NavLink
    label={label}
    leftSection={
      iconSrc && <Image w={24} src={iconSrc} alt={`${label} icon`} />
    }
    variant='subtle'
    component='a'
    href='#'
    className={styles.navLink}
  />
);

const ChatNavBar = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (matches) {
      dispatch(openNav());
    } else {
      dispatch(closeNav());
    }
  }, [matches, dispatch]);

  return (
    <AppShell.Navbar
      className={clsx(styles.navBar, isNavClosed && styles.navBarHidden)}
    >
      <NavMenuButton hiddenFrom='sm' />
      <Stack gap={20}>
        <Box>
          <NavItem iconSrc={a100Icon} label='CyberMan A100' />
          <NavItem iconSrc={translateIcon} label='Translater' />
          <NavItem iconSrc={reviewChatIcon} label='Обзор CyberMan’s' />
        </Box>

        <Box>
          <Title fz='xs' c='var(--font-color-secondary)' mb={5}>
            Сегодня
          </Title>
          <NavItem label='Режим дискавери дорожная карта' />
        </Box>

        <Box>
          <Title fz='xs' c='var(--font-color-secondary)' mb={5}>
            Предыдущие 7 дней
          </Title>
          <NavItem label='Новые офисные стулья' />
          <NavItem label='Translate English to French' />
          <NavItem label='Новый чат' />
        </Box>
      </Stack>
      <Box>
        <Flex gap={8} px={8} py={10} align='center'>
          <Image w={22} src={updatePlanIcon} alt='Update plan icon' />
          <Box>
            <Text fz='sm' fw='bold'>
              Обновить план
            </Text>
            <Text fz='xs' fw='normal' c='var(--font-color-secondary-light)'>
              Получите CyberMan Plus и…
            </Text>
          </Box>
        </Flex>
        <Flex px={8} py={10} align='center' gap={8} hiddenFrom='sm'>
          <Avatar />
          <Text>Utlik Dmitry</Text>
        </Flex>
      </Box>
    </AppShell.Navbar>
  );
};

export default ChatNavBar;
