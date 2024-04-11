import * as bcrypt from 'bcrypt';

export const hashString = async (inputString: string) => {
  return await bcrypt.hash(inputString, 12);
};

export const compareString = async (inputString: string, hashedString: string) => {
  return await bcrypt.compare(inputString, hashedString);
};