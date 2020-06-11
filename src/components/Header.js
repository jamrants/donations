import React from "react"
import { Box, List, ListItem } from "@chakra-ui/core"

const Header = () => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    h="60px"
    fontSize="16px"
    color="primary.green"
  >
    <Box fontWeight="black" as="a" href="/">
      Donations Exposed
    </Box>
    <Box>
      <List fontWeight="800">
        <ListItem mr={[2, null, null, 4]} as="a" href="/">
          Home
        </ListItem>
        <ListItem as="a" href="/about">
          About
        </ListItem>
      </List>
    </Box>
  </Box>
)

export default Header
