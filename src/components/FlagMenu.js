import React from "react"
import { Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/core"
import ReactCountryFlag from "react-country-flag"

const renderMenuItems = (locales, onClick) => {
  return locales.map(locale => {
    return (
      <MenuItem py="4px" width="fit-content" onClick={() => onClick(locale)}>
        <ReactCountryFlag
          style={{ height: "36px", width: "36px" }}
          countryCode={locale.Code}
          svg
        />
      </MenuItem>
    )
  })
}

const FlagMenu = ({ onClick, locales, activeLocale }) => {
  return (
    <Menu>
      <MenuButton
        lineHeight="initial"
        pb="2px"
        px="4px"
        ml="4px"
        borderBottom="2.5px solid #F9FAFC"
      >
        <ReactCountryFlag
          style={{ height: "36px", width: "36px" }}
          countryCode={activeLocale.Code}
          svg
        />
        <Icon ml="6px" name="chevron_down" h="12px" />
      </MenuButton>
      <MenuList
        border="none"
        backgroundColor="dark"
        overflowY="scroll"
        maxHeight="300px"
        minWidth={0}
        width="fit-content"
      >
        {renderMenuItems(locales, onClick)}
      </MenuList>
    </Menu>
  )
}

export default FlagMenu
