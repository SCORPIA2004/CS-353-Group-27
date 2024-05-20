import { Speciality } from '@/enum/speciality.enum';

export const searchTrainer = (speciality?: Speciality, experience?: number, id?: number) => {
  let query = `
    SELECT trainers.*, users.first_name, users.last_name
    FROM trainers
    JOIN users ON trainers.id = users.id
    WHERE 1=1
  `;

  if (speciality !== undefined) {
    query += ` AND trainers.speciality = '${speciality}'`;
  }

  if (experience !== undefined) {
    query += ` AND trainers.experience >= ${experience}`;
  }

  if (id !== undefined) {
    query += ` AND trainers.id = ${id}`;
  }

  return query;
};

export const createConsultation = (trainerId: number, traineeId: number, date: Date) => {
  return `INSERT INTO consultations (trainer_id, trainee_id, date) VALUES (${trainerId}, ${traineeId}, '${date}')`;
}

export const searchConsultation = (trainerId?: number, traineeId?: number, date?: Date) => {
  let query = `SELECT consultations.*, users.first_name AS trainer_first_name, users.last_name AS trainer_last_name FROM consultations LEFT JOIN users ON consultations.trainer_id = users.id WHERE 1`;

  if (trainerId !== undefined) {
    query += ` AND consultations.trainer_id = ${trainerId}`;
  }

  if (traineeId !== undefined) {
    query += ` AND consultations.trainee_id = ${traineeId}`;
  }

  if (date !== undefined) {
    query += ` AND consultations.date = '${date}'`;
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

