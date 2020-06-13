import React from "react"
import { Box, PseudoBox, Text } from "@chakra-ui/core"
import Header from "./Header"

const Hero = ({ padding, title, subtitle }) => {
  return (
    <PseudoBox
      className="padding-normal"
      px={padding}
      backgroundColor="darkless"
    >
      <Header />
      <Box px="7.5%" textAlign="center" pt="48px" pb="72px">
        <Text
          color="primary.green"
          fontSize={["48px", "56px", "64px", "74px", "96px"]}
          fontWeight="900"
          lineHeight={["50px", "58px", "normal"]}
          mb={["8px", null, 0]}
        >
          {title}
        </Text>
        <Text
          color="snow"
          mt={["16px", "12px"]}
          fontSize={["20px", "24px", "28px", "31px", "38px"]}
        >
          {subtitle}
        </Text>
      </Box>
    </PseudoBox>
  )
}

export default Hero
