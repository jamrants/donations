import React from 'react';
import { graphql } from 'gatsby';

const Home = ({data}) => {
  return <div>Hello world!</div>
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