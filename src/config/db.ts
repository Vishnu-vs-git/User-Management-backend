import {Pool} from"pg";
import { ENV } from "../utils/env";

// export const db = new Pool({
//    port:Number(ENV.DB_PORT),
//    host:ENV.DB_HOST,
//    user:ENV.DB_USER,
//    password:ENV.DB_PASSWORD,
//    database:ENV.DB_NAME

// })

export const db = new Pool({
    connectionString: ENV.DATABASE_URL,
});

