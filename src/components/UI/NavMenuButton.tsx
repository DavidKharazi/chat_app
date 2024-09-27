import { ActionIcon, ActionIconProps, Image } from "@mantine/core";
import burgerIcon from "../../assets/burger.svg";
import menuButtonIcon from "../../assets/menuButton.svg";
import { ButtonHTMLAttributes, FC } from "react";

type NavMenuButton = ActionIconProps & ButtonHTMLAttributes<HTMLButtonElement>;

const NavMenuButton: FC<NavMenuButton> = (props) => {
  return (
    <ActionIcon size={40} variant='transparent' {...props}>
      <Image w={40} src={burgerIcon} hiddenFrom='sm' />
      <Image w={40} src={menuButtonIcon} visibleFrom='sm' />
    </ActionIcon>
  );
};

export default NavMenuButton;
