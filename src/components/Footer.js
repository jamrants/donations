import React from "react"
import { Box, PseudoBox, Text } from "@chakra-ui/core"

const Footer = ({ ...params }) => (
  <Box
    backgroundColor="darkless"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    py="32px"
    color="smoke"
    textAlign="center"
    {...params}
  >
    <PseudoBox
      color="primary.green"
      fontSize="16px"
      fontWeight="700"
      as="a"
      target="_blank"
      href="https://blacklivesmatter.com/"
    >
      Get Informed about BLM →
    </PseudoBox>
    <Text mt="16px" fontWeight="700">
      Built by{" "}
      <PseudoBox
        color="primary.green"
        fontSize="16px"
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://github.com/davidli3100"
      >
        David Li
      </PseudoBox>
      {", "}
      <PseudoBox
        color="primary.green"
        fontSize="16px"
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://github.com/jhthenerd"
      >
        Jason Huang
      </PseudoBox>
      {", and "}
      <PseudoBox
        color="primary.green"
        fontSize="16px"
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://github.com/retrocraft"
      >
        James Ah Yong
      </PseudoBox>
      .
    </Text>
    <Text fontWeight="700" mt="4px">
      Design inspired by{" "}
      <PseudoBox
        color="primary.green"
        fontSize="16px"
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://lachlanjc.me/"
      >
        @lachlanjc
      </PseudoBox>
      {"'s "}
      <PseudoBox
        color="primary.green"
        fontSize="16px"
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://GunFunded.com"
      >
        GunFunded.com
      </PseudoBox>
      .
    </Text>
    <PseudoBox mt="16px">
      <Text
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://github.com/jamrants/donations"
        color="primary.green"
      >
        Open Source on Github
      </Text>
      {" | "}
      <Text
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://netlify.com"
        color="primary.green"
      >
        Hosted on Netlify
      </Text>
      {" | "}
      <Text
        fontWeight="700"
        as="a"
        target="_blank"
        href="https://ko-fi.com/donationsexposed"
        color="primary.green"
      >
        Buy us a Coffee
      </Text>
    </PseudoBox>
  </Box>
)

export default Footer
