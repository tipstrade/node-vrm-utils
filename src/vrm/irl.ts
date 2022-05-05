import { FormatFn } from ".";

export const formatIrl: FormatFn = (vrm) => {
  vrm = vrm.replace(/\s/g, "").toUpperCase();

  const match = vrm.match(/^([0-9]{2,3})(-)?([A-Z]{1,2})(-)?([0-9]+)$/);

  if (match) {
    return `${match[1]}-${match[3]}-${match[5]}`;
  }

  return vrm;
}
