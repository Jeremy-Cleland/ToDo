import React, { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import {
  TextInput,
  Checkbox,
  Button,
  Card,
  Text,
  Title,
  Grid,
  Group,
  createStyles,
} from "@mantine/core";

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
  group: {
    marginTop: theme.spacing.md,
  },
}));

const SettingsForm = () => {
  const { classes } = useStyles();
  const [show, setShow] = useState(false);
  const {
    pageItems,
    setPageItems,
    showCompleted,
    setShowCompleted,
    showSorted,
    setShowSorted,
    saveLocal,
  } = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    saveLocal();
  };

  return (
    <Grid style={{ width: "80%", margin: "auto" }}>
      <Grid.Col xs={12} sm={6}>
        <Card withBorder>
          <form onSubmit={handleSubmit} className={classes.root}>
            <Text>Settings</Text>
            <Checkbox
              label="Show Completed"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <TextInput
              className={classes.input}
              label="Number of Items to Display"
              type="number"
              value={pageItems}
              onChange={(e) => setPageItems(e.target.value)}
            />
            <TextInput
              className={classes.input}
              label="Sort By"
              checked={showSorted}
              placeholder="difficulty"
              onChange={(e) => setShowSorted(e.target.value)}
            />
            <Button type="submit" className={classes.button}>
              Save
            </Button>
            {show && <Text>Settings Saved</Text>}
          </form>
        </Card>
      </Grid.Col>

      <Grid.Col xs={12} sm={6}>
        {show && (
          <Group className={classes.group}>
            <Title order={3}>Updated Settings</Title>
            <Text>Show Completed Taks: {showCompleted ? "yes" : "no"}</Text>
            <Text>Tasks per page: {pageItems}</Text>
            <Text>Sort Tasks by: {showSorted}</Text>
          </Group>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default SettingsForm;
