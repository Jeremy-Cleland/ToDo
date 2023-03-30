import React, { useState } from "react";
import { useSettings } from "../../Context/Settings";
import {
  TextInput,
  Checkbox,
  Button,
  Card,
  Text,
  Grid,
  createStyles,
} from "@mantine/core";
import { When } from "react-if";
const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginTop: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));

const SettingsForm = () => {
  const { state, dispatch, saveSettings } = useSettings();
  // const { handleChange, handleSubmit } = props;
  const [show, setShow] = useState(false);

  const { classes } = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    setShow(true);
    saveSettings();
  };

  return (
    <Grid style={{ width: "80%", margin: "auto" }}>
      <Grid.Col xs={12} sm={6}>
        <Card withBorder>
          <form onSubmit={handleSubmit} className={classes.root}>
            <Text>Settings</Text>
            <Checkbox
              label="Show Completed"
              checked={state.showCompleted}
              onChange={() => dispatch({ type: "SHOW_COMPLETED" })}
              className={classes.input}
            />
            <TextInput
              label="Number of Items to Display"
              type="number"
              value={state.numDisplayed}
              onChange={(e) =>
                dispatch({ type: "NUMBER_DISPLAYED", payload: e.target.value })
              }
              className={classes.input}
            />
            <TextInput
              label="Sort Keyword"
              checked={state.showSorted}
              onChange={(e) =>
                dispatch({ type: "SHOW_SORTED", payload: e.target.value })
              }
              className={classes.input}
            />
            <Button type="submit" className={classes.button}>
              Save
            </Button>
            {show && <Text>Settings Saved</Text>}
          </form>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12} sm={6}>
        <When condition={show}>
          <Card withBorder>
            <Card.Section>
              <Text m="xl" fontSize="xl" weight="bold">
                Updated Settings
              </Text>
            </Card.Section>
            <Text m="md">
              {state.showCompleted ? "Show:" : "Hide"} Show Completed Tasks
            </Text>
            <Text m="md">Items Per page: {state.numDisplayed}</Text>
            <Text m="md">Sort by Keyword: {state.showSorted}</Text>
          </Card>
        </When>
      </Grid.Col>
    </Grid>
  );
};

export default SettingsForm;
