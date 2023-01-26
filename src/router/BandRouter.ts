import express from "express";
import { BandController } from "../controller/BandController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { validateAdmin } from "../middlewares/validateAdmin";
import { BandRepository } from "../repository/BandRepository";
import { BandUseCase } from "../useCases/BandUseCase";

export const bandRouter = express.Router();

const bandUseCase = new BandUseCase(new BandRepository());

const bandController = new BandController(bandUseCase);

bandRouter.post("/", ensureAuthenticated, validateAdmin, bandController.create);
bandRouter.get("/", bandController.getBandByNameOrId);
bandRouter.get("/all", bandController.getAllBands);
