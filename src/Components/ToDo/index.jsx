import React, { useEffect, useState } from "react";
import useForm from "../../Hooks/Form.jsx";

import List from "../List";
import {
  Grid,
  Card,
  Slider,
  TextInput,
  Text,
  Button,
  createStyles,
} from "@mantine/core";
import Auth from "../Auth/index.jsx";
import axios from "axios";

// import { v4 as uuid } from "uuid";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
  },
  slider: {},
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
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    try {
      const url = "https://api-js401.herokuapp.com/api/v1/todo";
      const method = "post";
      const data = item;
      item.complete = false;
      axios({ url, method, data });
      setList([...list, item]);
    } catch (error) {
      console.error(error);
    }
  }

  function deleteItem(id) {
    try {
      const url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      const method = "delete";
      axios({ url, method });
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  function toggleComplete(id) {
    try {
      const url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      const method = "put";
      const data = { complete: true };
      axios({ url, method, data });
      setList(
        list.map((item) =>
          item._id === id ? { ...item, complete: true } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const incomplete = list.filter((item) => !item.complete);
    setIncomplete(incomplete.length);
    document.title = `Task List: ${incomplete.length} Tasks Pending`;
  }, [list]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://api-js401.herokuapp.com/api/v1/todo";
        const method = "get";
        const response = await axios({ url, method });
        setList(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className={classes.h1}>
        Task List: {incomplete.length} Tasks Pending
      </h1>
      <Grid className={classes.root}>
        <Auth capability="create">
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
                  name="difficulty"
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                />
                <Button color="teal" className="button" type="submit">
                  Add Item
                </Button>
              </form>
            </Card>
          </Grid.Col>
        </Auth>
        <Grid.Col xs={12} sm={8}>
          <Text className={classes.input}>
            There are {incomplete.length} Items To Complete
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
