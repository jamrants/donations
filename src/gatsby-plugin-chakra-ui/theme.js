import { theme } from "@chakra-ui/core"

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "Metropolis",
    body: "Metropolis",
  },
  colors: {
    ...theme.colors,
    dark: "#17171D",
    primary: {
      green: "#33D6A6",
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
}
