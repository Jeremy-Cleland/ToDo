import HeaderGroup from "./Components/Header";
import Footer from "./Components/Footer";
import Todo from "./Components/ToDo";

const App = () => {
  return (
    <>
      <HeaderGroup />
      <Todo />
      <Footer fixed={true} />
    </>
  );
};

export default App;
