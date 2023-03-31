import { useContext, useState } from "react";
import { LoginContext } from "../../Context/Auth";
import { Button, TextInput, Group, createStyles } from "@mantine/core";
import { When } from "react-if";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2.5rem",
  },
}));

const Login = () => {
  const { login, loggedIn, logout } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { classes } = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <When>
        <Button onClick={logout}>Log Out</Button>
      </When>

      <When condition={!loggedIn}>
        <Group>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextInput
              className={classes.input}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              className={classes.input}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className={classes.button} type="submit">
              Log In
            </Button>
          </form>
        </Group>
      </When>
    </>
  );
};

export default Login;
