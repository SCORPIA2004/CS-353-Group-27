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



