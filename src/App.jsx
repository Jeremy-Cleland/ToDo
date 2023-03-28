import { SettingsProvider } from "./Context/Settings";
import HeaderGroup from "./Components/Header";
import Footer from "./Components/Footer";
import Todo from "./Components/ToDo";

const App = () => {
  return (
    <SettingsProvider>
      <HeaderGroup />
      <Todo />
      <Footer />
    </SettingsProvider>
  );
};

export default App;
