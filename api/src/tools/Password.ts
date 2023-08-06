import bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
