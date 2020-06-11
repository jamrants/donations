import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Text, DarkMode } from '@chakra-ui/core';
import SearchField from '../components/Search/Search';
import '../components/Search/search.css';

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
            <Text color='primary.red' mb={['16px', null, null, null, '24px']} fontWeight='900' fontSize={['24px', '26px', '28px', '30px', '32px']}>
              Find a Corporation
            </Text>
            <SearchField placeholder="Amazon" />
          </Box>
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