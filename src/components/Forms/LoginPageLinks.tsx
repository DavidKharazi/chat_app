import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormConstants } from "../../utils/formConstants";

const registerPath = "/register";

export const LoginPageLinks = React.memo(() => {
  const navigate = useNavigate();

  const handleNavigateToRegister = useCallback(() => {
    navigate(registerPath);
  }, [navigate]);

  return (
    <>
      <Text className="text-info" mt="md">
        {FormConstants.LOGIN_TEXT}{" "}
        <Text
          component="p"
          className="text-link"
          onClick={handleNavigateToRegister}
        >
          {FormConstants.LOGIN_LINK_TEXT}
        </Text>
      </Text>
    </>
  );
});
