import { formatGbr } from "./gbr";
import { formatIrl } from "./irl";

export type FormatFn = (vrm: string) => string;

/** 
 * Gets the formatted VRM for the specified country. 
 * @param country The 2 or 3 character ISO country code.
 * @param vrm The VRM.
 */function formatVrm(country: string, vrm: string): string {
  const fn = getFormatFn(country);

  return fn(vrm);
}

function getFormatFn(country: string): FormatFn {
  switch (country.toLocaleUpperCase()) {
    case "GB":
    case "GBR":
      return formatGbr;
    case "IE":
    case "IRL":
      return formatIrl;
    default:
      throw new Error(`${country} is not supported.`);
  }
}

/** Returns a flag indicating whether the country is supported. */
function isSupported(country: string): boolean {
  try {
    getFormatFn(country);

    return true;
  } catch {
    return false;
  }
}

export {
  formatVrm,
  isSupported as canFormat,
}
