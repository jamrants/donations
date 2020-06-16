import React, { useState } from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Input,
  PseudoBox,
} from "@chakra-ui/core"
import ReactCountryFlag from "react-country-flag"
import LocaleCurrency from "locale-currency"
import { getLocale } from "../utils/geolocation"

const renderMenuItems = (locales, onClick) => {
  const { country } = getLocale()
  // countries with implemented postal-level data
  const postalCountries = [] // ["US", "CA"]
  return [
    // TODO: handle custom income declaration
    <MenuItem
      py="4px"
      marginBottom="4px"
      onClick={() => onClick("mine")}
      key="mine"
      fontSize={["16px", "18px", "20px", "22px", "24px"]}
    >
      <span>
        <ReactCountryFlag
          style={{ height: "36px", width: "36px", marginRight: "4px" }}
          countryCode={country}
          svg
        />
        {" my household"}
      </span>
    </MenuItem>,
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
    ...locales.map((locale, i) => {
      return (
        <MenuItem
          key={i}
          py="4px"
          marginBottom="4px"
          onClick={() => onClick(locale)}
          key={locale.Code}
          fontSize={["16px", "18px", "20px", "22px", "24px"]}
        >
          <span>
            <ReactCountryFlag
              style={{ height: "32px", width: "32px", marginRight: "4px" }}
              countryCode={locale.Code}
              svg
            />{" "}
            {locale.Demonym}
            {" household"}
          </span>
        </MenuItem>
      )
    }),
  ]
}

const FlagMenu = ({ onClick, locales, activeLocale }) => {
  const [mine, setMine] = useState(null)
  const { lang, country, currency } = getLocale()

  const onChange = (locale, income = null) => {
    if (locale === "mine") {
      if (income === null) {
        if (mine === null) {
          // initialize to country median income
          const countryLocale = locales.find(l => l.Code === country)
          income = countryLocale ? countryLocale.Income : 0
        } else {
          income = mine
        }
      }
      onClick({
        Income: income,
        Language: lang,
        Code: country,
        Demonym: "my",
        Currency: currency,
        Measure: "income",
      })
      setMine(income)
    } else {
      onClick(locale)
    }
  }

  const onMineChange = e => {
    setMine(e.target.value)
    onChange("mine", e.target.value)
  }

  const currencyFormat = Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).formatToParts(1)
  const currencySymbol = currencyFormat.find(_ => _.type === "currency").value
  const symbolAfter =
    currencyFormat.findIndex(_ => _.type === "currency") >
    currencyFormat.findIndex(_ => _.type === "integer")

  return (
    <>
      <Menu>
        {activeLocale.Demonym !== "my" && " the average "}
        <MenuButton
          lineHeight="initial"
          pb="2px"
          px="4px"
          ml={["6px", null, "4px"]}
          borderBottom="2.5px solid #F9FAFC"
        >
          <PseudoBox
            as="span"
            whiteSpace="nowrap"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <PseudoBox
              pb="4px"
              mr="6px"
              as="span"
              w={["24px", "26px", "28px", "31px", "38px"]}
            >
              <ReactCountryFlag
                style={{ height: "100%", width: "100%" }}
                countryCode={activeLocale.Code ? activeLocale.Code : 'US'}
                svg
              />
            </PseudoBox>{" "}
            {activeLocale.Demonym}
            {" household"}
            <Icon
              ml="6px"
              name="chevron_down"
              h={["10px", null, "12px", "14px"]}
              display="inline"
            />
          </PseudoBox>
        </MenuButton>
        <MenuList
          className="flag-menu"
          border="none"
          backgroundColor="dark"
          overflowY="scroll"
          maxHeight={["180px", null, null, "300px"]}
          minWidth={0}
          width="fit-content"
          zIndex="2"
        >
          {renderMenuItems(locales, onChange)}
        </MenuList>
      </Menu>
      {activeLocale.Demonym === "my" && (
        <>
          , with an income of{" "}
          <span
            style={{
              borderBottom: "2.5px solid #F9FAFC",
              whiteSpace: "nowrap",
            }}
          >
            {!symbolAfter && currencySymbol}
            <Input
              value={mine || null}
              width={mine ? `${mine.toString().length}ch` : "6ch"}
              textAlign="center"
              size={["sm", "md", "lg"]}
              display="inline"
              variant="flushed"
              border="none"
              backgroundColor="transparent"
              placeholder="income"
              type="number"
              onChange={onMineChange}
              pb="2px"
              mt={["2px", null, "0px"]}
            />
            {symbolAfter && currencySymbol}
          </span>
          ,{" "}
        </>
      )}
    </>
  )
}

export default FlagMenu
