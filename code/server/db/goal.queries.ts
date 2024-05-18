import { Goal } from '@/enum/goal.enum';

export const createGoal = (
  title: string,
  goal: Goal,
  currentValue: number,
  target: number,
  startDate: string,
  endDate: string,
  userId: number,
) =>
  `INSERT INTO goals (title, goal, current_value ,target, start_date, end_date, user_id) VALUES ('${title}', '${goal}', ${currentValue}, ${target}, '${startDate}', '${endDate}', ${userId})`;

export const getUserGoals = (userId: number) => `
  SELECT 
    u.id AS trainee_id,
    u.first_name,
    u.last_name,
    t.height,
    t.weight,
    g.id AS goal_id,
    g.title AS goal_title,
    g.goal AS goal_type,
    g.current_value,
    g.target,
    g.start_date,
    g.end_date,
    uw.id AS workout_id,
    w.title AS workout_title,
    uw.duration AS workout_duration,
    uw.calories_burned,
    uw.date AS workout_date
  FROM 
    users u
  JOIN 
    trainee t ON u.id = t.id
  JOIN 
    goals g ON u.id = g.user_id
  LEFT JOIN 
    user_workout uw ON u.id = uw.user_id
  LEFT JOIN 
    workouts w ON uw.workout_id = w.id
  WHERE 
    u.id = ${userId}
  ORDER BY 
    uw.date DESC
`;



export const updateGoalValue = (goalId: number, value: number) =>
  `UPDATE goals SET current_value = ${value} WHERE id = ${goalId}`;

export const getGoal = (goalId: number) =>
  `SELECT * FROM goals WHERE id = ${goalId}`;
