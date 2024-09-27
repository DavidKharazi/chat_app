import { useState } from "react";
import { Button, Image, Menu } from "@mantine/core";
import buttonArrow from "../../assets/buttonArrow.svg";

const ChatModeButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu opened={opened} onChange={setOpened}>
      <Menu.Target>
        <Button
          color='var(--font-color-secondary)'
          variant='transparent'
          rightSection={<Image w={10.5} src={buttonArrow} />}
        >
          CyberMan A100
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ChatModeButton;
