import express from "express";
import { ShowController } from "../controller/ShowController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { BandRepository } from "../repository/BandRepository";
import { ShowRepository } from "../repository/ShowRepository";
import { ShowUseCase } from "../useCases/ShowUseCase";

export const showRouter = express.Router();

const showUseCase = new ShowUseCase(new ShowRepository(), new BandRepository());

const showController = new ShowController(showUseCase);

showRouter.post("/", ensureAuthenticated, showController.create);
showRouter.get("/", showController.getShowsByDate);
