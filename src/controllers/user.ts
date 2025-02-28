import UserModel from "../models/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getAccessToken } from "../utils/getAccessToken";
import { generatorRandomText } from "../utils/generatorRandomText";
export const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, name, password } = body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error(`Tài khoản đã tồn tại`);
    }

    if (!password) {
      throw new Error("Password is required");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    body.password = hashPassword;

    const newUser: any = new UserModel(body);
    await newUser.save();
    delete newUser._doc.password;

    res.status(200).json({
      message: "User registered successfully",
      data: {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      throw new Error(`Tài khoản không tồn tại`);
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    delete user._doc.password;

    res.status(200).json({
      message: "Login successfully",
      data: {
        ...user._doc,
        token: await getAccessToken({
          _id: user._id,
          email: user.email,
          rule: user.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const logInWithGoogle = async (req: any, res: any) => {
  const body = req.body;
  const { email, name } = body;
  try {
    const user: any = await UserModel.findOne({ email });
    if (user) {
      delete user._doc.password;
      res.status(200).json({
        message: "Login successfully",
        data: {
          ...user._doc,
          token: await getAccessToken({
            _id: user._id,
            email: user.email,
            rule: user.rule ?? 1,
          }),
        },
      });
    } else {
      const hashPassword = await bcrypt.hash(generatorRandomText(6), 10);
      body.password = hashPassword;

      const newUser: any = new UserModel(body);
      await newUser.save();
      delete newUser._doc.password;

      res.status(200).json({
        message: "User registered successfully",
        data: {
          ...newUser._doc,
          token: await getAccessToken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1,
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
