import { createStyles, Text, Group, Header, Navbar } from "@mantine/core";
import Login from "../Login";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    // backgroundColor: theme.colors.blue[7],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    padding: theme.spacing.lg,
    width: "100%",
    height: "120px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    border: "none",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  login: {
    display: "flex",
  },
  navbar: {
    // backgroundColor: theme.colors.blue[7],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    height: "60px",
    padding: theme.spacing.md,
    margin: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();
  return (
    <Header className={classes.header}>
      <Navbar className={classes.navbar}>
        <Group>
          <Link to="/" className={classes.link} default>
            <Text size="md" weight="bold">
              Home
            </Text>
          </Link>
          <Link to="/settings" className={classes.link} default>
            <Text size="md" weight="bold">
              Settings
            </Text>
          </Link>
        </Group>
      </Navbar>
      <Login className={classes.login} />
    </Header>
  );
};

export default HeaderComponent;
