import { Role } from "@/enum/role.enum";

export const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        role ENUM('admin', 'user', 'trainer') DEFAULT 'user'
      )`;

export const registerQuery = (email: string, password: string, firstName: string, lastName: string, dob: Date, role: Role) =>
  `INSERT INTO users (email, password, first_name, last_name, dob, role) VALUES ('${email}', '${password}', '${firstName}', '${lastName}', '${dob}', '${role}')`;

export const loginQuery = (email: string, password: string) =>
  `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
export const getUserQuery = (email: string) =>
  `SELECT * FROM users WHERE email = '${email}'`;

