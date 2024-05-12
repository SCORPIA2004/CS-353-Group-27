import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from '@/src/workouts/dto/create.dto';
import { logWorkoutDto } from '@/src/workouts/dto/log.dto';
import { searchWorkoutDto } from '@/src/workouts/dto/search.dto';
import { Role } from '@/enum/role.enum';
import { connection } from '@/db';
import { RowDataPacket } from 'mysql2';
import { createWorkout, logWorkout, searchWorkout } from '@/db/workout.queries';

@Injectable()
export class WorkoutsService {

  async create(data: CreateWorkoutDto, user: { email: string, role: string, id: number }) {
    if (user.role !== Role.TRAINER) {
      throw new HttpException('Unauthorized. Not a trainer.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(createWorkout(data.title, data.description, data.difficulty, data.duration, data.intensity, data.requiredEquipment, user.id));

    return (QueryResult as RowDataPacket).insertId;
  }

  async search(query: searchWorkoutDto) {
    const [QueryResult] = await connection.execute(searchWorkout(query.id, query.title, query.difficulty, query.duration, query.intensity));

    return QueryResult
  }

  async logWorkout(data: logWorkoutDto, user: any) {
    if (user.role !== Role.USER) {
      throw new HttpException('Unauthorized. Not a User.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(searchWorkout(data.workoutId));

    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Workout not found', HttpStatus.NOT_FOUND);
    }

    const date = new Date().toISOString().slice(0,10);
    const [CreateResult] = await connection.execute(logWorkout(data.workoutId, user.id, data.duration, data.caloriesBurned, date));

    return (CreateResult as RowDataPacket).insertId;
  }
}
