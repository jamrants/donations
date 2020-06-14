import React from "react"
import { Input } from "@chakra-ui/core"

const SearchField = ({ value, onChange, placeholder }) => (
  <>
    <Input
      id="find-corporation"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={["sm", "md", "lg"]}
      width={["100%", "80%", "60%"]}
      maxWidth="500px"
      h="38px"
      borderRadius="5px"
      backgroundColor="darkless"
      color="smoke"
      border="none"
      px="16px"
      py="8px"
      className="search-field"
    />
    <label for="find-corporation" hidden>
      Search for a corporation
    </label>
  </>
)

export default SearchField
