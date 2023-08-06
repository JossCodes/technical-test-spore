import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../tools";

const AuthMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decodedToken = verifyToken(token);
      req.body.authorization = { user: decodedToken };
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};

export { AuthMiddleware };
