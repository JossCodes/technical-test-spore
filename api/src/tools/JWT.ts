import jwt from "jsonwebtoken";
import Role from "../models/Role";

const TOKEN_DURATION_DAY_IN_SECONDS = 86400;
const SECRET = process.env.JWT_SECRET || "mysecret";

interface Payload {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export const generateToken = (payload: Payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: TOKEN_DURATION_DAY_IN_SECONDS,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
