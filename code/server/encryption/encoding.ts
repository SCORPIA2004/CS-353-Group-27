import { sign, verify } from 'jsonwebtoken'
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;

export const encode = (data: any) => {
  return sign(data, secretKey);
}

export const decode = (token: any) => {
  try {
    return verify(token, secretKey);
  } catch (err) {
    console.error('Token decoding failed:', err.message);
    return null;
  }
}