import LocaleCurrency from "locale-currency"

export const convertableCurrencies = [
  "CAD",
  "HKD",
  "ISK",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "GBP",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "HRK",
  "JPY",
  "THB",
  "CHF",
  "EUR",
  "MYR",
  "BGN",
  "TRY",
  "CNY",
  "NOK",
  "NZD",
  "ZAR",
  "USD",
  "MXN",
  "SGD",
  "AUD",
  "ILS",
  "KRW",
  "PLN",
]

/**
 * Get the user's locale using navigator.language
 * @returns {{ lang: string, country: string, currency: string }} ISO language/country/currency codes
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
  let country = null
  let currency = LocaleCurrency.getCurrency(locale)
  // 'en-US' -> ['en', 'US'] and account for zh-Hans_CN
  if (locale.includes("-")) {
    lang = locale.substring(0, 2)
    country = locale.slice(-2)
  }
  // if already used geolocation, use that country
  if (locationCache) {
    country = locationCache.country
  }
  return { lang, country, currency: getCurrency(currency) }
}

/**
 * Get convertable currency of country
 * @param {string} country ISO country code
 */
export const getCurrency = country => {
  const currency = LocaleCurrency.getCurrency(country)
  return convertableCurrencies.includes(currency) ? currency : "USD"
}

let ipLocationCache = null
/**
 * Get user's locale based on IP location
 * @returns {Promise<{ lang: string, country: string, currency: string, postcode: string }>}
 */
export const getIpLocation = async () => {
  if (ipLocationCache) return ipLocationCache
  const url = "https://ipapi.co/json"
  const res = await fetch(url)
  const data = await res.json()
  if (data.error) {
    throw new Error(data.reason)
  }
  ipLocationCache = {
    lang: getLocale().lang,
    country: data.country_code,
    postcode: data.postal,
    currency: getCurrency(data.currency),
  }
  return ipLocationCache
}

let locationCache = null
/**
 * Get the user's current location
 * @returns {Promise<{ country: string, postcode: string }>} ISO country code and postal/ZIP code
 */
export const getLocation = async () => {
  try {
    if (!navigator.geolocation) {
      throw new Error("Browser does not support geolocation")
    }
    if (locationCache) return locationCache
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
    locationCache = { country: address.country, postcode: address.postcode }
    return locationCache
  } catch (e) {
    // fallback on IP location if exists
    if (!ipLocationCache) throw e
    return ipLocationCache
  }
}
