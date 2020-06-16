import React, { useState, useEffect } from "react"

import { graphql } from "gatsby"
import Layout from "../components/Layout"
import {
  Box,
  Text,
  DarkMode,
  Skeleton,
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  PseudoBox,
} from "@chakra-ui/core"
import SearchField from "../components/Search/Search"
import "../components/Search/search.css"
import DonationCard from "../components/donationCard"
import CustomButton from "../components/Button"
import DataSort from "react-data-sort"
import SEO from "../components/seo"
import FlagMenu from "../components/FlagMenu"
import DonationSlider from "../components/DonationSlider"
import { getIpLocation } from "../utils/geolocation"

const Home = ({ data }) => {
  const [filteredCorporations, setFilteredCorporations] = useState(
    data.allAirtable.nodes
  )
  const [localeList, setLocaleList] = useState(
    data.allAirtableCountryIncomes.edges.map(node => node.node.data)
  )
  const [activeLocale, setActiveLocale] = useState()
  const [homeLocale, setHomeLocale] = useState()

  // Slider
  const [sliderOverrideValue, setSliderOverrideValue] = useState()

  // Search Field
  const [searchValue, setSearchValue] = useState("")

  // Sorting states
  const [sortByText, setSortByText] = useState("% Profit Donated")
  const [sortByField, setSortByField] = useState("Percent_Profits")
  const [sortType, setSortType] = useState("asc")
  const [activePage, setActivePage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  const searchFieldOnChange = e => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    getIpLocation().then(location => {
      setHomeLocale(location)
      const locale = localeList.find(l => l.Code === location.country)
      // default to english if not exist
      if (locale) {
        setActiveLocale(locale)
      } else {
        setActiveLocale(localeList.filter(l => l.Language === "en")[0])
      }
    })
  }, [data])

  // sorting functions
  const toggleSortType = () => {
    setSortType(sortType === "asc" ? "desc" : "asc")
  }

  // set sortbyfield and text
  const setSortBy = field => {
    setItemsPerPage(20)
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
        page="Home"
        title={
          <>
            Donations Expo
            <PseudoBox
              as="span"
              fontSize={["36px", "44px", "48px", "56px", "72px"]}
            >
              $
            </PseudoBox>
            ed
          </>
        }
        subtitle={
          <>
            Corporations have made headlines with big donations recently — how
            much would{" "}
            {activeLocale ? (
              <FlagMenu
                onClick={setActiveLocale}
                homeLocale={homeLocale}
                activeLocale={activeLocale}
                locales={localeList}
              />
            ) : (
              <Skeleton w="250" />
            )}{" "}
            need to match their donation?
          </>
        }
      >
        <SEO title={"Donations Exposed"} />
        <Box pt="64px" pb={["48px", null, null, "52px", "64px"]}>
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {activeLocale ? (
              <DonationSlider
                locale={activeLocale}
                corporations={filteredCorporations
                  .map(_ => _.data)
                  .sort((a, b) => b.Percent_Profits - a.Percent_Profits)}
                overrideValue={sliderOverrideValue}
              />
            ) : (
              <>
                <Skeleton
                  colorStart="darkless"
                  colorEnd="slate"
                  h="220px"
                  borderRadius="10px"
                />
                <Skeleton
                  colorStart="darkless"
                  colorEnd="slate"
                  h="220px"
                  borderRadius="10px"
                />
              </>
            )}
          </Box>
        </Box>
        <Box pb={["24px", null, "32px", "48px", "64px"]}>
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color="primary.red"
              fontWeight="900"
              fontSize={["24px", "26px", "28px", "30px", "32px"]}
              lineHeight={["24px", "26px", "28px", "30px", "32px"]}
            >
              Find a Corporation
            </Text>
            <Text
              color="snow"
              mb={["16px", null, null, null, "24px"]}
              fontSize={["16px", null, null, "18px"]}
              mt={["2px", null, null, "4px"]}
            >
              Select a card to make an equivalent donation.
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
                    Sort by {sortByText}{" "}
                    <Icon w="12px" ml="8px" name="chevron_down" />
                  </CustomButton>
                </MenuButton>
                <MenuList
                  placement="bottom-start"
                  border="none"
                  backgroundColor="dark"
                  color="snow"
                >
                  <MenuItem
                    onClick={() => {
                      setSortBy("Name")
                    }}
                  >
                    Name
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy("Percent_Profits")
                    }}
                  >
                    % Profit Donated
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSortBy("Donation__thousands_")
                    }}
                  >
                    Amount Donated
                  </MenuItem>
                </MenuList>
              </Menu>
              <CustomButton
                onClick={toggleSortType}
                aria-label="Toggle sort order"
              >
                <Icon
                  h="16px"
                  name={sortType === "asc" ? "up_arrow" : "down_arrow"}
                />
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
          {activeLocale ? (
            <DataSort
              data={filteredCorporations}
              sortBy={sortByField}
              direction={sortType}
              searchQuery={searchValue}
              itemsPerPage={itemsPerPage}
              paginate
              searchInKeys={["data.Name"]}
              render={({ data, pages }) => {
                return data.map((corporation, i) => {
                  if (
                    corporation.data.Donation__thousands_ &&
                    corporation.data.Gross_Profit__millions_
                  ) {
                    return (
                      <DonationCard
                        key={i}
                        locale={activeLocale}
                        image={
                          corporation.data.Logo.localFiles[0].childImageSharp
                            .fluid
                        }
                        profitSources={corporation.data.Profit_Sources}
                        profitNote={corporation.data.Profit_Note}
                        donationSources={corporation.data.Sources}
                        donationNote={corporation.data.Donation_Note}
                        name={corporation.data.Name}
                        percent={corporation.data.Percent_Profits}
                        amount={corporation.data.Donation__thousands_}
                        donationCurrency={corporation.data.Currency}
                        profits={corporation.data.Gross_Profit__millions_}
                        onClick={setSliderOverrideValue}
                      />
                    )
                  }
                })
              }}
            />
          ) : (
            <>
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
              <Skeleton
                colorStart="darkless"
                colorEnd="slate"
                h="220px"
                borderRadius="10px"
              />
            </>
          )}
        </Box>
        {!searchValue ? (
          <PseudoBox
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="64px"
          >
            <CustomButton onClick={loadMoreItems}>
              {itemsPerPage >= filteredCorporations.length
                ? "No Donations Left"
                : "Load More"}
            </CustomButton>
          </PseudoBox>
        ) : (
          <PseudoBox mb="24px"></PseudoBox>
        )}
      </Layout>
    </DarkMode>
  )
}

export const query = graphql`
  query corporationsQuery {
    allAirtable(
      filter: {
        table: { eq: "Corporations" }
        data: {
          Donation__thousands_: { gt: 0 }
          Gross_Profit__millions_: { gt: 0 }
        }
      }
      sort: { fields: data___Percent_Profits, order: ASC }
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
                fluid(maxWidth: 80) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
            }
          }
          Percent_Profits
        }
      }
    }

    allAirtableCountryIncomes(
      filter: { data: {} }
      sort: { fields: data___Demonym, order: ASC }
    ) {
      edges {
        node {
          data {
            Demonym
            Language
            Code
            Income
            Measure
            Currency
          }
        }
      }
    }
  }
`
export default Home
