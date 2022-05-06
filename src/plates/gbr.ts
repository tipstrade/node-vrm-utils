import { PlateFn } from "."
import { Plate } from "../models";

const plates: [number, number, string][] = [
  // [2002, 3, "02"],
  [2001, 8, "51"],
  [2001, 3, "Y"],
  [2000, 9, "X"],
  [2000, 3, "W"],
  [1999, 9, "V"],
  [1999, 3, "T"],
  [1998, 8, "S"],
  [1997, 8, "R"],
  [1996, 8, "P"],
  [1995, 8, "N"],
  [1994, 8, "M"],
  [1993, 8, "L"],
  [1992, 8, "K"],
  [1991, 8, "J"],
  [1990, 8, "H"],
  [1989, 8, "G"],
  [1988, 8, "F"],
  [1987, 8, "E"],
  [1986, 8, "D"],
  [1985, 8, "C"],
  [1984, 8, "B"],
  [1983, 8, "A"],
  [1982, 8, "Y"],
  [1981, 8, "X"],
  [1980, 8, "W"],
  [1979, 8, "V"],
  [1978, 8, "T"],
  [1977, 8, "S"],
  [1976, 8, "R"],
  [1975, 8, "P"],
  [1974, 8, "N"],
  [1973, 8, "M"],
  [1972, 8, "L"],
  [1971, 8, "K"],
  [1969, 8, "J"],
  [1968, 8, "H"],
  [1967, 8, "G"],
  [1967, 1, "F"],
  [1967, 1, "E"],
  [1966, 1, "D"],
  [1965, 1, "C"],
  [1964, 1, "B"],
  [1963, 1, "A"],
];

function createPlate(year: number, month: number, serial: string): Plate {
  return {
    issued: new Date(year, month - 1, 1),
    serial,
  };
}

export const getGbrPlate: PlateFn = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (year > 2001) {
    // After 2001
    const decade = Math.floor(year / 10) % 10;
    let serial: string;
    let issuedYear: number;
    let issuedMonth: number;

    //Get the latter part of the letter part
    if (month < 3) {
      //If were are in the 1st year of the decade
      //use the previous decade's end of year counter
      if ((year % 10) == 0) {
        serial = `${4 + decade}`;
      } else {
        serial = `${5 + decade}`;
      }
      issuedYear = year - 1;
      issuedMonth = 9;
      serial += `${issuedYear % 10}`;

    } else if (month < 9) {
      issuedYear = year;
      issuedMonth = 3;
      serial = `${decade}${year % 10}`;

    } else {
      issuedYear = year;
      issuedMonth = 9;
      serial = `${5 + decade}${year % 10}`;

    }

    return createPlate(issuedYear, issuedMonth, serial);
  } else {
    // Use the lookup table for the most recent plate that matches the year and is on or after the month requested
    const found = plates.find((p) => {
      return date >= new Date(p[0], p[1] - 1, 1);
    });

    if (found) {
      return createPlate(found[0], found[1], found[2]);
    }
  }

  return undefined;
}
