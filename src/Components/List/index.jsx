import { useState } from "react";
import { useSettingsContext } from "../../Context/Settings";
import { Pagination, Text, Button, Card, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing.xl,
    disply: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    display: "flex",
    padding: theme.spacing.md,
    flexDirection: "column",
  },
}));
const List = (props) => {
  const { list, toggleComplete, deleteItem } = props;
  const { state } = useSettingsContext();
  const { classes } = useStyles();

  const [page, setPage] = useState(1);

  const completedList = state.showCompleted
    ? list
    : list.filter((item) => !item.complete);

  const displayItemsPerPage = 3;
  const pages = Math.ceil(completedList.length / displayItemsPerPage);
  const start = (page - 1) * displayItemsPerPage;
  const end = start + displayItemsPerPage;
  const displayList = completedList.slice(start, end);

  return (
    <>
      {displayList.map((item) => (
        <Card key={item.id} className={classes.card} withBorder>
          <Card.Section>
            <Text>Item: {item.text}</Text>
            <Text>Assigned To: {item.assignee}</Text>
            <Text>Difficulty: {item.difficulty}</Text>
            <Text>Complete: {item.complete.toString()}</Text>
          </Card.Section>
          <Card.Section className={classes.button}>
            <Button onClick={() => deleteItem(item.id)}>Delete</Button>
            <Button onClick={() => toggleComplete(item.id)}>Complete</Button>
          </Card.Section>
        </Card>
      ))}
      <Pagination
        className={classes.pagination}
        pages={pages}
        page={page}
        onChange={setPage}
      />
    </>
  );
};

export default List;
