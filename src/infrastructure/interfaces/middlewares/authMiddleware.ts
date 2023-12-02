//request autentification and returns HTTP Status 401 if not found

import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic")) {
    return res.status(401).send("Unauthorized");
  }

  next();
};
