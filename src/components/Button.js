import React from "react"
import { Button } from "@chakra-ui/core"

const CustomButton = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    _hover={{ bg: "rgba(37, 36, 41, 0.7);" }}
    backgroundColor="darkless"
    color="snow"
    px="16px"
    py="12px"
    borderRadius="4px"
  >
    {children}
  </Button>
)

export default CustomButton
