import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from '@/src/workouts/dto/create.dto';
import { logWorkoutDto } from '@/src/workouts/dto/log.dto';
import { searchWorkoutDto } from '@/src/workouts/dto/search.dto';
import { Role } from '@/enum/role.enum';
import { connection } from '@/db';
import { RowDataPacket } from 'mysql2';
import {createWorkout, logWorkout, searchWorkout, searchWorkoutLogs} from '@/db/workout.queries';
import getSimpleDate from '@/utils/get.simple.date';
import {JWTUser} from "@/src/users/users.guard";

@Injectable()
export class WorkoutsService {

  async create(data: CreateWorkoutDto, user: JWTUser) {
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

  async logWorkout(data: logWorkoutDto, user: JWTUser) {
    if (user.role !== Role.TRAINEE) {
      throw new HttpException('Unauthorized. Not a Trainee.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(searchWorkout(data.workoutId));

    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Workout not found', HttpStatus.NOT_FOUND);
    }

    const [CreateResult] = await connection.execute(logWorkout(data.workoutId, user.id, data.duration, data.caloriesBurned, getSimpleDate()));

    return (CreateResult as RowDataPacket).insertId;
  }


  async getLogs(user: JWTUser) {
    if (user.role !== Role.TRAINEE) {
      throw new HttpException('Unauthorized. Not a Trainee.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(searchWorkoutLogs(user.id));

    return QueryResult
  }
}
