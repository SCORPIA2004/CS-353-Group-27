import { Injectable, Query } from '@nestjs/common';
import { connection } from '@/db';
import { getLeaderboardQuery } from '@/db/leaderboard.queries';

@Injectable()
export class LeaderboardService {

  // returns an array of the top 10 users (id, first name, last name, gender ,dob) sorted by their score
  // score is calculated by the sum of the number of goals the user completed and the number
  // of workouts the user completed multiplied by its difficulty
  async getLeaderboard() {
    const [QueryResult] = await connection.execute(getLeaderboardQuery());
    return QueryResult;
  }
}
