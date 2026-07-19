import { Pool } from "pg";
import { ENV } from "../utils/env";

export const db = new Pool({
  connectionString: ENV.DATABASE_URL,
});
