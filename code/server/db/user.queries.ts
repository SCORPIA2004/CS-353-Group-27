import { Role } from '@/enum/role.enum';

export const registerQuery = (email: string, password: string, firstName: string, lastName: string, dob: Date, role: Role) =>
  `INSERT INTO users (email, password, first_name, last_name, dob, role) VALUES ('${email}', '${password}', '${firstName}', '${lastName}', '${dob}', '${role}')`;

export const loginQuery = (email: string, password: string) =>
  `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
export const getUserQuery = (email: string) =>
  `SELECT * FROM users WHERE email = '${email}'`;

