import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connection } from '@/db';
import { searchTrainersDto } from '@/src/training/dto/search.dto';
import {
  createConsultation,
  searchConsultation,
  searchTrainer,
} from '@/db/training.queries';
import { ScheduleConsultationDto } from '@/src/training/dto/schedule.dto';
import { JWTUser } from '@/src/users/users.guard';
import { RowDataPacket } from 'mysql2';
import { Role } from '@/enum/role.enum';
import { ReviewProgressDto } from '@/src/training/dto/review.progress.dto';
import { getUserGoals } from '@/db/goal.queries';
import { getTraineesQuery } from '@/db/training.queries';
import { getWorkoutsCreatedByMe } from '@/db/workout.queries';

@Injectable()
export class TrainingService {
  async search(query: searchTrainersDto) {
    const [QueryResult] = await connection.execute(
      searchTrainer(query.speciality, query.experience),
    );

    return QueryResult;
  }

  async scheduleConsultation(data: ScheduleConsultationDto, user: JWTUser) {
    const [QueryResult] = await connection.execute(
      searchTrainer(undefined, undefined, data.trainerId),
    );

    if (user.role !== Role.TRAINEE) {
      throw new HttpException(
        'Unauthorized. Not a Trainee.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Trainer not found', HttpStatus.NOT_FOUND);
    }

    const [QueryResult2] = await connection.execute(
      searchConsultation(data.trainerId, undefined, data.date),
    );

    if ((QueryResult2 as RowDataPacket[]).length > 0) {
      throw new HttpException(
        'Trainer is not available at this time',
        HttpStatus.BAD_REQUEST,
      );
    }

    return connection.execute(
      createConsultation(data.trainerId, user.id, data.date),
    );
  }

  async getConsultations(user: JWTUser) {
    if (user.role === Role.TRAINEE) {
      const [QueryResult] = await connection.execute(
        searchConsultation(undefined, user.id, undefined),
      );
      return QueryResult;
    } else if (user.role === Role.TRAINER) {
      const [QueryResult] = await connection.execute(
        searchConsultation(user.id, undefined, undefined),
      );
      return QueryResult;
    }
  }

  async reviewProgress(data: ReviewProgressDto, user: JWTUser) {
    if (user.role !== Role.TRAINER) {
      throw new HttpException(
        'Unauthorized. Not a Trainer.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const [QueryResult] = await connection.execute(
      getUserGoals(data.traineeId),
    );

    return QueryResult;
  }

  async getTrainees(user: JWTUser) {
    if (user.role === Role.TRAINEE) {
      throw new HttpException(
        'Unauthorized. Not a Trainer.',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (user.role === Role.TRAINER) {
      const [QueryResult] = await connection.execute(getTraineesQuery(user.id));
      return QueryResult;
    }
  }

  async getWorkoutsCreatedByMe(user: JWTUser) {
    if (user.role === Role.TRAINEE) {
      throw new HttpException(
        'Unauthorized. Not a Trainer.',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (user.role === Role.TRAINER) {
      const [QueryResult] = await connection.execute(
        getWorkoutsCreatedByMe(user.id),
      );
      return QueryResult;
    }
  }

  async getTraineeProgress(user: JWTUser, traineeId: number) {
    if (user.role !== Role.TRAINER) {
      throw new HttpException(
        'Unauthorized. Not a Trainer.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const [QueryResult] = await connection.execute<RowDataPacket[]>(
      getUserGoals(traineeId),
    );

    if (QueryResult.length === 0) {
      throw new HttpException('Trainee not found', HttpStatus.NOT_FOUND);
    }

    const traineeProgress = {
      trainee_id: QueryResult[0].trainee_id,
      first_name: QueryResult[0].first_name,
      last_name: QueryResult[0].last_name,
      height: QueryResult[0].height,
      weight: QueryResult[0].weight,
      goals: QueryResult.map((row) => ({
        goal_title: row.goal_title,
        goal_type: row.goal_type,
        current_value: row.current_value,
        target: row.target,
        start_date: row.start_date,
        end_date: row.end_date,
      })),
      workouts: QueryResult.map((row) => ({
        workout_id: row.workout_id,
        workout_title: row.workout_title,
        workout_duration: row.workout_duration,
        calories_burned: row.calories_burned,
        workout_date: row.workout_date,
      })),
    };

    return traineeProgress;
  }
}
