import MyGlobalStyles from "./Context/Styles/globalStyles";
import LoginProvider from "./Context/Auth";
import AppRoutes from "./Routes/routes";
import SettingsProvider from "./Context/Settings";
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
      <LoginProvider>
        <SettingsProvider>
          <AppRoutes />
          <MyGlobalStyles />
        </SettingsProvider>
      </LoginProvider>
    </MantineProvider>
  );
};

export default App;
