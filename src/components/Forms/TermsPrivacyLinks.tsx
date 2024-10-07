import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { routesNames } from "../../utils/routesNames";

export const TermsPrivacyLinks = () => {
  return (
    <Text className="text-link">
      <Link to={routesNames.termsOfUse} className="text-link">
        Terms Of Use
      </Link>{" "}
      |{" "}
      <Link to={routesNames.privacyPolicy} className="text-link">
        Privacy Policy
      </Link>
    </Text>
  );
};
