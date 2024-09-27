import { AppShell, Box, Image, Stack, Textarea } from "@mantine/core";
import { FC } from "react";
import stapleIcon from "../../assets/staple.svg";
import filledArrowIcon from "../../assets/buttonFilledArrow.svg";
import styles from "./ChatFooter.module.scss";
import { clsx } from "clsx";

type ChatFooterProps = {
  isNavClosed: boolean;
};

const ChatFooter: FC<ChatFooterProps> = ({ isNavClosed }) => {
  return (
    <AppShell.Footer
      className={clsx(styles.footer, isNavClosed && styles.withoutPadding)}
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
          rightSection={<Image src={filledArrowIcon} />}
          leftSection={<Image src={stapleIcon} />}
        />
        <Box fz='xs' fw='normal' c='var(--font-color-secondary)' ta='center'>
          CyberMan A100 всегда учится и развивается. Для точных решений
          рекомендуем перепроверять важные данные.
        </Box>
      </Stack>
    </AppShell.Footer>
  );
};

export default ChatFooter;
