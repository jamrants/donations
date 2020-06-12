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
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&addressdetails=1&format=jsonv2`
  const res = await fetch(url)
  const data = await res.json()
  const country = data.address.country_code
  let postal = data.address.postcode
  if (country === "ca") postal = postal.substring(0, 3)
  return { country, postal }
}
