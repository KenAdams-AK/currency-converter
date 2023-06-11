export interface SymbolsResponse {
  motd: MOTD;
  success: boolean;
  symbols: CurrencySymbols;
}

export interface MOTD {
  msg: string;
  url: string;
}

export interface CurrencySymbols {
  [key: string]: CurrencyDescription;
}

export interface CurrencyDescription {
  description: string;
  code: string;
}
