import { Difficulty } from '@/enum/difficulty.enum';
import { Intensity } from '@/enum/intensity.enum';

export const createWorkout = (title: string, description: string, difficulty: Difficulty, duration: number, intensity: Intensity, requiredEquipment: string[], trainerId: number) =>
  `INSERT INTO workouts (title, description, difficulty, duration, intensity, required_equipment, trainer_id) VALUES ('${title}', '${description}', '${difficulty}', ${duration}, '${intensity}', '${requiredEquipment}', ${trainerId})`;

export const logWorkout = (workoutId: number, userId: number, duration: number, caloriesBurned: number, date: string) =>
  `INSERT INTO user_workout (workout_id, user_id, duration, calories_burned, date) VALUES (${workoutId}, ${userId}, ${duration}, ${caloriesBurned}, '${date}')`;

// export const searchWorkoutLogs = (userId: number) =>
//     `SELECT * FROM user_workout WHERE user_id = ${userId}`;

export const searchWorkoutLogs = (userId: number) =>
  `
  SELECT uw.*, w.title AS workout_title 
  FROM user_workout uw
  JOIN workouts w ON uw.workout_id = w.id
  WHERE uw.user_id = ${userId};
  `;



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

export const getWorkoutsCreatedByMe = (trainerId: number) => {
  return `SELECT * FROM workouts WHERE trainer_id = ${trainerId}`;
}

