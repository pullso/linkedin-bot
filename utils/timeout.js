import dotenv from 'dotenv';

dotenv.config();

export const RANDOM_MAX_TIMEOUT = parseInt(process.env.RANDOM_MAX_TIMEOUT) || 5000;

export async function randomTimeout(maxTimeout = RANDOM_MAX_TIMEOUT) {
  const timeout = Math.floor(Math.random() * maxTimeout) + 1;
  return new Promise(resolve => setTimeout(resolve, timeout));
}
