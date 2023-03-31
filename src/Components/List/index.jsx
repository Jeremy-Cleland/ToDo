import React, { useState, useContext } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Else, If, Then } from "react-if";
import { LoginContext } from "../../Context/Auth";
import Auth from "../Auth";
import {
  Card,
  Text,
  Button,
  Group,
  Badge,
  Pagination,
  createStyles,
  // CloseButton,
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
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, can } = useContext(LoginContext);

  const { pageItems, showCompleted } = useContext(SettingsContext);

  const totalPages = Math.ceil(props.list.length / pageItems);

  const displayItems = showCompleted
    ? props.list
    : props.list.filter((item) => !item.complete);

  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const paginatedList = displayItems.slice(firstItem, lastItem);

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
              <If condition={loggedIn && can("update")}>
                <Then>
                  <Badge
                    onClick={() => props.toggleComplete(item._id)}
                    color={item.complete ? "red" : "teal"}
                    variant="filled"
                    m="3px"
                  >
                    {item.complete ? "Complete" : "Pending"}
                  </Badge>
                </Then>
                <Else>
                  <Badge
                    color={item.complete ? "red" : "teal"}
                    variant="filled"
                    m="3px"
                  >
                    {item.complete ? "Complete" : "Pending"}
                  </Badge>
                </Else>
              </If>
              <Auth capability="delete">
                <Button onClick={() => props.deleteItem(item._id)}>
                  Delete
                </Button>
              </Auth>
            </Group>
            <Text>Assigned to: {item.assignee}</Text>
          </Card.Section>
          <Text>Task: {item.text}</Text>
          <Text>Difficulty: {item.difficulty}</Text>
        </Card>
      ))}

      <Pagination
        color="teal"
        className={classes.pagination}
        total={totalPages}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default List;
