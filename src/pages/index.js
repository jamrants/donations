import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const Home = ({data}) => {
  return (
    <Layout title='Donations Exposed' subtitle='Corporations have made headlines with big pledges recently — how much would they be to the average person?'>
      Home Page
    </Layout>
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