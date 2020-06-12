import React from "react"
import PropTypes from "prop-types"
import { Box, PseudoBox } from "@chakra-ui/core"
import { IsDesktop } from "../utils/mediaQueries"
import Header from "./Header"
import Hero from "./Hero"
import Footer from "./Footer"

const breakpoints = ["30em", "48em", "62em", "65.9375em", "75em", "107em"]
//1200px - 7%
//1055px -  5%
// 62em - 20% - hero - 10%
breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]
breakpoints.xxl = breakpoints[5]

const Layout = ({ children, title, subtitle }) => (
  <Box backgroundColor="dark" minHeight="100vh">
    <Hero
      title={title}
      subtitle={subtitle}
      padding={["24px", null, null, "17%", "20%"]}
    />
    <PseudoBox className="content-container">{children}</PseudoBox>
    <Footer padding={["24px", null, null, "17%", "20%"]} />
  </Box>
)

export default Layout
