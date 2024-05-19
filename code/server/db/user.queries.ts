import { Role } from '@/enum/role.enum';
import { Speciality } from '@/enum/speciality.enum';

export const registerQuery = (email: string, password: string, firstName: string, lastName: string, dob: Date, role: Role) =>
  `INSERT INTO users (email, password, first_name, last_name, dob, role) VALUES ('${email}', '${password}', '${firstName}', '${lastName}', '${dob}', '${role}')`;

export const createTrainerQuery = (userId: string, experience: number, speciality: Speciality) =>
  `INSERT INTO trainers (id, experience, speciality) VALUES ('${userId}', ${experience}, '${speciality}')`;

export const createTraineeQuery = (userId: string, height: number, weight: number) =>
  `INSERT INTO trainee (id, height, weight) VALUES ('${userId}', ${height}, ${weight})`;

export const loginQuery = (email: string, password: string) =>
  `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
export const getUserQuery = (email: string) =>
  `SELECT * FROM users WHERE email = '${email}'`;

