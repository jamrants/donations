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
 * @returns {{ lang: string, country: string, currency: string }} ISO language, country, and currency codes
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
  let currency = "USD"
  // 'en-US' -> ['en', 'US'] and account for zh-Hans_CN
  if (locale.includes("-")) {
    lang = locale.substring(0, 2)
    country = locale.slice(-2)
  }
  // if already used geolocation, use that country
  if (locationCache) {
    country = locationCache.country
  }
  const localCurrency = LocaleCurrency.getCurrency(country)
  if (convertableCurrencies.includes(localCurrency)) {
    currency = localCurrency
  }
  return { lang, country, currency }
}

let ipLocationCache = null
/**
 * Get user's locale based on IP location
 * @returns {Promise<{ lang: string, country: string, currency: string, postcode: string }>}
 */
export const getIpLocation = async () => {
  if (ipLocationCache) return ipLocationCache
  const url =
    "https://ip-api.com/json?fields=status,message,countryCode,region,zip"
  const res = await fetch(url)
  const data = await res.json()
  if (data.status === "success") {
    const localCurrency = LocaleCurrency.getCurrency(data.countryCode)
    ipLocationCache = {
      lang: getLocale().lang,
      country: data.countryCode,
      postcode: data.zip,
      currency: convertableCurrencies.includes(localCurrency)
        ? localCurrency
        : "USD",
    }
    return ipLocationCache
  } else {
    throw new Error(data.message)
  }
}

let locationCache = null
/**
 * Get the user's current location
 * @returns {Promise<{ country: string, postcode: string }>} ISO country code and postal/ZIP code
 */
export const getLocation = async () => {
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
}
