import { useState } from "react";
import { useSettingsContext } from "../../Context/Settings";
import {
  Pagination,
  Text,
  Button,
  Card,
  SimpleGrid,
  Group,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles(() => ({
  pagination: {
    marginTop: "60vh",
    fontFamily: "Caveat, cursive",
  },
  card: {
    backgroundColor: "#171717",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    color: "#78838F",
    cursor: "pointer",
    width: "50vw",
    padding: "1rem;",
    fontFamily: "Caveat, cursive",
  },
  cardSection: {
    backgroundColor: "#454C55",
    color: "#78838F",
    padding: "1rem",
    border: "#303030 1px solid",
    fontFamily: "Caveat, cursive",
    width: "100%",
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
      <SimpleGrid cols={1} verticalSpacing="xs">
        {displayList.map((item) => (
          <Card key={item.id} className={classes.card} shadow="lg">
            <Card.Section
              className={classes.cardSection}
              inheritPadding
              py="xs"
            >
              <Text ta="center">Task: {item.text}</Text>
              <Group position="apart" mt="md" mb="xs">
                <Text>Assigned To: {item.assignee}</Text>
              </Group>
              <Card.Section inheritPadding py="xs">
                <Text>Difficulty: {item.difficulty}</Text>
              </Card.Section>
              <Card.Section inheritPadding py="xs">
                <Text>Complete: {item.complete.toString()}</Text>
              </Card.Section>
            </Card.Section>
            <Button onClick={() => deleteItem(item.id)}>Delete</Button>
            <Button onClick={() => toggleComplete(item.id)}>Complete</Button>
          </Card>
        ))}
      </SimpleGrid>
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
