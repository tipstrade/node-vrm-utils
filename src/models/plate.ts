/** Represents a registration plate. */
export interface Plate {
  /** The date of when the plate was issued. */
  issued: Date;
  /** The plate serial. */
  serial?: string;
}
