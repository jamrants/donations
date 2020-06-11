require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Donations Exposed",
    description: "Corporations have made headlines with big pledges recently — how much would they be to the average person?"
  },
  plugins: [
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.BASE_ID,
            tableName: `Corporations`
          },
        ]
      }
    }
  ],
}
