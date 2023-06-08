import { rest } from "msw";
import { mockedCurrency } from "./data";

import { apiRouts } from "../../src/routes/apiRouts";

export const GET_CURRENCY_URL = apiRouts.GET_CURRENCY_URL.slice(
  0,
  apiRouts.GET_CURRENCY_URL.indexOf("?"),
);

export const handlers = [
  rest.get(GET_CURRENCY_URL, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCurrency), ctx.delay(150));
  }),
];
