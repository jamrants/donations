import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Text, DarkMode } from '@chakra-ui/core';
import SearchField from '../components/Search/Search';
import '../components/Search/search.css';
import DonationCard from '../components/donationCard';

const Home = ({ data }) => {
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
            <SearchField placeholder="Amazon" />
          </Box>
        </Box>
        <Box 
          pb='64px'
          display='grid'
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
          gridColumnGap={['20px', '20px', '32px', '40px', '48px']}
          gridRowGap={['20px', '20px', '32px  ', '40px', '48px']}
        >
          {data.allAirtable.nodes.map(corporation => {
            if (corporation.data.Donation__thousands_ && corporation.data.Gross_Profit__millions_) {
              return <DonationCard imageURL={corporation.data.Logo && corporation.data.Logo[0].url} name={corporation.data.Name} amount={corporation.data.Donation__thousands_} donationCurrency={corporation.data.Currency} profits={corporation.data.Gross_Profit__millions_}/>
            }
          })}
          {/* <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/> */}
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
        }
      }
    }
  }
`
export default Home