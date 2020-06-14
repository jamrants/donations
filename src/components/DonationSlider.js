import React, { useState } from "react"
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/core"

let formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
})

const logScale = (min, max, x) => {
  const n = 1.0 - (Math.log(min) / Math.log(max))
  return min * Math.pow(max, (n * x) / 100)
}
const fakeLog = x => {
  if (0 <= x && x <= 25) return x
  else if (25 < x && x <= 75) return 1.5 * x - 12.5
  else return 20 * x - 1400
}

const DonationSlider = ({ locale, corporations }) => {
  const [rawValue, setRawValue] = useState(0)
  // it breaks for some reason if this isn't stored in state AND I DONT KNOW WHY
  const [corps, setCorps] = useState(corporations)
  const min = Number((locale.Income * corps[corps.length-1].Percent_Profits).toPrecision(1))
  const max = Number((locale.Income * corps[0].Percent_Profits).toPrecision(1))
  const value = logScale(min, max, rawValue)
  const formattedValue = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: locale.Currency,
  }).format(value)
  const corp = corps.find(_ => value > _.Percent_Profits * locale.Income)
  return (
    <>
      <Slider
        value={rawValue}
        onChange={setRawValue}
        name="donation"
        datalist="notches"
        step={0.1}
        min={0}
        max={100}
      >
        <SliderTrack />
        <SliderFilledTrack bg="snow" />
        <SliderThumb bg="primary.green" />
      </Slider>
      <Button bg="primary.green" display="inline-block">
        Donate {formattedValue}!
        {corp && (
          <>
            <br />
            <small>That's as much as {corp.Name}</small>
          </>
        )}
      </Button>
    </>
  )
}

export default DonationSlider
