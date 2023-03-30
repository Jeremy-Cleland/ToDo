import React, { useEffect } from "react";

import List from "../List";
import useForm from "../../Hooks/Form.jsx";
import { useSettings } from "../../Context/Settings";
import { v4 as uuid } from "uuid";

import {
  Grid,
  Card,
  Slider,
  TextInput,
  Text,
  Button,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // width: "80%",
    // margin: "auto",
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
  },
  slider: {
    // marginTop: theme.spacing.md,
    // marginBottom: theme.spacing.md,
  },
  input: {
    marginTop: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  h1: {
    // backgroundColor: theme.colors.blue[7],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    height: "80px",
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.radius.md,
    width: "50%",
    margin: "auto",
    textAlign: "center",
  },
}));

const ToDo = () => {
  const { classes } = useStyles();
  const { state, dispatch } = useSettings();
  const { handleChange, handleSubmit } = useForm(addItem, state);
  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
  // const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  let list = state.list;
  let incomplete = state.incomplete;

  function deleteItem(id) {
    dispatch({ type: "DELETE_ITEM", payload: id });
  }

  function toggleComplete(id) {
    dispatch({ type: "HANDLE_INCOMPLETED", payload: id });
    dispatch({ type: "HANDLE_COMPLETE", payload: id });
  }

  function changeDifficulty(value) {
    dispatch({ type: "CHANGE_DIFFICULTY", payload: value });
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    dispatch({ type: "HANDLE_INCOMPLETED", payload: incompleteCount });
    document.title = `To Do List: ${state.incomplete}`;
  }, [list]);

  return (
    <>
      <h1 className={classes.h1}>To Do List: {incomplete} items pending</h1>
      <Grid className={classes.root}>
        <Grid.Col xs={12} sm={4}>
          <Card className={classes.card}>
            <Text className={classes.input}>Add To Do Item</Text>
            <form onSubmit={handleSubmit}>
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
              <Text className={classes.input}>Difficulty</Text>
              <Slider
                className={classes.slider}
                color="teal"
                size="xl"
                radius="xl"
                label={state.difficulty}
                name="difficulty"
                onChange={(value) => changeDifficulty(value)}
                min={1}
                max={5}
                step={1}
                defaultValue={state.difficulty}
              />
              <Button color="teal" className="button" type="submit">
                Add Item
              </Button>
            </form>
          </Card>
        </Grid.Col>

        <Grid.Col xs={12} sm={8}>
          <Text className={classes.input}>
            There are {incomplete} Items To Complete
          </Text>
          <List
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ToDo;
