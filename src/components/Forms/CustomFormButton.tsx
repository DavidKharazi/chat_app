import { Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface CustomFormButtonProps {
  type: "submit" | "button";
  isValid: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  loading: boolean;
}

const CustomFormButton: React.FC<CustomFormButtonProps> = ({
  type,
  isValid,
  onClick,
  children,
  loading,
}) => {
  const { hovered, ref } = useHover<HTMLButtonElement>();

  return (
    <Button
      className="form-button"
      type={type}
      fullWidth
      variant="filled"
      disabled={!isValid}
      mt="md"
      w={310}
      size="lg"
      color={hovered ? "#869bb1" : "#18181a"}
      ref={ref}
      onClick={onClick}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default CustomFormButton;
