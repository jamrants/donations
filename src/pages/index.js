import React, { useState, useEffect } from "react"

import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Box, Text, DarkMode, Skeleton, Icon, MenuButton, Menu, MenuList, MenuItem, PseudoBox } from "@chakra-ui/core"
import SearchField from "../components/Search/Search"
import "../components/Search/search.css"
import DonationCard from "../components/donationCard"
import CustomButton from "../components/Button"
import DataSort from "react-data-sort"

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
  const [sortByText, setSortByText] = useState("Amount Donated")
  const [sortByField, setSortByField] = useState("Donation__thousands_")
  const [sortType, setSortType] = useState("desc")
  const [activePage, setActivePage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  const searchFieldOnChange = e => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    // get user country, sort through locales + income to adjust
    const locale =
      navigator.language ||
      navigator.browserLanguage ||
      (navigator.languages || ["en"])[0]

    if (locale) {
      let inLocaleList = localeList.filter(l => l.Locales.split(",").includes(locale))[0]
      inLocaleList ? setActiveLocale(inLocaleList) : setActiveLocale(localeList.filter(l => l.Locales.split(",").includes("en-US"))[0])
    }
  }, [data])

  // sorting functions
  const toggleSortType = () => {
    setSortType(sortType === "asc" ? "desc" : "asc")
  }

  // set sortbyfield and text
  const setSortBy = (field) => {
    if (field === "Name") {
      setSortByField("data." + field)
      setSortByText("Name")
    }

    if (field === "Percent_Profits") {
      setSortByField("data." + field)
      setSortByText("% Profit Donated")
    }

    if (field === "Donation__thousands_") {
      setSortByField("data." + field)
      setSortByText("Amount Donated")
    }
  }

  const loadMoreItems = () => {
    setItemsPerPage(itemsPerPage + 20)
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
                    Sort by {sortByText} <Icon w="12px" ml="8px" name="chevron_down"/>
                  </CustomButton> 
                </MenuButton>
                <MenuList 
                  placement="bottom-start"
                  border="none"
                  backgroundColor="dark"
                  color="snow"
                >
                  <MenuItem onClick={() => {setSortBy("Name")}}>Name</MenuItem>
                  <MenuItem onClick={() => {setSortBy("Percent_Profits")}}>% Profit Donated</MenuItem>
                  <MenuItem onClick={() => {setSortBy("Donation__thousands_")}}>Amount Donated</MenuItem>
                </MenuList>
              </Menu>
              <CustomButton onClick={toggleSortType}>
                <Icon h="16px" name={sortType === "asc" ? 'up_arrow' : 'down_arrow'}/>
              </CustomButton>
            </Box>
          </Box>
        </Box>
        <Box
          pb="40px"
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]}
          gridColumnGap={["20px", "20px", "32px", "40px", "48px"]}
          gridRowGap={["20px", "20px", "32px  ", "40px", "48px"]}
        >
          {activeLocale.Currency ? (
            <DataSort
              data={filteredCorporations}
              sortBy={sortByField}
              direction={sortType}
              searchQuery={searchValue}
              itemsPerPage={itemsPerPage}
              paginate
              searchInKeys={["data.Name"]}
              render={({data, pages}) => {
                return (
                  data.map(corporation => {
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
                )
              }}
              />
          ) : (
            <>
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
              <Skeleton colorStart="darkless" colorEnd="slate" h="220px" borderRadius="10px" />
            </>
          )}
        </Box>
        <PseudoBox
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="64px"
        >
          <CustomButton onClick={loadMoreItems}>
            {itemsPerPage >= filteredCorporations.length ? "No Donations Left" : "Load More"}
          </CustomButton>
        </PseudoBox>
      </Layout>
    </DarkMode>
  )
}

export const query = graphql`
  query corporationsQuery {
    allAirtable(
      filter: { table: { eq: "Corporations" } data: {Donation__thousands_: {gt: 0}, Gross_Profit__millions_: {gt: 0}} }
      sort: { fields: data___Donation__thousands_, order: ASC }
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
