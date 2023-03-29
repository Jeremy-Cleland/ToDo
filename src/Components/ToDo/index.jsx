import { useEffect } from "react";
import useForm from "../../Hooks/form";
import { v4 as uuid } from "uuid";
import List from "../List";

import { useSettingsContext } from "../../Context/Settings";
import {
  AppShell,
  Button,
  Box,
  Center,
  Navbar,
  Text,
  Title,
  Slider,
  TextInput,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles(() => ({
  Navbar: {
    backgroundColor: "#1D1F20",
    height: "100vh",
    border: "none",
    padding: "1rem",
    boxShadow: "8 0px 0px 8px rgba(0, 0, 0, 0.26)",
    fontFamily: "Caveat, cursive",
    borderRadius: "12px",
  },
  AppShell: {
    backgroundColor: "#171717",
    color: "#646E7A",
    maxHeight: "87vh",
    marginTop: "-5vh",
    fontFamily: "Caveat, cursive",
  },
  form: {
    marginTop: "20vh",
    backgroundColor: "#454C55",
    color: "#78838F",
    height: "60vh",
    padding: "1rem",
    textAlign: "left",
    border: "#303030 1px solid",
    fontFamily: "Caveat, cursive",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "12px",
  },

  input: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "1rem",
    margin: "2rem",
    width: 300,
    alignContent: "center",
    border: "#303030 1px solid",
    fontFamily: "Caveat, cursive",
  },
}));

const Todo = () => {
  const { state, dispatch } = useSettingsContext();

  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, state);

  const { classes } = useStyles();

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    dispatch({ type: "ADD_LIST_ITEM", payload: item });
  }

  let list = state.list;
  let incomplete = state.incomplete;

  function deleteItem(id) {
    dispatch({ type: "DELETE_LIST_ITEM", payload: id });
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  }

  function adjustDifficulty(value) {
    dispatch({ type: "ADJUST_DIFFICULTY", payload: value });
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    dispatch({ type: "TOGGLE_INCOMPLETE", payload: incompleteCount });
    document.title = `To Do List: ${state.incomplete}`;
  }, [list]);

  // function updateSettings(settings) {
  //   dispatch({ type: "TOGGLE_COMPLETED", payload: settings.showCompleted });
  //   dispatch({ type: "SHOW_ALL_ITEMS", payload: settings.displayNum });
  // }

  return (
    <AppShell
      zIndex={10}
      className={classes.AppShell}
      sx={{ fontFamily: "Caveat, cursive" }}
      fixed
      navbar={
        <Navbar
          className={classes.Navbar}
          height={700}
          hiddenBreakpoint="sm"
          open={state.isOpen}
          width={{ sm: 300, lg: 500, base: "100%" }}
        >
          <Navbar.Section>
            <Box maw={400} mx="auto">
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextInput
                  className={classes.input}
                  label="To Do Item"
                  name="text"
                  mt="md"
                  onChange={handleChange}
                />
                <TextInput
                  mt="md"
                  c="white"
                  className={classes.input}
                  label="Assigned To"
                  name="assignee"
                  onChange={handleChange}
                />
                <Slider
                  className={classes.slider}
                  label={state.difficulty}
                  name="difficulty"
                  onChange={(value) => adjustDifficulty(value)}
                  min={1}
                  max={5}
                  defaultValue={state.difficulty}
                />
                <Text sx={{ fontFamily: "Caveat, cursive" }}>Difficulty</Text>
                <Button className="button" type="submit">
                  Add Item
                </Button>
              </form>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Center pt={100}>
        <Title>There are {incomplete} Items To Complete</Title>
      </Center>
      <Center>
        <List
          list={list}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </Center>
    </AppShell>
  );
};

export default Todo;
