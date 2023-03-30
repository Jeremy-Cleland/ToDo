import React from "react";
// import MyGlobalStyles from "./Context/Styles/globalStyles";
import AppRoutes from "./Routes/routes";
import { SettingsProvider } from "./Context/Settings";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <SettingsProvider>
        <AppRoutes />
        {/* <MyGlobalStyles /> */}
      </SettingsProvider>
    </MantineProvider>
  );
};

export default App;
