import { red, green, blue, yellow, gray } from "@radix-ui/colors";
import {
  redDark,
  greenDark,
  blueDark,
  yellowDark,
  grayDark,
} from "@radix-ui/colors";
import { writeFileSync } from "fs";

const lightColors: { [key: string]: RGB } = {
  ...radixColorToColor(red),
  ...radixColorToColor(green),
  ...radixColorToColor(blue),
  ...radixColorToColor(yellow),
  ...radixColorToColor(gray),
};

const darkColors: { [key: string]: RGB } = {
  ...radixColorToColor(redDark),
  ...radixColorToColor(greenDark),
  ...radixColorToColor(blueDark),
  ...radixColorToColor(yellowDark),
  ...radixColorToColor(grayDark),
};

// Driver code

var outputStylesheet = `@mixin light-colors {
${Object.entries(lightColors)
  .map(([key, value]) => keyValueVarToCSSVar(key, value))
  .join("\n")}
}

@mixin dark-colors {
${Object.entries(darkColors)
  .map(([key, value]) => keyValueVarToCSSVar(key, value))
  .join("\n")}
}
`;

writeFileSync("./src/styles/colors.scss", outputStylesheet);

// Various utils used in conversion

function camelCaseToKebab(str: string) {
  return str.replaceAll(/([A-Z])/g, "-$1").toLowerCase();
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex: string): RGB {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: -1, g: -1, b: -1 };
}

function radixColorToColor(radixColor: object) {
  return Object.fromEntries(
    Object.entries(radixColor).map(([key, value]) => {
      const hue = /\((\d+),/.exec(value)?.[1] ?? "0";
      const saturation = /, ([\d\.]+)%/.exec(value)?.[1] ?? "0";
      const lightness = /([\d\.]+)%\)/.exec(value)?.[1] ?? "0";
      return [
        key,
        hexToRgb(
          hslToHex(
            parseInt(hue),
            parseInt(saturation),
            parseInt(lightness)
          ).substring(1)
        ),
      ];
    })
  );
}

function keyValueVarToCSSVar(key: string, value: RGB) {
  return `  --${camelCaseToKebab(key)}: ${value.r}, ${value.g}, ${value.b};`;
}
