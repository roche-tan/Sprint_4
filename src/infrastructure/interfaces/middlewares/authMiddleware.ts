//request autentification and returns HTTP Status 401 if not found

import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = process.env.USER!; // ! in USER marks that variable should exist
  const key = process.env.PASSWORD!;
  const authHeader = req.headers.authorization;
  console.log("authMiddleware .env", user, key);

  if (authHeader) {
    const [type, credentials] = authHeader.split(" ");

    if (type === "Basic") {
      const [username, password] = Buffer.from(credentials, "base64")
        .toString("utf-8")
        .split(":");
      console.log("authMiddleware if", username, password);

      if (username === user && password === key) {
        next();

        return;
      }
    }
  }

  res.status(401).send("Unauthorized");
};

export default authMiddleware;
