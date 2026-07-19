import app from "./app";
import { db } from "./config/db";
import { ENV } from "./utils/env";

const PORT = ENV.PORT|| 5000;

async function startServer(){
  try{
     await db.query("SELECT NOW()");
     console.log("Database connected");
     app.listen(PORT,() => {
      console.log(`Server is running on port ${PORT}`)
     })
  }catch(err){
      console.error("Database Connection Failed");
      console.error(err)
        
  }
}

startServer()