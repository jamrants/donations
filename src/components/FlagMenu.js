import React, { useState, useEffect } from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Input,
  PseudoBox,
  Skeleton,
  useToast,
} from "@chakra-ui/core"
import ReactCountryFlag from "react-country-flag"
import { getLocation } from "../utils/geolocation"

const renderMenuItems = (locales, homeLocale, activeLocale, onClick) => {
  const { country } = homeLocale
  // countries with implemented postal-level data
  const postalCountries = ["US", "CA", "GB"]
  return [
    // custom income
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
          alt={`Image of ${activeLocale.Demonym}'s flag`}
          aria-label={`Image of ${activeLocale.Demonym}'s flag`}
        />
        {" my household"}
      </span>
    </MenuItem>,
    // geolocation + ZIP/FSA income
    postalCountries.includes(country) && (
      <MenuItem
        py="4px"
        marginBottom="4px"
        onClick={() => onClick("geo")}
        key="geo"
        fontSize={["16px", "18px", "20px", "22px", "24px"]}
      >
        <span>
          <ReactCountryFlag
            style={{ height: "36px", width: "36px" }}
            countryCode={country}
            svg
            alt={`Image of a ${activeLocale.Demonym} flag`}
            aria-label={`Image of a ${activeLocale.Demonym} flag`}
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
              alt={`Image of a ${locale.Demonym} flag`}
              aria-label={`Image of a ${locale.Demonym} flag`}
            />{" "}
            {locale.Demonym}
            {" household"}
          </span>
        </MenuItem>
      )
    }),
  ]
}

const FlagMenu = ({ onClick, locales, activeLocale, homeLocale, setHome }) => {
  const [mine, setMine] = useState(null)
  const [loading, setLoading] = useState(false)
  const [geoCache, setGeoCache] = useState(null)
  const toast = useToast()

  const onChange = (locale, income = null) => {
    if (locale === "mine") {
      if (income === null) {
        if (mine === null) {
          // initialize to country median income
          const countryLocale = locales.find(l => l.Code === homeLocale.country)
          income = countryLocale ? countryLocale.Income : 0
        } else {
          income = mine
        }
      }
      onClick({
        Income: income,
        Language: homeLocale.lang,
        Code: homeLocale.country,
        Demonym: "my",
        Currency: homeLocale.currency,
        Measure: "household income",
        Custom: true,
      })
      setMine(income)
    } else if (locale === "geo") {
      const newLocale = {
        Language: homeLocale.lang,
        Code: homeLocale.country,
        Currency: homeLocale.currency,
        Measure: "median household income",
        Demonym: "my neighborhood's",
        Geo: true,
      }
      if (geoCache) {
        newLocale.Income = geoCache.income
        newLocale.Postcode = geoCache.code
        onClick(newLocale)
      } else {
        setLoading(true)
        getLocation()
          .then(({ country, currency, postcode }) => {
            setHome({ lang: homeLocale.lang, country, currency })
            newLocale.Currency = currency
            newLocale.Code = country
            return fetch(
              `https://us-central1-donations-exposed.cloudfunctions.net/income?country=${country}&postcode=${postcode}`
            )
          })
          .then(res => res.json())
          .then(data => {
            newLocale.Income = data.income
            newLocale.Postcode = data.code
            console.log(newLocale)
            onClick(newLocale)
            setGeoCache(data)
          })
          .catch(err => {
            toast({
              title: "Oops!",
              description:
                "Either we couldn't find your location or we don't have regional data for your area. Input your own income data instead.",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
            console.error(err)
            onChange("mine")
          })
          .finally(() => setLoading(false))
      }
    } else {
      onClick(locale)
    }
  }

  const onMineChange = e => {
    setMine(e.target.value)
    onChange("mine", e.target.value)
  }

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: activeLocale.Currency,
  })
  let currencySymbol = ""
  let symbolAfter = false
  // TODO: polyfill
  if (formatter.formatToParts) {
    const currencyFormat = formatter.formatToParts(1)
    currencySymbol = currencyFormat.find(_ => _.type === "currency").value
    symbolAfter =
      currencyFormat.findIndex(_ => _.type === "currency") >
      currencyFormat.findIndex(_ => _.type === "integer")
  }

  return (
    <Skeleton isLoaded={!loading}>
      <Menu>
        {!activeLocale.Custom && " the average "}
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
                countryCode={activeLocale.Code ? activeLocale.Code : "US"}
                svg
                alt={`Image of a ${activeLocale.Demonym} flag`}
                aria-label={`Image of a ${activeLocale.Demonym} flag`}
              />
            </PseudoBox>
            {activeLocale.Geo
              ? " household near me"
              : ` ${activeLocale.Demonym} household`}
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
          {renderMenuItems(locales, homeLocale, activeLocale, onChange)}
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
    </Skeleton>
  )
}

export default FlagMenu
