import { AvatarProps, Avatar as MantineAvatar } from "@mantine/core";
import { FC } from "react";

const Avatar: FC<AvatarProps> = (props) => {
  return (
    <MantineAvatar variant='filled' color='pink' radius='xl' {...props}>
      UT
    </MantineAvatar>
  );
};

export default Avatar;
