import { Text } from "@mantine/core";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormConstants } from "../../utils/formConstants";
import { routesNames } from "../../utils/routesNames";

interface FormPageLinksProps {
  loginText?: string;
  registerText?: string;
  resetText?: string | null;
}

export const FormPageLinks: React.FC<FormPageLinksProps> = React.memo(
  ({ loginText, registerText, resetText }) => {
    const navigate = useNavigate();

    const handleNavigate = useCallback(
      (path: string) => {
        navigate(path);
      },
      [navigate]
    );

    return (
      <Text className="text-info" mt="md">
        {registerText && (
          <>
            {registerText}{" "}
            <Text
              component="span"
              className="text-link"
              onClick={() => handleNavigate(routesNames.login)}
            >
              Войти
            </Text>
          </>
        )}
        {resetText && (
          <>
            {resetText}{" "}
            <Text
              component="span"
              className="text-link"
              onClick={() => handleNavigate(routesNames.login)}
            >
              {FormConstants.REGISTER_LINK_TEXT}
            </Text>
          </>
        )}
        {loginText && (
          <>
            {loginText} <br />
            <Text
              component="span"
              className="text-link"
              onClick={() => handleNavigate(routesNames.register)}
            >
              {FormConstants.LOGIN_LINK_TEXT}
            </Text>
          </>
        )}
      </Text>
    );
  }
);
