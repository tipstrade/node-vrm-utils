import { PlateFn } from ".";

export const getIrlPlate: PlateFn = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (year > 2012) {
    let suffix: "1" | "2";
    let issuedMonth: number;


    if (month < 7) {
      suffix = "1";
      issuedMonth = 1
    } else {
      suffix = "2";
      issuedMonth = 7;
    }

    return {
      serial: `${year % 100}${suffix}`,
      issued: new Date(year, issuedMonth - 1, 1),
    };

  } else if (year > 1986) {
    return {
      serial: `${year % 100}`,
      issued: new Date(year, 0, 1),
    };
  }
}
