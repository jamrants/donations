import React, { useState } from "react"
import {
  Box,
  Image,
  Text,
  PseudoBox,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const DonationCard = ({
  image,
  name,
  amount,
  donationCurrency,
  profits,
  percent,
  locale,
  donationNote,
  donationSources,
  profitNote,
  profitSources,
  onClick,
}) => {
  amount = parseInt(amount)
  profits = parseFloat(profits)
  const [zIndex, setZIndex] = useState(0)
  const click = () => {
    // scrolling handled in slider
    onClick(percent * locale.Income)
  }
  return (
    <PseudoBox
      padding={["12px", null, "16px", "24px", "30px"]}
      as="button"
      onClick={click}
      textAlign="left"
      backgroundColor="darkless"
      color="snow"
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.125) 0px 4px 8px;"
      transition="all .2s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      key={name + "Donation Stats"}
      zIndex={zIndex}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <PseudoBox
          w={["45px", null, "60px", "70px", "80px"]}
          h={["45px", null, "60px", "70px", "80px"]}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Img fluid={image} className="card-image" />
        </PseudoBox>
        <Box ml={("8px", null, null, null, "16px")}>
          <Text
            mb={["2px", null, null, "4px", "8px"]}
            mt="2px"
            fontWeight="900"
            fontSize={["18px", "20px", "24px", "28px", "32px"]}
            lineHeight={["20px", null, "24px", "28px", "32px"]}
            isTruncated
            maxWidth={["300px", null, null, null, "390px"]}
          >
            {name}
          </Text>
          <Text
            fontWeight="600"
            color="smoke"
            fontSize={["14px", "16px", "20px", "22px", "24px"]}
            lineHeight={["16px", null, "20px", "22px", "24px"]}
          >
            <Popover trigger="hover" placement="bottom">
              <PopoverTrigger>
                <PseudoBox as="span" borderBottom="1px solid #6C6C72">
                  ${(amount * 1000).toLocaleString("en-us")}
                </PseudoBox>
              </PopoverTrigger>
              <PopoverContent
                border="none"
                backgroundColor="dark"
                color="smoke"
                width="fit-content"
                px="16px"
                py="8px"
                borderRadius="6px"
                fontSize={["14px", null, null, "16px"]}
              >
                <Box>
                  {donationNote ? <Text>{donationNote}</Text> : <></>}
                  {donationSources.split("\n").length > 1 ? (
                    donationSources.split("\n").map((source, index) => (
                      <>
                        <Text
                          key={index}
                          textDecoration="underline"
                          mt="4px"
                          as="a"
                          href={
                            source.includes("http")
                              ? source
                              : "https://" + source
                          }
                          target="_blank"
                        >
                          Source {index + 1}
                        </Text>
                        <br />
                      </>
                    ))
                  ) : (
                    <Text
                      textDecoration="underline"
                      mt="4px"
                      as="a"
                      href={"https://" + donationSources}
                      target="_blank"
                    >
                      Source
                    </Text>
                  )}
                </Box>
              </PopoverContent>
            </Popover>
            <Box as="span" fontSize={["12px", null, "14px", "15px", "16px"]}>
              {" " + donationCurrency}
            </Box>
          </Text>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        mt={["24px", null, null, null, "32px"]}
      >
        <Box mr={["32px", "32px", null, "24px", "32px"]}>
          <Text
            fontWeight="900"
            fontSize={["20px", null, "24px", "28px", "32px"]}
            lineHeight={["20px", null, "24px", "28px", "32px"]}
          >
            {(percent * 100).toFixed(3)}%
          </Text>
          <Text
            color="smoke"
            fontSize={["12px", null, "14px", "15px", "16px"]}
            fontWeight="600"
          >
            of{" "}
            <Popover
              trigger="hover"
              placement="bottom"
              onOpen={() => {
                setZIndex(1)
              }}
              onClose={() => {
                setZIndex(0)
              }}
            >
              <PopoverTrigger>
                <PseudoBox as="span" borderBottom="1px solid #6C6C72">
                  profits
                </PseudoBox>
              </PopoverTrigger>
              <PopoverContent
                border="none"
                backgroundColor="dark"
                color="smoke"
                width="fit-content"
                px="16px"
                py="8px"
                borderRadius="6px"
                fontSize={["14px", null, null, "16px"]}
              >
                <Box>
                  {profitNote ? <Text>{profitNote}</Text> : <></>}
                  {profitSources.split("\n").length > 1 ? (
                    profitSources.split("\n").map((source, index) => (
                      <>
                        <Text
                          key={index}
                          textDecoration="underline"
                          mt="4px"
                          as="a"
                          href={
                            source.includes("http")
                              ? source
                              : "https://" + source
                          }
                          target="_blank"
                        >
                          Source {index + 1}
                        </Text>
                        <br />
                      </>
                    ))
                  ) : (
                    <Text
                      textDecoration="underline"
                      mt="4px"
                      as="a"
                      href={"https://" + profitSources}
                      target="_blank"
                    >
                      Source
                    </Text>
                  )}
                </Box>
              </PopoverContent>
            </Popover>
            {" donated"}
          </Text>
        </Box>
        <Box>
          <Text
            fontWeight="900"
            fontSize={["20px", null, "24px", "28px", "32px"]}
            lineHeight={["20px", null, "24px", "28px", "32px"]}
          >
            {(locale.Income * percent).toLocaleString(undefined, {
              style: "currency",
              currency: locale.Currency ? locale.Currency : "USD",
            })}
          </Text>
          <Text
            color="smoke"
            fontSize={["12px", null, "14px", "15px", "16px"]}
            fontWeight="600"
          >
            adjusted to{" "}
            <Popover
              trigger="hover"
              placement="bottom-end"
              onOpen={() => {
                setZIndex(1)
              }}
              onClose={() => {
                setZIndex(0)
              }}
            >
              <PopoverTrigger>
                <PseudoBox as="span" borderBottom="1px solid #6C6C72">
                  {locale.Demonym === "my" ? "my" : "avg."} income
                </PseudoBox>
              </PopoverTrigger>
              <PopoverContent
                border="none"
                backgroundColor="dark"
                color="smoke"
                width="fit-content"
                px="16px"
                py="8px"
                borderRadius="6px"
                fontSize={["14px", null, null, "16px"]}
              >
                <Box>
                  {locale.Demonym} {locale.Measure} of{" "}
                  {locale.Income.toLocaleString(locale, {
                    style: "currency",
                    currency: locale.Currency ? locale.Currency : "USD",
                  })}{" "}
                  &times; {(percent * 100).toFixed(3)}%
                </Box>
              </PopoverContent>
            </Popover>
          </Text>
        </Box>
      </Box>
    </PseudoBox>
  )
}

export default DonationCard
