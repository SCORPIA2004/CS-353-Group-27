import { Role } from '@/enum/role.enum';
import enumify from '@/enum/enumify';
import { Goal } from '@/enum/goal.enum';
import { Intensity } from '@/enum/intensity.enum';
import { Difficulty } from '@/enum/difficulty.enum';

export const createUserWorkoutTableQuery = `
    CREATE TABLE IF NOT EXISTS user_workout (
        id INT AUTO_INCREMENT PRIMARY KEY,
        workout_id INT NOT NULL,
        user_id INT NOT NULL,
        duration INT NOT NULL,
        calories_burned INT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (workout_id) REFERENCES workouts(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`

export const createWorkoutsTableQuery = `
    CREATE TABLE IF NOT EXISTS workouts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        difficulty ENUM(${enumify(Difficulty)}) NOT NULL,
        duration INT NOT NULL,
        intensity ENUM(${enumify(Intensity)}) NOT NULL,
        required_equipment TEXT NOT NULL,
        trainer_id INT NOT NULL,
        FOREIGN KEY (trainer_id) REFERENCES users(id)
    )`

export const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        role ENUM(${enumify(Role)}) DEFAULT '${Role.USER}'
    )
`;

export const createGoalTableQuery = `
    CREATE TABLE IF NOT EXISTS goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        goal ENUM(${enumify(Goal)}) NOT NULL,
        current_value INT NOT NULL,
        target INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;