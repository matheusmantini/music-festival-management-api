import express from "express";
import { ShowController } from "../controller/ShowController";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";
import { BandRepository } from "../../../../band/infra/repository/BandRepository";
import { ShowRepository } from "../../repository/ShowRepository";
import { ShowUseCase } from "../../../domain/useCases/ShowUseCase";

export const showRoutes = express.Router();

const showUseCase = new ShowUseCase(new ShowRepository(), new BandRepository());

const showController = new ShowController(showUseCase);

showRoutes.post("/", ensureAuthenticated, showController.create);
showRoutes.get("/", showController.getShowsByDate);
