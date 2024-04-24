import { GetUserInfo } from "@/mongodb/crud";
import { ObjectId } from "mongodb";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function login(email: string, password: string) {
  console.log(0);
  const user = await GetUserInfo(email);
  console.log(1);
  console.log(user);
  if (!user) return false;
  console.log(2);
  const verifyPw = await bcrypt.compare(password, user.password);
  console.log(3);
  const token = await genJwtToken(user._id);
  console.log(token);
  return (await verifyPw) ? token : false;
}

async function genJwtToken(userId: ObjectId) {
  const jwtExpire: string = process.env.JWT_EXPIRES!;
  return await jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: jwtExpire,
  });
}
