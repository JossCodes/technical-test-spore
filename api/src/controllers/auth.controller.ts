import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from "../tools";

const AuthController = {
  register: async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      const { name, email, password, role } = req.body;

      // Verify if all params are provided
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          error:
            "Missing params, you have to provide a name, an email, a password and a role to create a user. Verify and try again.",
        });
      }

      // Verify if the user already exists
      if (await User.findOne({ where: { email } })) {
        return res.status(400).json({
          error: `A user with the email '${email}' already exists`,
        });
      }

      // Create the user
      const userRole = await Role.findOne({ where: { name: role } });
      if (!userRole) {
        return res.status(400).json({ error: "Role not found" });
      }
      // Hash the password
      const hashedPassword = hashPassword(password);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: userRole.id,
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email,
        name,
        role: userRole,
      });

      // Return success response with token
      return res
        .status(200)
        .json({ message: "User created succesfully", data: { token } });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  login: async (req: Request, res: Response): Promise<Response<string>> => {
    try {
      const { email, password } = req.body;

      // Verify if all params are provided
      if (!email || !password) {
        return res.status(400).json({
          error:
            "Missing params, you have to provide an email and a password to login. Verify and try again.",
        });
      }

      // Verify if the user exists
      const user = await User.findOne({
        where: { email },
        include: { model: Role, as: "role" },
      });
      if (!user) {
        return res.status(400).json({
          error: `A user with the email '${email}' doesn't exists`,
        });
      }

      // Verify if the password is correct
      const isPasswordCorrect = comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      if (!user.role) {
        return res.status(400).json({
          error: "User doesn't have a role, please contact the administrator",
        });
      }

      // Generate token
      const token = generateToken({
        id: user.id,
        email,
        name: user.name,
        role: user.role,
      });

      // Return success response with token
      return res
        .status(200)
        .json({ message: "Login success", data: { token } });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  verifyIfTokenIsValid: async (
    req: Request,
    res: Response
  ): Promise<Response<string>> => {
    try {
      // Verify if token is valid and if has not expired
      const { token } = req.body;
      if (!token) return res.status(400).json({ error: "Missing token" });
      const decodedToken = verifyToken(token);
      if (!decodedToken)
        return res.status(400).json({ error: "Invalid token" });

      return res.status(200).json({ message: "Token is valid" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export { AuthController };
