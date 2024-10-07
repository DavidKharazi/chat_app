import { Box, Image } from "@mantine/core";
import logo_a100 from "../../assets/a100_logo.png";

export function FormLogo() {
  return (
    <Box className="image-container">
      <Image className="form-logo" w={88} src={logo_a100} alt="A100 Logo" />
    </Box>
  );
}
