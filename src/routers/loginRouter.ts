import { Router } from "express";
import { guestController } from "../controller";
import { asyncHandler } from "../utils";

export const loginRouter = Router();

loginRouter.post("/", asyncHandler(guestController.login));
