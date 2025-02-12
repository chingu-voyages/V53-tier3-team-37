import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";
// import { CredentialType } from "@prisma/client";
import bcrypt from "bcrypt";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT Secret is not found");
}

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
    include: { credentials: true },
  });
};

export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  const hashedPassword = await encryptPassword(password);
  return await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      credentials: {
        create: {
          type: "PASSWORDHASH",
          value: hashedPassword,
        },
      },
    },
  });
};

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "4h" });
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      } else if (err.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      }
    }
    throw new Error("Token verification failed");
  }
};
