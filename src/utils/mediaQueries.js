import { useMediaQuery } from "react-responsive"

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 961 })
  return isDesktop ? children : null
}

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 960 })
  return isMobile ? children : null
}

/**
 * Determines viewport sizing of client
 * @returns {Boolean} Whether or not the window is desktop sized
 */
export const IsDesktop = () => {
  const desktop = useMediaQuery({ minWidth: 961 })
  return desktop
}

/**
 * Determines viewport sizing of client
 * @returns {Boolean} Whether or not the window is mobile sized
 */
export const IsMobile = () => {
  const mobile = useMediaQuery({ maxWidth: 960 })
  return mobile
}
