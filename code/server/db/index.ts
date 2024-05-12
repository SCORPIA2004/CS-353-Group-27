import { createConnection, Connection } from 'mysql2/promise';
import 'dotenv/config';
import { createUsersTableQuery, createUserWorkoutTableQuery, createWorkoutsTableQuery } from '@/db/table.queries';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export let connection: Connection = null;

const loadSchemas = async () => {
  await connection.execute(createUsersTableQuery);
  await connection.execute(createWorkoutsTableQuery);
  await connection.execute(createUserWorkoutTableQuery);
}
export const connectToDatabase = async () => {
  try {
    connection = await createConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    await loadSchemas();
    console.log('Connected to database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return null;
  }
};

