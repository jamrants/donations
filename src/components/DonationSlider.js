import React, { useState } from "react"
import {
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  PseudoBox,
} from "@chakra-ui/core"
import CustomButton from "./Button"

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

const causes = {
  blm: {
    name: "Black Lives Matter",
    url: "https://secure.actblue.com/donate/ms_blm_homepage_2019?amount=%s",
  },
  coc: {
    name: "Color of Change",
    url: "https://secure.actblue.com/contribute/page/support-us?amount=",
  },
  eji: {
    name: "Equal Justice Initiative",
    url: "https://support.eji.org/give/153413/#!/donation/checkout?amount=%s",
  },
  naacpLdf: {
    name: "NAACP Legal Defense Fund",
    url:
      "https://org2.salsalabs.com/o/6857/p/salsa/donation/common/public/?donate_page_KEY=15780&amount=%s",
  },
}

const DonationSlider = ({ locale, corporations }) => {
  const [rawValue, setRawValue] = useState(0)
  const [causeValue, setCauseValue] = useState(Object.keys(causes)[0])
  // it breaks for some reason if this isn't stored in state AND I DONT KNOW WHY
  const [corps] = useState(corporations)

  const min = Number(
    (locale.Income * corps[corps.length - 1].Percent_Profits).toPrecision(1)
  )
  const max = Number((locale.Income * corps[0].Percent_Profits).toPrecision(1))
  const value = logScale(min, max, rawValue)

  const currency = locale.Currency || "USD"
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  })
  const intFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    minimumFractionDigits: 0,
    currency,
  })
  const formattedValue = formatter.format(value)

  const notches = []
  for (let i = 0; ; i++) {
    const notch =
      Math.pow(2, (i - 1) % 2) * 5 * Math.pow(10, Math.floor((i - 1) / 2)) // OEIS A268100 (1/5/10...)
    // (Math.pow(i % 3, 2) + 1) * Math.pow(10, Math.floor(i / 3)) // OEIS A051109 (1/2/5/10...)
    if (notch > max) break
    if (notch > min) notches.push(notch)
  }
  const corp = corps.find(_ => value > _.Percent_Profits * locale.Income)

  const makeDonation = async () => {
    let USD = value
    if (locale.Currency !== "USD") {
      const api = await fetch("https://api.exchangeratesapi.io/latest?base=USD")
      const { rates } = await api.json()
      USD = value / rates[locale.Currency]
    }
    // open new tab
    const target = causes[causeValue].url.replace("%s", USD.toFixed(2))
    window.open(target, "_blank")
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
        <SliderTrack bg="darkless" height="10px" borderRadius="30px" />
        <SliderFilledTrack
          height="10px"
          borderRadius="30px"
          backgroundColor="snow"
        />
        <SliderThumb size="16px" bg="primary.green" />
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
                fontSize={`${Math.abs(rawValue / 100 - percent) * -0.3 + 1}rem`}
                transition="color 250ms"
                color={value >= notch ? "snow" : "slate"}
                // six significant figures for accuracy with KRW/JPY
                onClick={() =>
                  setRawValue(Math.ceil(percent * 1000000) / 10000)
                }
              >
                {intFormatter.format(notch)}
              </PseudoBox>
            )
          })}
        </PseudoBox>
      </Slider>
      <RadioGroup
        value={causeValue}
        onChange={e => setCauseValue(e.target.value)}
        mb="20px"
        isInline
      >
        {Object.entries(causes).map(([id, cause]) => (
          <Radio value={id} variantColor="green" color="snow">
            {cause.name}
          </Radio>
        ))}
      </RadioGroup>
      <CustomButton
        bg="primary.green"
        display="inline-block"
        onClick={makeDonation}
      >
        Donate {formattedValue}
        {corp && (
          <>
            <br />
            <small>That's more than {corp.Name}!</small>
          </>
        )}
      </CustomButton>
    </>
  )
}

export default DonationSlider
