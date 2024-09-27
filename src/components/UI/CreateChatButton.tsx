import { ActionIcon, ActionIconProps, Image } from "@mantine/core";
import newChatButtonIcon from "../../assets/newChatButton.svg";
import { FC } from "react";

const CreateChatButton: FC<ActionIconProps> = (props) => {
  return (
    <ActionIcon size={40} variant='transparent' {...props}>
      <Image w={40} src={newChatButtonIcon} />
    </ActionIcon>
  );
};

export default CreateChatButton;
