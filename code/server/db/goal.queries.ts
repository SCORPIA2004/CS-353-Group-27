import { Goal } from '@/enum/goal.enum';

export const createGoal = (title: string, goal: Goal, currentValue: number, target: number, startDate: string, endDate: string, userId: number) =>
  `INSERT INTO goals (title, goal, current_value ,target, start_date, end_date, user_id) VALUES ('${title}', '${goal}', ${currentValue}, ${target}, '${startDate}', '${endDate}', ${userId})`;

export const getUserGoals = (userId: number) =>
  `SELECT * FROM goals WHERE user_id = ${userId}`


export const updateGoalValue = (goalId: number, value: number) =>
  `UPDATE goals SET current_value = ${value} WHERE id = ${goalId}`

export const getGoal = (goalId: number) =>
  `SELECT * FROM goals WHERE id = ${goalId}`