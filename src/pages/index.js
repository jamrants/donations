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
            {data.allAirtable.nodes.map(corporation => console.log(corporation))}
          </Box>
        </Box>
        <Box 
          pb='64px'
          display='grid'
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
          gridColumnGap={['16px', null, '32px', '40px', '48px']}
          gridRowGap={['16px', null, '32px  ', '40px', '48px']}
        >
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
          <DonationCard imageURL='https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=800%2C450&strip=all' name='Airbnb' amount={500} donationCurrency='USD' profits={3200}/>
        </Box>
      </Layout>
    </DarkMode>
  )
}

export const query = graphql`
  query corporationsQuery {
    allAirtable(filter: {table: {eq: "Corporations"}}, sort: {fields: data___Name, order: ASC}) {
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
        }
      }
    }
  }
`
export default Home