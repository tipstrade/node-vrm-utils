import { FormatFn } from ".";

type FormatGbrFn = (vrm: string) => string | undefined;

const formatPre1963Reversed: FormatGbrFn = (vrm) => {
  const match = vrm.match(/^([0-9]+)([A-Z]+)$/);

  if (match) {
    return `${match[1]} ${match[2]}`;
  }
}

const formatPre1963: FormatGbrFn = (vrm) => {
  const match = vrm.match(/^([A-Z]+)([0-9]+)$/);

  if (match) {
    return `${match[1]} ${match[2]}`;
  }
}
const formatPost1962: FormatGbrFn = (vrm) => {
  const match = vrm.match(/^([A-Z]{3})(.+)$/);

  if (match) {
    return `${match[1]} ${match[2]}`;
  }
}

const formatPost1982: FormatGbrFn = (vrm) => {
  const match = vrm.match(/^(.+)([A-Z]{3})$/);

  if (match) {
    return `${match[1]} ${match[2]}`;
  }
}

export const formatGbr: FormatFn = (vrm) => {
  vrm = vrm.replace(/\s/g, "").toUpperCase();

  return formatPost1982(vrm)
    || formatPost1962(vrm)
    || formatPre1963(vrm)
    || formatPre1963Reversed(vrm)
    || vrm;
};
