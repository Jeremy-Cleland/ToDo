import React, { useState } from "react";
import { useSettings } from "../../Context/Settings";
import {
  Card,
  Text,
  Group,
  Badge,
  Pagination,
  createStyles,
  CloseButton,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  pagination: {
    marginBottom: theme.spacing.md,
  },
  card: {
    width: 600,
  },
}));

const List = (props) => {
  const { list, toggleComplete, deleteItem } = props;
  const { state } = useSettings();
  const { classes } = useStyles();

  const [page, setPage] = useState(1);

  const filteredList = state.showCompleted
    ? list
    : list.filter((item) => !item.complete);
  const itemsPerPage = state.numDisplayed;
  const pages = Math.ceil(filteredList.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedList = filteredList.slice(start, end);

  return (
    <>
      {paginatedList.map((item) => (
        <Card
          key={item.id}
          shadow="md"
          mb="sm"
          className={classes.card}
          withBorder
        >
          <Card.Section withBorder>
            <Group position="apart">
              <Group>
                <Badge
                  onClick={() => toggleComplete(item.id)}
                  color={item.complete ? "red" : "teal"}
                  variant="filled"
                  m="3px"
                >
                  {item.complete ? "Complete" : "Pending"}
                </Badge>
                <Text>Assigned to: {item.assignee}</Text>
              </Group>
              <CloseButton
                onClick={() => deleteItem(item.id)}
                title="Close Todo Item"
              />
            </Group>
          </Card.Section>
          <Text>Task: {item.text}</Text>
          <Text>Difficulty: {item.difficulty}</Text>
        </Card>
      ))}
      <Pagination
        color="teal"
        className={classes.pagination}
        total={pages}
        page={page}
        onChange={setPage}
      />
    </>
  );
};

export default List;
