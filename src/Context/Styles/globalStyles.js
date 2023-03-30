import { Global } from "@mantine/core";

const MyGlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        "body, html": {
          height: "100%",
          margin: 0,
          padding: 0,
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSizes.md,
          lineHeight: theme.lineHeight,
        },
        "body, input, button, textarea, select": {
          font: "inherit",
        },

        a: {
          color: theme.colors.blue[6],
          textDecoration: "none",
        },
        "a:hover": {
          textDecoration: "underline",
          color: "#565D67",
        },
        "h1, h2, h3, h4, h5, h6": {
          margin: 0,
          padding: 0,
          fontWeight: theme.fontWeightSemibold,
        },
      })}
    />
  );
};

export default MyGlobalStyles;
