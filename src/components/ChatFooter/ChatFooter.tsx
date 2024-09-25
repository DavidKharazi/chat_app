import { AppShell, Box, Stack, Textarea } from "@mantine/core";
import React from "react";
import stapleIcon from "../../assets/staple.svg";
import filledArrowIcon from "../../assets/buttonFilledArrow.svg";
import styles from "./ChatFooter.module.scss";

type ChatFooterProps = {
  isNavClosed: boolean;
};

const ChatFooter: React.FC<ChatFooterProps> = ({ isNavClosed }) => {
  return (
    <AppShell.Footer
      className={`${styles.footer} ${isNavClosed && styles.withoutPadding}`}
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
          rightSection={<img src={filledArrowIcon} />}
          leftSection={<img src={stapleIcon} />}
        />
        <Box fz={11} fw={400} c='var(--font-color-secondary)' ta='center'>
          CyberMan A100 всегда учится и развивается. Для точных решений
          рекомендуем перепроверять важные данные.
        </Box>
      </Stack>
    </AppShell.Footer>
  );
};

export default ChatFooter;
