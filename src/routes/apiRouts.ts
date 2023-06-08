const API_KEY = import.meta.env.VITE_API_KEY;

export const apiRouts = {
  GET_CURRENCY_URL: `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`,
} as const;
