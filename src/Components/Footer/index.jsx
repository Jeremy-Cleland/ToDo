import { Text, rem } from "@mantine/core";

const Footer = () => {
  return (
    <footer style={{ width: "80%", margin: "auto" }}>
      {" "}
      <Text align="right" mt="lg" maw={rem("100vw")}>
        © 2023 Jeremy Cleland
      </Text>
    </footer>
  );
};

export default Footer;
