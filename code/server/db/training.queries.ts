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

