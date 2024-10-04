import {
  ActionIcon,
  AppShell,
  Image,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import stapleIcon from "../../assets/staple.svg";
import filledArrowIcon from "../../assets/buttonFilledArrow.svg";
import styles from "./ChatFooter.module.scss";
import { clsx } from "clsx";
import questionIcon from "../../assets/question.svg";
import { useAppSelector } from "../../store/hooks";

const ChatFooter = () => {
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);

  return (
    <AppShell.Footer
      className={clsx(styles.footer, isNavClosed && styles.noLeftPadding)}
    >
      <Stack w='100%' maw={768} px={12}>
        <Textarea
          classNames={{ input: styles.input }}
          placeholder='Спросить у CyberMan'
          autosize
          variant='filled'
          radius='xl'
          size='lg'
          minRows={1}
          maxRows={8}
          rightSection={<Image w={32} src={filledArrowIcon} />}
          leftSection={<Image w={32} src={stapleIcon} />}
        />
        <Text
          lineClamp={1}
          fz='xs'
          fw='normal'
          c='var(--font-color-secondary)'
          ta='center'
        >
          CyberMan A100 всегда учится и развивается. Для точных решений
          рекомендуем перепроверять важные данные.
        </Text>
      </Stack>
      <ActionIcon
        className={styles.questionIcon}
        variant='transparent'
        children={<Image w={24} src={questionIcon} />}
        visibleFrom='sm'
      />
    </AppShell.Footer>
  );
};

export default ChatFooter;
