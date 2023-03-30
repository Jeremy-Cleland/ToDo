// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Group,
//   Text,
//   Center,
//   Title,
//   createStyles,
//   Container,
//   rem,
// } from "@mantine/core";

// const useStyles = createStyles((theme) => ({
//   header: {
//     width: "100vw",
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//     padding: theme.spacing.md,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//   },
//   navBar: {
//     padding: theme.spacing.md,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
// }));

// const Header = () => {
//   const { classes } = useStyles();
//   return (
//     <Container maw={rem("100vw")} h={120} mx="auto">
//       <header>
//         <Center>
//           <Title>Task Force</Title>
//         </Center>
//         <Group>
//           <Link to="/" className={classes.link} default>
//             <Text size="l" weight="bold" ta="left">
//               Home
//             </Text>
//           </Link>
//           <Link to="/settings" className={classes.link} default>
//             <Text size="l" weight="bold" ta="left">
//               Settings
//             </Text>
//           </Link>
//         </Group>
//       </header>
//     </Container>
//   );
// };

// export default Header;

import { createStyles, Group, Header, Navbar } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: "100%",
  },
  link: {
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
    textDecoration: "none",
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();
  return (
    <Header>
      <Navbar className={classes.navbar}>
        <Group>
          <Link className={classes.link} to="/" default>
            Home
          </Link>
          <Link className={classes.link} to="/settings">
            Settings
          </Link>
        </Group>
      </Navbar>
    </Header>
  );
};

export default HeaderComponent;
