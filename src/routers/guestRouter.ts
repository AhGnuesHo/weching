import { Router } from "express";
import { guestController } from "../controller";
import { checkName, updateHandler } from "../middlewares";
import { asyncHandler } from "../utils";

export const guestRouter = Router();

guestRouter.post(
  "/",
  checkName,
  updateHandler,
  asyncHandler(guestController.register)
);
