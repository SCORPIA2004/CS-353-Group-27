import { Injectable, Query } from '@nestjs/common';
import { connection } from '@/db';
import { getLeaderboardQuery } from '@/db/leaderboard.queries';
import { RowDataPacket } from 'mysql2';

@Injectable()
export class LeaderboardService {

  // returns an array of the top 10 users (id, first name, last name, gender ,dob) sorted by their score
  // score is calculated by the sum of the number of goals the user completed and the number
  // of workouts the user completed multiplied by its difficulty
  async getLeaderboard() {
    const query = getLeaderboardQuery();
    const [rows] = await connection.execute<RowDataPacket[]>(query);
    return rows;
  }
}