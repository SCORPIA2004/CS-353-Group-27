import { createConnection, Connection } from "mysql2/promise";
import "dotenv/config";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
export let connection: Connection = null;
export const connectToDatabase = async () => {
  try {
    connection = await createConnection({
      user: DB_USER,
      password: DB_PASSWORD
    });
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return null;
  }
};

