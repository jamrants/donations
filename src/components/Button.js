import React from "react"
import { Button } from "@chakra-ui/core"

const CustomButton = props => (
  <Button
    _hover={{ bg: "rgba(37, 36, 41, 0.7);" }}
    backgroundColor="darkless"
    color="snow"
    px="16px"
    py="12px"
    borderRadius="4px"
    height="fit-content"
    {...props}
  />
)

export default CustomButton
