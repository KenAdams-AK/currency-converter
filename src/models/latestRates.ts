export interface LatestRates {
  motd: MOTD;
  success: boolean;
  base: string;
  date: string;
  rates: Rates;
}

export interface Rates {
  [key: string]: number;
}

export interface MOTD {
  msg: string;
  url: string;
}
