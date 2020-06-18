import React from "react"
import { Box, List, ListItem } from "@chakra-ui/core"

const Header = () => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    h="65px"
    fontSize={["16px", "18px", null, "20px"]}
    color="primary.green"
  >
    <Box fontWeight="black" as="a" href="/">
      Donations Revealed
    </Box>
    <Box>
      <List as="nav" fontWeight="800" role="navigation">
        <ListItem as="a" href="/about">
          About
        </ListItem>
      </List>
    </Box>
  </Box>
)

export default Header
