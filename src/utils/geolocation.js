/**
 * Get the user's current location
 * @returns {{ country: string, postal: string }} ISO country code and postal/ZIP code
 */
export const getLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Browser does not support geolocation")
  }
  const pos = await new Promise((res, rej) =>
    navigator.geolocation.getCurrentPosition(res, rej, {
      enableHighAccuracy: true,
    })
  )
  const { latitude, longitude } = pos.coords
  const key = process.env.LOCATIONIQ
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${latitude}&lon=${longitude}&format=json`
  const res = await fetch(url)
  const data = await res.json()
  const country = data.address.country_code
  let postal = data.address.postcode
  if (country === 'ca') postal = postal.substring(0, 3)
  return { country, postal }
}
