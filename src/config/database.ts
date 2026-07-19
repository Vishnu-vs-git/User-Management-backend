import { db } from "./db";

export async function connectDatabase(retries = 10): Promise<void> {
  while (retries > 0) {
    try {
      await db.query("SELECT NOW()");
      console.log(" Database connected");
      return;
    } catch (error) {
      retries--;
      console.log(
        `Database not ready. Retrying in 3 seconds... (${retries} retries left)`
      );

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  throw new Error("Could not connect to the database.");
}
