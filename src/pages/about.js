import React from "react"
import { DarkMode, Box, Text, List, ListItem } from "@chakra-ui/core"
import Layout from "../components/Layout"
import SEO from "../components/seo"

const H1 = ({ children }) => (
  <Text
    fontWeight="900"
    as="h1"
    fontSize={["24px", "26px", "28px", "30px", "32px"]}
    lineHeight={["24px", "26px", "28px", "30px", "32px"]}
    mb="16px"
  >
    {children}
  </Text>
)

const H2 = ({ children }) => (
  <Text
    fontWeight="900"
    as="h1"
    fontSize={["20px", "22px", "24px", "26px", "28px"]}
    lineHeight={["20px", "22px", "24px", "26px", "28px"]}
    mb="16px"
  >
    {children}
  </Text>
)

const Paragraph = ({ children }) => (
  <Text fontSize={["16px", null, null, "18px"]} mb="16px">
    {children}
  </Text>
)

const Link = ({ children, href }) => (
  <Text
    fontWeight="600"
    as="a"
    textDecoration="underline"
    color="primary.green"
    href={href}
    target="_blank"
  >
    {children}
  </Text>
)

const About = () => {
  return (
    <DarkMode>
      <Layout
        title="About"
        subtitle="Why we built this, methodology, and sources"
      >
        <SEO
          title="About"
          description="Why we built this, methodology, and sources"
        />
        <Box color="snow" py="64px">
          <Box as="section" mb="32px">
            <H1>Why?</H1>
            <Paragraph>
              Businesses have made a lot of headlines recently with huge
              donations.{" "}
              <Text as="span" color="primary.green" fontWeight="800">
                Have you ever felt as if you just can't make the same level of
                impact?
              </Text>{" "}
              Individuals, like us, who want to help the cause, feel like our
              $10 is nothing compared to a celebrity or company's $10 million.
              Why donate if we can only make one-millionth of the impact? But
              when you scale down these seven-figure donations from
              billion-dollar multinational to the average household, many of
              these donations have a proportionate impact of our donating less
              than $100.
            </Paragraph>
            <Paragraph>
              A company like Home Depot gets loads of good PR from a million
              dollar pledge, but they make gross profit of around $40 billion.
              That's a donation of just 0.003% of their income. 0.003% of the
              average Canadian's income comes out to less than a toonie.{" "}
              <Text as="span" color="primary.green" fontWeight="800">
                We can all spare a toonie, can't we?
              </Text>
            </Paragraph>
            <Paragraph>
              We made this site to{" "}
              <Text as="span" color="primary.green" fontWeight="800">
                demonstrate how every one of us can make the same proportional
                impact
              </Text>{". "}
              If companies, in their performative activism, can pledge pocket
              change and make a difference, so can we.
            </Paragraph>
            <Paragraph>
              <Link href="https://blmsites.carrd.co/">
                Take action and donate or sign a petition today.
              </Link>
            </Paragraph>
          </Box>
          <Box as="section" mb="32px">
            <H1>Methodology</H1>
            <Paragraph>
              Corporate and personal finances are two wildly different worlds.
              Because funny corporate accounting tends to skew taxable income,
              we chose to compare pre-tax figures that we felt best represented
              the amount of money that is under the company/person's control to
              decide spending.
            </Paragraph>
            <Paragraph>
              Many businesses post negative taxable revenues (e.g. Uber) while
              still clearly generating revenue, so we used a measure of revenue
              less cost of revenue. Public companies have wide ability to choose
              exactly what figures to report, so the cost of revenue was not
              always provided. We used the following list of figures, in order
              of priority, moving down the list if the previous figure was not
              available, to calculate "profit".
            </Paragraph>
            <Paragraph>
              <List
                spacing="8px"
                fontWeight="600"
                color="snow"
                ml="16px"
                as="ol"
                styleType="decimal"
              >
                <ListItem>Revenue less cost of revenue</ListItem>
                <ListItem>Gross Profit</ListItem>
                <ListItem>Operating Income</ListItem>
                <ListItem>
                  Third-party estimates (for private companies)
                </ListItem>
              </List>
            </Paragraph>
            <Paragraph>
              In the case of brands being wholly-owned subsidiaries, we
              attribute the whole donation to the parent company. For joint
              donations, we assume an equal split between organizations. If a
              company pledges to donate over a number of years, the donation
              value shown is the whole pledge divided by the number of years. If
              a number of years is not given, we divide by five.
            </Paragraph>
            <Paragraph>
              In the personal world, we chose to this metric with total income,
              since there is no cost of revenue in personal finances. The{" "}
              <Link href="https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/download-telecharger/comp/page_dl-tc.cfm?Lang=E">
                Canadian
              </Link>{" "}
              and{" "}
              <Link href="https://data.census.gov/cedsci/table?g=0100000US.860000&text=s1903&tid=ACSST5Y2018.S1903&hidePreview=false&vintage=2018&layer=VT_2018_860_00_PY_D1&cid=S1903_C01_001E">
                American
              </Link>{" "}
              censuses report median household total income. These are further
              drilled down by{" "}
              <Link href="https://airtable.com/shrpsRjYtdHVE39DQ">FSA</Link>{" "}
              (the first three letters of postal codes) and{" "}
              <Link href="https://airtable.com/shrTF0rwa0j0EgG10">
                ZIP codes
              </Link>
              .
            </Paragraph>
            <Paragraph>
              The adjusted figure shown is calculated by taking the percent of
              profits donated and multiplying by the local median income.
            </Paragraph>
          </Box>
          <Box as="section" mb="32px">
            <H2>
              Are we missing a donation?{" "}
              <Link href="https://airtable.com/shrMnuvCqc5M4J7Ak">
                Let us know
              </Link>
              {"."}
            </H2>
          </Box>
          <Box as="section" mb="32px">
            <H2>
              Want to talk?{" "}
              <Link href="mailto:jamrants@retrocraft.ca">Email us</Link>
              {"!"}
            </H2>
          </Box>
          <Box as="section">
            <H2>
              View all the raw data{" "}
              <Link href="https://airtable.com/shrb6pZwkGX6rLIQa">here</Link>
              {"."}
            </H2>
          </Box>
        </Box>
      </Layout>
    </DarkMode>
  )
}

export default About
