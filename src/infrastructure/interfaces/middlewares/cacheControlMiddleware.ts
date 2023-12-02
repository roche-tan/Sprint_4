import { Request, Response, NextFunction } from "express";

export const cacheControlMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
};
