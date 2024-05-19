import { Difficulty } from '@/enum/difficulty.enum';
import { Intensity } from '@/enum/intensity.enum';

export const createWorkout = (title: string, description: string, difficulty: Difficulty, duration: number, intensity: Intensity, requiredEquipment: string[], trainerId: number) =>
  `INSERT INTO workouts (title, description, difficulty, duration, intensity, required_equipment, trainer_id) VALUES ('${title}', '${description}', '${difficulty}', ${duration}, '${intensity}', '${requiredEquipment}', ${trainerId})`;

export const logWorkout = (workoutId: number, userId: number, duration: number, caloriesBurned: number, date: string) =>
  `INSERT INTO user_workout (workout_id, user_id, duration, calories_burned, date) VALUES (${workoutId}, ${userId}, ${duration}, ${caloriesBurned}, '${date}')`;

export const searchWorkout = (id?: number, title?: string, difficulty?: Difficulty, duration?: number, intensity?: Intensity) => {
  let query = `SELECT * FROM workouts WHERE 1`;

  if (id !== undefined) {
    query += ` AND id = ${id}`;
  }

  if (title !== undefined) {
    query += ` AND title LIKE '%${title}%'`;
  }

  if (difficulty !== undefined) {
    query += ` AND difficulty = '${difficulty}'`;
  }

  if (duration !== undefined) {
    query += ` AND duration = ${duration}`;
  }

  if (intensity !== undefined) {
    query += ` AND intensity = '${intensity}'`;
  }

  return query;
};
