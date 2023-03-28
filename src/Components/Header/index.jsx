import {
  MediaQuery,
  Burger,
  Title,
  createStyles,
  Container,
} from "@mantine/core";

import { useSettingsContext } from "../../Context/Settings";

const HeaderGroup = () => {
  const { state, dispatch } = useSettingsContext();

  function openSidebar() {
    dispatch({ type: "OPEN_SIDEBAR", payload: true });
  }

  const useStyles = createStyles((theme) => ({
    Header: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.white
          : theme.colors.dark[9],

      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    Title: {
      color: theme.colorScheme === "light" ? theme.white : theme.black,
    },
  }));

  const { classes } = useStyles();

  return (
    <header className={classes.Header}>
      <Container className={classes.inner}>
        <Title order={1} ta="center" sx={{ fontFamily: "Caveat, cursive" }}>
          TaskForce
        </Title>

        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={state.isOpen}
            onClick={openSidebar}
            size="lg"
            mr="xl"
          />
        </MediaQuery>
      </Container>
    </header>
  );
};

export default HeaderGroup;
