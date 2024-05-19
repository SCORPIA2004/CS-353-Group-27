import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGoalDto } from '@/src/goals/dto/create.dto';
import { Role } from '@/enum/role.enum';
import { connection } from '@/db';
import { RowDataPacket } from 'mysql2';
import { createGoal, getGoal, getUserGoals, updateGoalValue } from '@/db/goal.queries';
import { JWTUser } from '@/src/users/users.guard';
import { UpdateGoalDto } from '@/src/goals/dto/update.dto';
import { GetSuggestionDto } from '@/src/goals/dto/get.suggestion.dto';
import getSimpleDate from '@/utils/get.simple.date';
import { Goal } from '@/enum/goal.enum';
import { makeSuggestion } from '@/utils/make.suggestion';

@Injectable()
export class GoalsService {
  async create(data: CreateGoalDto, user: JWTUser) {
    if (user.role !== Role.USER) {
      throw new HttpException('Unauthorized. Not a User.', HttpStatus.UNAUTHORIZED);
    }
    const [QueryResult] = await connection.execute(createGoal(data.title, data.goal, 0, data.target, getSimpleDate(), data.endDate, user.id));

    return (QueryResult as RowDataPacket).insertId;
  }

  async getAll(user: JWTUser) {
    if (user.role !== Role.USER) {
      throw new HttpException('Unauthorized. Not a User.', HttpStatus.UNAUTHORIZED);
    }
    const [QueryResult] = await connection.execute(getUserGoals(user.id));

    return QueryResult
  }

  async update(data: UpdateGoalDto, user: JWTUser) {
    if (user.role !== Role.USER) {
      throw new HttpException('Unauthorized. Not a User.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(updateGoalValue(data.goalId, data.value));

    return QueryResult
  }

  async getSuggestion(query: GetSuggestionDto, user: JWTUser) {
    if (user.role !== Role.USER) {
      throw new HttpException('Unauthorized. Not a User.', HttpStatus.UNAUTHORIZED);
    }

    const [QueryResult] = await connection.execute(getGoal(query.goalId));
    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
    const goal = (QueryResult as RowDataPacket[])[0];
    const goal_difference = goal.current_value / goal.target * 100;
    const days_left = (goal.end_date.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    const goal_type = goal.goal;

    return makeSuggestion(goal_difference, days_left, goal_type);
  }
}
