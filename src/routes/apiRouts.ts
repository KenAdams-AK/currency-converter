const BASE_URL = "https://api.exchangerate.host";

export const apiRouts = {
  FETCH_CURRENCY_SYMBOLS: `${BASE_URL}/symbols`,
  GET_LATEST_RATES: `${BASE_URL}/latest`,
  GET_CONVERT_CURRENCY: `${BASE_URL}/convert`,
} as const;
