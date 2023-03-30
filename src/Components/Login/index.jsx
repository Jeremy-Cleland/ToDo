import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import { Button, TextInput, Group, createStyles } from "@mantine/core";
import { If, Then, Else } from "react-if";

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
  const { login, loggedIn, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { classes } = useStyles();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    logout();
  };

  return (
    <Group align="right" className={classes.root}>
      <If condition={loggedIn}>
        <Then>
          <Button color="teal" onClick={handleLogout}>
            Logout
          </Button>
        </Then>
        <Else>
          <TextInput
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />
          <Button
            type="submit"
            className={classes.button}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Else>
      </If>
    </Group>
  );
};

export default Login;
