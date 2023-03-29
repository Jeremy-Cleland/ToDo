import { Title, createStyles } from "@mantine/core";

const HeaderGroup = () => {
  const useStyles = createStyles(() => ({
    Header: {
      backgroundColor: "#1D1F20",
      position: "sticky",
      top: 0,
      zIndex: 1,
      padding: "1rem",
      marginBottom: "3vh",
      height: 100,
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    },
    Title: {
      fontSize: "4rem",
      fontFamily: "Caveat, cursive",
    },
  }));

  const { classes } = useStyles();

  return (
    <header className={classes.Header}>
      <Title className={classes.Title} order={1}>
        TaskForce
      </Title>
    </header>
  );
};

export default HeaderGroup;
