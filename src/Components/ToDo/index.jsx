import { useEffect } from "react";

import useForm from "../../hooks/form";

import List from "../List";

import { useSettingsContext } from "../../Context/Settings";
import {
  AppShell,
  Button,
  Navbar,
  Grid,
  Text,
  Slider,
  TextInput,
  createStyles,
  Paper,
} from "@mantine/core";

import { v4 as uuid } from "uuid";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#121212",
    height: "100vh",
    border: "none",
  },

  Navbar: {
    backgroundColor: "#121212",
    height: "100vh",
    border: "none",
  },
  Aside: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.dark[7],
    // color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  AppShell: {
    backgroundColor: "#fff",
    // color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  form: {
    backgroundColor: "#fff",
    height: "60vh",
    padding: "1rem",

    input: {
      backgroundColor: "#fff",
      padding: "1rem",
      margin: "2rem",
      width: 300,
      alignContent: "center",
      border: "#303030 1px solid",
    },
    // color: theme.colorScheme === "dark" ? theme.white : theme.black,
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
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      className={classes.AppShell}
      navbar={
        <Paper shadow="xl" radius="lg" p="md" withBorder>
          <Navbar
            className={classes.Navbar}
            height={600}
            p="lg"
            hiddenBreakpoint="sm"
            dz
            open={state.isOpen}
            width={{ sm: 300, lg: 400, base: "100%" }}
          >
            <Navbar.Section grow mt="lg">
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextInput
                  className={classes.input}
                  label="To Do Item"
                  name="text"
                  onChange={handleChange}
                />
                <TextInput
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
                <Text className={classes.input}>Difficulty</Text>
                <Button className="button" type="submit">
                  Add Item
                </Button>
              </form>
            </Navbar.Section>
            <Navbar.Section></Navbar.Section>
          </Navbar>
        </Paper>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[2]
              : theme.colors.dark[9],
        },
      })}
    >
      <Grid className={classes.root}>
        <Text className={classes.input}>
          There are {incomplete} Items To Complete
        </Text>
        <List
          list={list}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </Grid>
    </AppShell>

    //   <>
    //     <header data-testid="todo-header">
    //       <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
    //     </header>

    //     <form onSubmit={handleSubmit}>
    //       <h2>Add To Do Item</h2>

    //       <label>
    //         <span>To Do Item</span>
    //         <input
    //           onChange={handleChange}
    //           name="text"
    //           type="text"
    //           placeholder="Item Details"
    //         />
    //       </label>

    //       <label>
    //         <span>Assigned To</span>
    //         <input
    //           onChange={handleChange}
    //           name="assignee"
    //           type="text"
    //           placeholder="Assignee Name"
    //         />
    //       </label>

    //       <label>
    //         <span>Difficulty</span>
    //         <input
    //           onChange={handleChange}
    //           defaultValue={state.difficulty}
    //           type="range"
    //           min={1}
    //           max={5}
    //           name="difficulty"
    //         />
    //       </label>

    //       <label htmlFor="submit">
    //         <button type="submit">Add Item</button>
    //       </label>
    //     </form>

    //     {list.map((item) => (
    //       <div key={item.id}>
    //         <p>{item.text}</p>
    //         <p>
    //           <small>Assigned to: {item.assignee}</small>
    //         </p>
    //         <p>
    //           <small>Difficulty: {item.difficulty}</small>
    //         </p>
    //         <button onClick={() => toggleComplete(item.id)}>
    //           Complete: {item.complete.toString()}
    //         </button>
    //         <hr />
    //       </div>
    //     ))}
    //   </>
  );
};

export default Todo;
