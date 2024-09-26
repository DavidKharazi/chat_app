import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface CustomFormButtonProps {
  type: "submit" | "button";
  isValid: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomFormButton: React.FC<CustomFormButtonProps> = ({
  type,
  isValid,
  onClick,
  children,
}) => {
  const { hovered, ref } = useHover<HTMLButtonElement>();

  return (
    <Button
      type={type}
      fullWidth
      variant="filled"
      disabled={!isValid}
      mt="md"
      color={hovered ? "#869bb1" : "#18181a"}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomFormButton;
