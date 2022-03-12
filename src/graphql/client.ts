import { cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";

import { Hasura } from "../utils/hasuraUtils";
import authExchange from "./exchanges/authExchange";

const client = createClient({
  url: Hasura.ENDPOINT,
  exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange],
});

export default client;
