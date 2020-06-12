require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Donations Exposed",
    description:
      "Corporations have made headlines with big pledges recently — how much would they be to the average person?",
    author: "jamrants",
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.BASE_ID,
            tableName: `Corporations`,
            mapping: { Logo: `fileNode` },
          },
          {
            baseId: process.env.BASE_ID,
            tableName: `CountryIncomes`,
            queryName: "CountryIncomes",
            separateNodeType: true,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-chakra-ui`,
      options: {
        isResettingCSS: true,
        isUsingColorMode: false,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        custom: {
          families: [`Metropolis`],
          urls: [`/fonts/fonts.css`],
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Donations Exposed`,
        short_name: `Donations`,
        start_url: `/`,
        background_color: `#17171d`,
        theme_color: `#32d6a6`,
        display: `standalone`,
        icon: `src/assets/icon.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-preload-fonts`,
  ],
}
