import { theme } from "@chakra-ui/core"
import customIcons from "../../static/icons/icons"

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "Metropolis, system-ui, sans-serif",
    body: "Metropolis, system-ui, sans-serif",
  },
  colors: {
    ...theme.colors,
    dark: "#17171D",
    primary: {
      green: "#0AD48B",
      red: "#EC3750",
    },
    snow: "#F9FAFC",
    darkless: "#252429",
    smoke: "#E0E6ED",
    accent: "#338EDA",
    slate: "#3C4858",
  },
  // 460, 768, 992, 1600
  breakpoints: ["30em", "48em", "62em", "107em"],
  icons: {
    ...theme.icons,
    ...customIcons,
  },
}
