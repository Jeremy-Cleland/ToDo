import React from "react";
// import MyGlobalStyles from "./Context/Styles/globalStyles";
import AuthProvider from "./Context/Auth";
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
      <AuthProvider>
        <SettingsProvider>
          <AppRoutes />
          {/* <MyGlobalStyles /> */}
        </SettingsProvider>
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
