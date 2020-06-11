import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Text, DarkMode } from '@chakra-ui/core';
import SearchField from '../components/Search/Search';
import '../components/Search/search.css';
import DonationCard from '../components/donationCard';

const Home = ({ data }) => {

  const [corporations, setCorporations] = useState(data.allAirtable.nodes);
  const [filteredCorporations, setFilteredCorporations] = useState(data.allAirtable.nodes);
  const [localeList, setLocaleList] = useState(data.allAirtableCountryIncomes.edges.map(node => node.node.data))
  const [activeLocale, setActiveLocale] = useState({});

  // Search Field
  const [searchValue, setSearchValue] = useState('');

  const searchFieldOnChange = (e) => {
    setSearchValue(e.target.value);
    setFilteredCorporations(corporations.filter(corporation => corporation.data.Name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  useEffect(() => {
    // get user country, sort through locales + income to adjust
    const locale = navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] )[0];
    locale ? setActiveLocale(localeList.filter(l => l.Languages.split(",").includes(locale))[0]) : setActiveLocale(localeList.filter(l => l.Languages.split(",").includes('en-US'))[0]);
  }, [data])

  return (
    <DarkMode>
      <Layout title='Donations Exposed' subtitle='Corporations have made headlines with big pledges recently — how much would they be to the average person?'>
        <Box py='64px'>
          <Box
            textAlign='center'
            display='flex'
            flexDirection='column'  
            alignItems='center'
            justifyContent='center'
          >
            <Text color='primary.red' mb={['16px', null, null, null, '24px']} fontWeight='900' fontSize={['24px', '26px', '28px',  '30px', '32px']}>
              Find a Corporation
            </Text>
            <SearchField placeholder="Amazon" value={searchValue} onChange={searchFieldOnChange} />
          </Box>
        </Box>
        <Box 
          pb='64px'
          display='grid'
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
          gridColumnGap={['20px', '20px', '32px', '40px', '48px']}
          gridRowGap={['20px', '20px', '32px  ', '40px', '48px']}
        >
          {filteredCorporations.map(corporation => {
            if (corporation.data.Donation__thousands_ && corporation.data.Gross_Profit__millions_) {
              return <DonationCard locale={activeLocale} imageURL={corporation.data.Logo && corporation.data.Logo[0].url} name={corporation.data.Name} percent={corporation.data.Percent_Profits} amount={corporation.data.Donation__thousands_} donationCurrency={corporation.data.Currency} profits={corporation.data.Gross_Profit__millions_}/>
            }
          })}
        </Box>
      </Layout>
    </DarkMode>
  )
}

export const query = graphql`
  query corporationsQuery {
    allAirtable(filter: {table: {eq: "Corporations"}}, sort: {fields: data___Donation__thousands_, order: DESC}) {
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
            url
          }
          Percent_Profits
        }
      }
    }

    allAirtableCountryIncomes(filter: {data: {}}) {
      edges {
        node {
          data {
            Languages
            Location
            Median_Household_Income
            Currency
          }
        }
      }
    }
  }
`
export default Home