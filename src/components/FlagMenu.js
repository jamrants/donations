import React from "react"
import { Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/core"
import ReactCountryFlag from "react-country-flag"
import { getLocale } from "../utils/geolocation"

const renderMenuItems = (locales, onClick) => {
  const { country } = getLocale()
  // countries with implemented postal-level data
  const postalCountries = [] // ["US", "CA"]
  return [
    ...locales.map(locale => {
      return (
        <MenuItem py="4px" marginBottom="4px" onClick={() => onClick(locale)}>
          <span>
            <ReactCountryFlag
              style={{ height: "36px", width: "36px" }}
              countryCode={locale.Code}
              svg
            />{" "}
            {locale.Demonym}
            {" household"}
          </span>
        </MenuItem>
      )
    }),
    // TODO: handle geolocation + ZIP/FSA income
    postalCountries.includes(country) && (
      <MenuItem py="4px" marginBottom="4px" onClick={() => onClick(0)}>
        <span>
          <ReactCountryFlag
            style={{ height: "36px", width: "36px" }}
            countryCode={country}
            svg
          />
          {" household near me"}
        </span>
      </MenuItem>
    ),
    // TODO: handle custom income declaration
    <MenuItem py="4px" marginBottom="4px" onClick={() => onClick(0)}>
      <span>
        <ReactCountryFlag
          style={{ height: "36px", width: "36px" }}
          countryCode={country}
          svg
        />
        {" my household"}
      </span>
    </MenuItem>,
  ]
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
        <span>
          {" the average "}
          <ReactCountryFlag
            style={{ height: "36px", width: "36px" }}
            countryCode={activeLocale.Code}
            svg
          />{" "}
          {activeLocale.Demonym}
          {" household"}
          <Icon ml="6px" name="chevron_down" h="12px" display="inline" />
        </span>
      </MenuButton>
      <MenuList
        className="flag-menu"
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
