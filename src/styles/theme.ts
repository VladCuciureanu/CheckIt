import { css } from "styled-components"
import {
  gray,
  grayDark,
  red,
  redDark,
  amber,
  amberDark,
  green,
  greenDark,
  blue,
  blueDark,
} from "@radix-ui/colors"

export const lightTheme = css`
  --colors-gray-1: ${stripCssFunction(gray.gray1)};
  --colors-gray-2: ${stripCssFunction(gray.gray2)};
  --colors-gray-3: ${stripCssFunction(gray.gray3)};
  --colors-gray-4: ${stripCssFunction(gray.gray4)};
  --colors-gray-5: ${stripCssFunction(gray.gray5)};
  --colors-gray-6: ${stripCssFunction(gray.gray6)};
  --colors-gray-7: ${stripCssFunction(gray.gray7)};
  --colors-gray-8: ${stripCssFunction(gray.gray8)};
  --colors-gray-9: ${stripCssFunction(gray.gray9)};
  --colors-gray-10: ${stripCssFunction(gray.gray10)};
  --colors-gray-11: ${stripCssFunction(gray.gray11)};
  --colors-gray-12: ${stripCssFunction(gray.gray12)};

  --colors-red-1: ${stripCssFunction(red.red1)};
  --colors-red-2: ${stripCssFunction(red.red2)};
  --colors-red-3: ${stripCssFunction(red.red3)};
  --colors-red-4: ${stripCssFunction(red.red4)};
  --colors-red-5: ${stripCssFunction(red.red5)};
  --colors-red-6: ${stripCssFunction(red.red6)};
  --colors-red-7: ${stripCssFunction(red.red7)};
  --colors-red-8: ${stripCssFunction(red.red8)};
  --colors-red-9: ${stripCssFunction(red.red9)};
  --colors-red-10: ${stripCssFunction(red.red10)};
  --colors-red-11: ${stripCssFunction(red.red11)};
  --colors-red-12: ${stripCssFunction(red.red12)};

  --colors-amber-1: ${stripCssFunction(amber.amber1)};
  --colors-amber-2: ${stripCssFunction(amber.amber2)};
  --colors-amber-3: ${stripCssFunction(amber.amber3)};
  --colors-amber-4: ${stripCssFunction(amber.amber4)};
  --colors-amber-5: ${stripCssFunction(amber.amber5)};
  --colors-amber-6: ${stripCssFunction(amber.amber6)};
  --colors-amber-7: ${stripCssFunction(amber.amber7)};
  --colors-amber-8: ${stripCssFunction(amber.amber8)};
  --colors-amber-9: ${stripCssFunction(amber.amber9)};
  --colors-amber-10: ${stripCssFunction(amber.amber10)};
  --colors-amber-11: ${stripCssFunction(amber.amber11)};
  --colors-amber-12: ${stripCssFunction(amber.amber12)};

  --colors-green-1: ${stripCssFunction(green.green1)};
  --colors-green-2: ${stripCssFunction(green.green2)};
  --colors-green-3: ${stripCssFunction(green.green3)};
  --colors-green-4: ${stripCssFunction(green.green4)};
  --colors-green-5: ${stripCssFunction(green.green5)};
  --colors-green-6: ${stripCssFunction(green.green6)};
  --colors-green-7: ${stripCssFunction(green.green7)};
  --colors-green-8: ${stripCssFunction(green.green8)};
  --colors-green-9: ${stripCssFunction(green.green9)};
  --colors-green-10: ${stripCssFunction(green.green10)};
  --colors-green-11: ${stripCssFunction(green.green11)};
  --colors-green-12: ${stripCssFunction(green.green12)};

  --colors-blue-1: ${stripCssFunction(blue.blue1)};
  --colors-blue-2: ${stripCssFunction(blue.blue2)};
  --colors-blue-3: ${stripCssFunction(blue.blue3)};
  --colors-blue-4: ${stripCssFunction(blue.blue4)};
  --colors-blue-5: ${stripCssFunction(blue.blue5)};
  --colors-blue-6: ${stripCssFunction(blue.blue6)};
  --colors-blue-7: ${stripCssFunction(blue.blue7)};
  --colors-blue-8: ${stripCssFunction(blue.blue8)};
  --colors-blue-9: ${stripCssFunction(blue.blue9)};
  --colors-blue-10: ${stripCssFunction(blue.blue10)};
  --colors-blue-11: ${stripCssFunction(blue.blue11)};
  --colors-blue-12: ${stripCssFunction(blue.blue12)};

  --colors-bg: 0, 0%, 100%;
  --colors-lowContrast: var(--colors-gray-11);
  --colors-highContrast: var(--colors-gray-12);
`

