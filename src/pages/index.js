import React, { useState, useEffect } from "react"

import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Box, Text, DarkMode, Skeleton, Icon, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/core"
import SearchField from "../components/Search/Search"
import "../components/Search/search.css"
import DonationCard from "../components/donationCard"
import CustomButton from "../components/Button"

const Home = ({ data }) => {
  const [corporations, setCorporations] = useState(data.allAirtable.nodes)
  const [filteredCorporations, setFilteredCorporations] = useState(
    data.allAirtable.nodes
  )
  const [localeList, setLocaleList] = useState(
    data.allAirtableCountryIncomes.edges.map(node => node.node.data)
  )
  const [activeLocale, setActiveLocale] = useState({})

  // Search Field
  const [searchValue, setSearchValue] = useState("")

  // Sorting states
  const [sortBy, setSortBy] = useState("Amount Donated")
  const [sortType, setSortType] = useState("DESC")

  const searchFieldOnChange = e => {
    setSearchValue(e.target.value)
    setFilteredCorporations(
      corporations.filter(corporation =>
        corporation.data.Name.toLowerCase().includes(
          e.target.value.toLowerCase()
        )
      )
    )
  }

  useEffect(() => {
    // get user country, sort through locales + income to adjust
    const locale =
      navigator.language ||
      navigator.browserLanguage ||
      (navigator.languages || ["en"])[0]
    locale
      ? setActiveLocale(
          localeList.filter(l => l.Locales.split(",").includes(locale))[0]
        )
      : setActiveLocale(
          localeList.filter(l => l.Locales.split(",").includes("en-US"))[0]
        )
  }, [data])

  // sorting functions
  const toggleSortType = () => {
    if (sortType === "ASC") setSortType("DESC")
    if (sortType === "DESC") setSortType("ASC")
    sort(sortBy)
  }

  const sort = (field) => {
    if (field === "Name") {
      setSortBy("Name")
    } else if (field === "Percent_Profits" || field === "% Profit Donated") {
      field = "Percent_Profits"
      setSortBy("% Profit Donated")
    } else {
      field = "Donation__thousands_"
      setSortBy("Amount Donated")
    }

    console.log(field)

    filteredCorporations.sort((x,y) => {
      var a = x
      var b = y
      console.log(a,b)
      if (a.data[field] < b.data[field]) {
        return sortType === "ASC" ? -1 : 1
      }
      if (a.data[field] > b.data[field]) {
        return sortType === "ASC" ? 1 : -1
      }
      return 0 
    })
  }

  return (
    <DarkMode>
      <Layout
        title="Donations Exposed"
        subtitle="Corporations have made headlines with big pledges recently — how much would they be to the average person?"
      >
        <Box py="64px">
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color="primary.red"
              mb={["16px", null, null, null, "24px"]}
              fontWeight="900"
              fontSize={["24px", "26px", "28px", "30px", "32px"]}
            >
              Find a Corporation
            </Text>
            <SearchField
              placeholder="Amazon"
              value={searchValue}
              onChange={searchFieldOnChange}
            />
            <Box mt="16px">
              <Menu>
                <MenuButton mr="16px">
                  <CustomButton>
                    Sort by {sortBy} <Icon w="12px" ml="8px" name="chevron_down"/>
                  </CustomButton> 
                </MenuButton>
                <MenuList 
                  placement="bottom-start"
                  border="none"
                  backgroundColor="dark"
                  color="snow"
                >
                  <MenuItem onClick={() => {sort("Name")}}>Name</MenuItem>
                  <MenuItem onClick={() => {sort("Percent_Profits")}}>% Profit Donated</MenuItem>
                  <MenuItem onClick={() => {sort("Donation__thousands_")}}>Amount Donated</MenuItem>
                </MenuList>
              </Menu>
              <CustomButton onClick={toggleSortType}>
                <Icon h="16px" name={sortType === "ASC" ? 'up_arrow' : 'down_arrow'}/>
              </CustomButton>
            </Box>
          </Box>
        </Box>
        <Box
          pb="64px"
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]}
          gridColumnGap={["20px", "20px", "32px", "40px", "48px"]}
          gridRowGap={["20px", "20px", "32px  ", "40px", "48px"]}
        >
          {activeLocale.Currency ? (
            filteredCorporations.map(corporation => {
              if (
                corporation.data.Donation__thousands_ &&
                corporation.data.Gross_Profit__millions_
              ) {
                return (
                  <DonationCard
                    locale={activeLocale}
                    image={
                      corporation.data.Logo.localFiles[0].childImageSharp.fixed
                    }
                    name={corporation.data.Name}
                    percent={corporation.data.Percent_Profits}
                    amount={corporation.data.Donation__thousands_}
                    donationCurrency={corporation.data.Currency}
                    profits={corporation.data.Gross_Profit__millions_}
                  />
                )
              }
            })
          ) : (
            <>
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
              <Skeleton h="220px" borderRadius="10px" />
            </>
          )}
        </Box>
      </Layout>
    </DarkMode>
  )
}

export const query = graphql`
  query corporationsQuery {
    allAirtable(
      filter: { table: { eq: "Corporations" } data: {Donation__thousands_: {gt: 0}, Gross_Profit__millions_: {gt: 0}} }
      sort: { fields: data___Donation__thousands_, order: DESC }
    ) {
      nodes {
        data {
          Currency
          Date
          Donation_Note
          Donation__thousands_
          Name
          Gross_Profit__millions_
          Profit_Note
          Profit_Currency
          Profit_Sources
          Profit_Year
          Sources
          Donation_Recipients
          Logo {
            localFiles {
              childImageSharp {
                fixed(width: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          Percent_Profits
        }
      }
    }

    allAirtableCountryIncomes(filter: { data: {} }) {
      edges {
        node {
          data {
            Location
            Median_Household_Income
            Language
            Currency
            Locales
          }
        }
      }
    }
  }
`
export default Home
