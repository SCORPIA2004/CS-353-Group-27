export const getLeaderboardQuery = () =>
  `
  SELECT 
    u.id, 
    u.first_name, 
    u.last_name, 
    u.dob,
    (COALESCE(completed_goals.completed_goal_count, 0) + COALESCE(workout_scores.total_workout_score, 0)) AS score
FROM 
    users u
LEFT JOIN 
    (
        SELECT 
            g.user_id,
            COUNT(g.id) AS completed_goal_count
        FROM 
            goals g
        WHERE 
            g.current_value >= g.target
        GROUP BY 
            g.user_id
    ) AS completed_goals ON u.id = completed_goals.user_id
LEFT JOIN 
    (
        SELECT 
            uw.user_id,
            SUM(
                CASE w.difficulty 
                    WHEN 'beginner' THEN 1
                    WHEN 'intermediate' THEN 2
                    WHEN 'advanced' THEN 3
                    ELSE 0
                END
            ) AS total_workout_score
        FROM 
            user_workout uw
        JOIN 
            workouts w ON uw.workout_id = w.id
        GROUP BY 
            uw.user_id
    ) AS workout_scores ON u.id = workout_scores.user_id
ORDER BY 
    score DESC
LIMIT 10;

  `;