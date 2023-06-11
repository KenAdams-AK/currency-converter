import { rest } from "msw";
import { mockedCurrency } from "./data";

import { apiRouts } from "../../src/routes/apiRouts";

// export const GET_CURRENCY_URL = apiRouts.GET_RATES_URL.slice(
//   0,
//   apiRouts.GET_RATES_URL.indexOf("?"),
// );

export const handlers = [
  rest.get(apiRouts.FETCH_CURRENCY_SYMBOLS, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCurrency), ctx.delay(150));
  }),
];
