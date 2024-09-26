import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mantine/core";
import { routes } from "./routes";

const AppRouter: FC = () => {
  return (
    <Box>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Box>
  );
};

export default AppRouter;
