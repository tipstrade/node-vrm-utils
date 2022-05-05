import { Plate } from "../models";
import { getGbrPlate } from "./gbr";
import { getIrlPlate } from "./irl";

export type PlateFn = (date: Date) => Plate | undefined;

/** 
 * Gets the list of plates for the specified year. 
 * @param country The 2 or 3 character ISO country code.
 * @param year The year for which to get the plates.
 */
function getPlate(country: string, year: number): Plate[];
/** 
 * Gets the plate for the specified registration date. 
 * @param country The 2 or 3 character ISO country code.
 * @param date The registration for which to get the plates.
 */
function getPlate(country: string, date: Date): Plate | undefined;
function getPlate(country: string, value: number | Date): Plate[] | Plate | undefined {
  const fn = getPlateFn(country);

  if (typeof value === "number") {
    const resp: Plate[] = [];
    let last: Plate | undefined;

    for (let month = 0; month < 12; month++) {
      const plate = fn(new Date(value, month, 1));

      if (plate && plate.serial !== last?.serial) {
        resp.push(plate);
      }

      last = plate;
    }

    return resp;
  } else {
    return fn(value);
  }
}

function getPlateFn(country: string): PlateFn {
  switch (country.toLocaleUpperCase()) {
    case "GB":
    case "GBR":
      return getGbrPlate;
    case "IE":
    case "IRL":
      return getIrlPlate;
    default:
      throw new Error(`${country} is not supported.`);
  }
}

/** Returns a flag indicating whether the country is supported. */
function isSupported(country: string): boolean {
  try {
    getPlateFn(country);

    return true;
  } catch {
    return false;
  }
}

export {
  getPlate,
  isSupported as canGetPlate,
}