export const darkTheme = css`
  --colors-gray-1: ${stripCssFunction(grayDark.gray1)};
  --colors-gray-2: ${stripCssFunction(grayDark.gray2)};
  --colors-gray-3: ${stripCssFunction(grayDark.gray3)};
  --colors-gray-4: ${stripCssFunction(grayDark.gray4)};
  --colors-gray-5: ${stripCssFunction(grayDark.gray5)};
  --colors-gray-6: ${stripCssFunction(grayDark.gray6)};
  --colors-gray-7: ${stripCssFunction(grayDark.gray7)};
  --colors-gray-8: ${stripCssFunction(grayDark.gray8)};
  --colors-gray-9: ${stripCssFunction(grayDark.gray9)};
  --colors-gray-10: ${stripCssFunction(grayDark.gray10)};
  --colors-gray-11: ${stripCssFunction(grayDark.gray11)};
  --colors-gray-12: ${stripCssFunction(grayDark.gray12)};

  --colors-red-1: ${stripCssFunction(redDark.red1)};
  --colors-red-2: ${stripCssFunction(redDark.red2)};
  --colors-red-3: ${stripCssFunction(redDark.red3)};
  --colors-red-4: ${stripCssFunction(redDark.red4)};
  --colors-red-5: ${stripCssFunction(redDark.red5)};
  --colors-red-6: ${stripCssFunction(redDark.red6)};
  --colors-red-7: ${stripCssFunction(redDark.red7)};
  --colors-red-8: ${stripCssFunction(redDark.red8)};
  --colors-red-9: ${stripCssFunction(redDark.red9)};
  --colors-red-10: ${stripCssFunction(redDark.red10)};
  --colors-red-11: ${stripCssFunction(redDark.red11)};
  --colors-red-12: ${stripCssFunction(redDark.red12)};

  --colors-amber-1: ${stripCssFunction(amberDark.amber1)};
  --colors-amber-2: ${stripCssFunction(amberDark.amber2)};
  --colors-amber-3: ${stripCssFunction(amberDark.amber3)};
  --colors-amber-4: ${stripCssFunction(amberDark.amber4)};
  --colors-amber-5: ${stripCssFunction(amberDark.amber5)};
  --colors-amber-6: ${stripCssFunction(amberDark.amber6)};
  --colors-amber-7: ${stripCssFunction(amberDark.amber7)};
  --colors-amber-8: ${stripCssFunction(amberDark.amber8)};
  --colors-amber-9: ${stripCssFunction(amberDark.amber9)};
  --colors-amber-10: ${stripCssFunction(amberDark.amber10)};
  --colors-amber-11: ${stripCssFunction(amberDark.amber11)};
  --colors-amber-12: ${stripCssFunction(amberDark.amber12)};

  --colors-green-1: ${stripCssFunction(greenDark.green1)};
  --colors-green-2: ${stripCssFunction(greenDark.green2)};
  --colors-green-3: ${stripCssFunction(greenDark.green3)};
  --colors-green-4: ${stripCssFunction(greenDark.green4)};
  --colors-green-5: ${stripCssFunction(greenDark.green5)};
  --colors-green-6: ${stripCssFunction(greenDark.green6)};
  --colors-green-7: ${stripCssFunction(greenDark.green7)};
  --colors-green-8: ${stripCssFunction(greenDark.green8)};
  --colors-green-9: ${stripCssFunction(greenDark.green9)};
  --colors-green-10: ${stripCssFunction(greenDark.green10)};
  --colors-green-11: ${stripCssFunction(greenDark.green11)};
  --colors-green-12: ${stripCssFunction(greenDark.green12)};

  --colors-blue-1: ${stripCssFunction(blueDark.blue1)};
  --colors-blue-2: ${stripCssFunction(blueDark.blue2)};
  --colors-blue-3: ${stripCssFunction(blueDark.blue3)};
  --colors-blue-4: ${stripCssFunction(blueDark.blue4)};
  --colors-blue-5: ${stripCssFunction(blueDark.blue5)};
  --colors-blue-6: ${stripCssFunction(blueDark.blue6)};
  --colors-blue-7: ${stripCssFunction(blueDark.blue7)};
  --colors-blue-8: ${stripCssFunction(blueDark.blue8)};
  --colors-blue-9: ${stripCssFunction(blueDark.blue9)};
  --colors-blue-10: ${stripCssFunction(blueDark.blue10)};
  --colors-blue-11: ${stripCssFunction(blueDark.blue11)};
  --colors-blue-12: ${stripCssFunction(blueDark.blue12)};
  --colors-bg: 0, 0%, 0%;
  --colors-lowContrast: var(--colors-gray-11);
  --colors-highContrast: var(--colors-gray-12);
`

function stripCssFunction(color: string): string {
  return color.substring(color.indexOf("(") + 1, color.indexOf(")"))
}
