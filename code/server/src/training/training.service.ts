import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connection } from '@/db';
import { searchTrainersDto } from '@/src/training/dto/search.dto';
import { createConsultation, searchConsultation, searchTrainer } from '@/db/training.queries';
import { ScheduleConsultationDto } from '@/src/training/dto/schedule.dto';
import { JWTUser } from '@/src/users/users.guard';
import { RowDataPacket } from 'mysql2';
import { Role } from '@/enum/role.enum';
import { ReviewProgressDto } from '@/src/training/dto/review.progress.dto';
import { getUserGoals } from '@/db/goal.queries';
import { getTraineesQuery } from '@/db/training.queries';

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
      console.log(QueryResult);
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
    } 
    else if (user.role === Role.TRAINER) {
      const [QueryResult] = await connection.execute(
        getTraineesQuery(user.id),
      );
      return QueryResult;
    }
  }
}
