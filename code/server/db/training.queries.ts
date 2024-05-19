import { Speciality } from '@/enum/speciality.enum';

export const searchTrainer = (speciality?: Speciality, experience?: number, id?: number) => {
  let query = `SELECT * FROM trainers WHERE 1`;

  if (speciality !== undefined) {
    query += ` AND speciality = '${speciality}'`;
  }

  if (experience !== undefined) {
    query += ` AND experience = ${experience}`;
  }

  if (id !== undefined) {
    query += ` AND id = ${id}`;
  }

  return query;
};

export const createConsultation = (trainerId: number, traineeId: number, date: Date) => {
  return `INSERT INTO consultations (trainerId, traineeId, date) VALUES (${trainerId}, ${traineeId}, '${date}')`;

}

export const searchConsultation = (trainerId?: number, traineeId?: number, date?: Date) => {
  let query = `SELECT * FROM consultations WHERE 1`;

  if (trainerId !== undefined) {
    query += ` AND trainer_id = ${trainerId}`;
  }

  if (traineeId !== undefined) {
    query += ` AND trainee_id = ${traineeId}`;
  }

  if (date !== undefined) {
    query += ` AND date = '${date}'`;
  }

  return query;
}
export const deleteUserWorkoutQuery = (workoutId: number) => {
  return `DELETE FROM user_workout WHERE workout_id = ${workoutId}`;
};

export const deleteWorkoutQuery = (workoutId: number) => {
  return `DELETE FROM workouts WHERE id = ${workoutId}`;
};


export const updateWorkoutQuery = (workoutId: number, title: string, description: string, duration: number, difficulty: string, intensity: string) => {
  return `
    UPDATE workouts 
    SET title = '${title}', description = '${description}', duration = ${duration}, difficulty = '${difficulty}', intensity = '${intensity}'
    WHERE id = ${workoutId}
  `;
};


export const createWorkoutQuery = (
  title: string,
  description: string,
  duration: number,
  difficulty: string,
  required_equipment: string,
  intensity: string,
  trainerId: number,
) => {
  return `
    INSERT INTO workouts (title, description, duration, difficulty, intensity, required_equipment, trainer_id)
    VALUES ('${title}', '${description}', ${duration}, '${difficulty}', '${intensity}', '${required_equipment}', ${trainerId})
  `;
};




export const getTraineesQuery = (trainerId?: number) => {
  let query = `
        SELECT *
        FROM users u
        INNER JOIN trainee t ON t.id = u.id
        INNER JOIN consultations c ON c.trainee_id = t.id
        WHERE c.trainer_id = ${trainerId}
    `;
  return query;
  
};
