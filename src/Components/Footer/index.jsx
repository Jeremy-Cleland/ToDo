import { Center, Text, createStyles } from "@mantine/core";

const Footer = () => {
  const useStyles = createStyles(() => ({
    Footer: {
      backgroundColor: "#1D1F20",
      position: "sticky",
      top: 0,
      zIndex: 1,
      padding: "1rem",
      marginBottom: "3vh",
      height: 100,
      textAlign: "center",
      boxShadow: "0 2px -8px rgba(0, 0, 0, 0.26)",
    },
    Title: {
      fontSize: "4rem",
      fontFamily: "Caveat, cursive",
    },
  }));

  const { classes } = useStyles();
  return (
    <footer className={classes.Footer}>
      <Center>
        <Text m="lg" size="lg" sx={{ fontFamily: "Caveat" }}>
          © 2023 Jeremy Cleland
        </Text>
      </Center>
    </footer>
  );
};

export default Footer;
