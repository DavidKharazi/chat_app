import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormConstants } from "../../utils/formConstants";
import { routesNames } from "../../utils/routesNames";

export const LoginPageLinks = React.memo(() => {
  const navigate = useNavigate();

  const handleNavigateToRegister = useCallback(() => {
    navigate(routesNames.register);
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
