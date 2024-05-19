const SERVER_URL = 'http://localhost:3000';

const USERS_URL = `${SERVER_URL}/users`;
export const WORKOUTS_URL = `${SERVER_URL}/workouts`;

export const LOGIN_URL = `${USERS_URL}/login`;
export const REGISTER_URL = `${USERS_URL}/register`;

export const CHECK_TOKEN_URL = `${USERS_URL}/check-token`;

export const WORKOUT_LOG_URL = `${WORKOUTS_URL}/log`;

export const GET_CONSULTATIONS_URL = `${SERVER_URL}/training/consultation`;
export const GET_TRAINEES_URL = `${SERVER_URL}/training/trainees`;
export const GET_MY_WORKOUTS_URL = `${SERVER_URL}/training/workouts-created-by-me`;
export const GET_TRAINEE_PROGRESS_URL = `${SERVER_URL}/training/trainee-progress`;

export const GET_LEADERBOARD_URL = `${SERVER_URL}/leaderboard`;


export const DELETE_WORKOUT_URL = `${SERVER_URL}/training/workout`;

export const UPDATE_WORKOUT_URL = `${SERVER_URL}/training/workout`;

export const CREATE_WORKOUT_URL = `${SERVER_URL}/training/workout`;

export const GOALS_URL = `${SERVER_URL}/goals`;
export const UPDATE_GOALS_URL = `${GOALS_URL}/update`;
export const GOAL_SUGGESTION_URL = `${GOALS_URL}/suggestion`;

export const  TRAINERS_URL = `${SERVER_URL}/training`;
export const CONSULTATION_URL = `${TRAINERS_URL}/consultation`;
