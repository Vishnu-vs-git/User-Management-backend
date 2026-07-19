import app from "./app";
import { connectDatabase } from "./config/database";
import { ENV } from "./utils/env";

const PORT = ENV.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database Connection Failed");
    console.error(err);
  }
}

startServer();
