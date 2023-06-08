import { rest } from "msw";
import { mockedCurrency } from "./data";

import { apiRouts } from "../../src/routes/apiRouts";

export const { GET_CURRENCY_URL } = apiRouts;

export const handlers = [
  rest.get(GET_CURRENCY_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCurrency), ctx.delay(150));
  }),
];
