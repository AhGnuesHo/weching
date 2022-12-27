import { Request, Response, NextFunction } from "express";
import path from "path";

export const indexRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.redirect("../../client/build/index.html");
  res.redirect("/api/main");
};
