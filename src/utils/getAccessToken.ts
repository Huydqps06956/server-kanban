import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();

interface TokenPayload {
  _id: Types.ObjectId;
  email: string;
  rule: number;
}

export const getAccessToken = async ({ _id, email, rule }: TokenPayload) => {
  try {
    const token = jwt.sign(
      { _id, email, rule },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    throw new Error("Error generating access token");
  }
};
