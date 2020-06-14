import React, { useState } from "react"
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  PseudoBox,
} from "@chakra-ui/core"

let formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
})

const logScale = (min, max, x) => {
  const n = 1.0 - Math.log(min) / Math.log(max)
  return min * Math.pow(max, (n * x) / 100)
}
const invLogScale = (min, max, x) => {
  return 1.0 - Math.log(x / max) / Math.log(min / max)
}
const fakeLog = x => {
  if (0 <= x && x <= 25) return x
  else if (25 < x && x <= 75) return 1.5 * x - 12.5
  else return 20 * x - 1400
}

const DonationSlider = ({ locale, corporations }) => {
  const [rawValue, setRawValue] = useState(0)
  // it breaks for some reason if this isn't stored in state AND I DONT KNOW WHY
  const [corps] = useState(corporations)
  const min = Number(
    (locale.Income * corps[corps.length - 1].Percent_Profits).toPrecision(1)
  )
  const max = Number((locale.Income * corps[0].Percent_Profits).toPrecision(1))
  const value = logScale(min, max, rawValue)
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: locale.Currency,
  })
  const intFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: locale.Currency,
    minimumFractionDigits: 0,
  })
  const formattedValue = formatter.format(value)
  const corp = corps.find(_ => value > _.Percent_Profits * locale.Income)
  const notches = []
  for (let i = 0; ; i++) {
    const notch =
      Math.pow(2, (i - 1) % 2) * 5 * Math.pow(10, Math.floor((i - 1) / 2)) // OEIS A268100 (1/5/10...)
    // (Math.pow(i % 3, 2) + 1) * Math.pow(10, Math.floor(i / 3)) // OEIS A051109 (1/2/5/10...)
    if (notch > max) break
    if (notch > min) notches.push(notch)
  }
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
        mb="30px"
      >
        <SliderTrack />
        <SliderFilledTrack bg="snow" />
        <SliderThumb bg="primary.green" />
        <PseudoBox width="100%" position="absolute">
          {notches.map(notch => {
            const percent = invLogScale(min, max, notch)
            return (
              <PseudoBox
                as="span"
                position="absolute"
                top="10px"
                left={`${percent * 100}%`}
                transform="translate(-50%, 0)"
                // ramp from 0.25rem to 0.75rem
                fontSize={`${Math.abs(rawValue / 100 - percent) * -0.5 + 0.6}rem`}
                transition="color 250ms"
                color={value >= notch ? "snow" : "darkless"}
                // six significant figures for accuracy with KRW/JPY
                onClick={() => setRawValue(Math.ceil(percent * 1000000) / 10000)}
              >
                {intFormatter.format(notch)}
              </PseudoBox>
            )
          })}
        </PseudoBox>
      </Slider>
      <Button bg="primary.green" display="inline-block">
        Donate {formattedValue}
        {corp && (
          <>
            <br />
            <small>That's more than {corp.Name}!</small>
          </>
        )}
      </Button>
    </>
  )
}

export default DonationSlider
