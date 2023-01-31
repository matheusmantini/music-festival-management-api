import express from "express";
import { BandController } from "../controller/BandController";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";
import { validateAdmin } from "../../../../../shared/middlewares/validateAdmin";
import { BandRepository } from "../../repository/BandRepository";
import { BandUseCase } from "../../../domain/useCases/BandUseCase";

export const bandRoutes = express.Router();

const bandUseCase = new BandUseCase(new BandRepository());

const bandController = new BandController(bandUseCase);

bandRoutes.post("/", ensureAuthenticated, validateAdmin, bandController.create);
bandRoutes.get("/", bandController.getBandByNameOrId);
bandRoutes.get("/all", bandController.getAllBands);
