import React, { useState } from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Input,
} from "@chakra-ui/core"
import ReactCountryFlag from "react-country-flag"
import { getLocale } from "../utils/geolocation"

const renderMenuItems = (locales, onClick) => {
  const { country } = getLocale()
  // countries with implemented postal-level data
  const postalCountries = [] // ["US", "CA"]
  return [
    ...locales.map(locale => {
      return (
        <MenuItem
          py="4px"
          marginBottom="4px"
          onClick={() => onClick(locale)}
          key={locale.Code}
        >
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
      <MenuItem
        py="4px"
        marginBottom="4px"
        onClick={() => onClick("geo")}
        key="geo"
      >
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
    <MenuItem
      py="4px"
      marginBottom="4px"
      onClick={() => onClick("mine")}
      key="mine"
    >
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
  const [mine, setMine] = useState(null)
  const [useMine, setUseMine] = useState(false)
  const { lang, country } = getLocale()

  const onChange = (locale, income = null) => {
    if (locale === "mine") {
      if (income === null) {
        if (mine === null) {
          // initialize to country median income
          const countryLocale = locales.find(l => l.Code === country)
          income = countryLocale ? countryLocale.Median_Household_Income : 0
        } else {
          income = mine
        }
      }
      onClick({
        Median_Household_Income: income,
        Language: lang,
        Code: country,
        Demonym: "my",
        Currency: "CAD",
      })
      setMine(income)
      setUseMine(true)
    } else {
      setUseMine(false)
      onClick(locale)
    }
  }

  const onMineChange = e => {
    setMine(e.target.value)
    onChange("mine", e.target.value)
  }

  return (
    <>
      <Menu>
        <MenuButton
          lineHeight="initial"
          pb="2px"
          px="4px"
          ml="4px"
          borderBottom="2.5px solid #F9FAFC"
        >
          <span>
            {!useMine && " the average "}
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
          {renderMenuItems(locales, onChange)}
        </MenuList>
      </Menu>
      {useMine && (
        <Input
          value={mine}
          placeholder="income"
          type="number"
          onChange={onMineChange}
          size={["sm", "md", "lg"]}
          width={["100%", "80%", "60%"]}
          variant="flushed"
          borderRadius="5px"
          backgroundColor="dark"
          color="smoke"
          border="none"
          px="16px"
          py="8px"
        />
      )}
    </>
  )
}

export default FlagMenu
