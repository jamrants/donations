let locationCache = null

/**
 * Get the user's country and language
 * @returns {{ lang: string, country: string }} ISO language and ISO country codes
 */
export const getLocale = () => {
  // get user country, sort through locales + income to adjust
  let locale = "en"
  if (typeof window !== "undefined") {
    locale =
      navigator.language ||
      navigator.browserLanguage ||
      (navigator.languages || ["en"])[0]
  }

  let lang = locale
  let country = "US"
  // 'en-US' -> ['en', 'US'] and account for zh-Hans_CN
  if (locale.includes("-")) {
    lang = locale.substring(0, 2)
    country = locale.slice(-2)
  }
  // if already used geolocation, use that country
  if (locationCache) {
    country = locationCache.country
  }
  return { lang, country }
}

/**
 * Get the user's current location
 * @returns {{ country: string, postcode: string }} ISO country code and postal/ZIP code
 */
export const getLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Browser does not support geolocation")
  }
  if (locationCache) {
    return {
      country: locationCache.country_code,
      postal: locationCache.postcode,
    }
  }
  const pos = await new Promise((res, rej) =>
    navigator.geolocation.getCurrentPosition(res, rej, {
      enableHighAccuracy: true,
    })
  )
  const { latitude, longitude } = pos.coords
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&addressdetails=1&format=jsonv2`
  const res = await fetch(url)
  const { address } = await res.json()
  address.country = address.country_code.toUpperCase()
  if (address.country === "CA")
    address.postcode = address.postcode.substring(0, 3)
  locationCache = address
  return { country: address.country, postcode: address.postcode }
}
