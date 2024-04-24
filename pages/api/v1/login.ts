import { login } from "@/auth/backend/loginAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const auth = await login(email, password);
      if (!auth) res.status(401).json({ result: "Access Denied" });
      return res.status(200).json({ result: auth });
    } catch (err) {
      return res.status(400);
    }
  }
  return res.status(401);
};
