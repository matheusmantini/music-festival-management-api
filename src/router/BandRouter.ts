import express from "express";
import { BandController } from "../controller/BandController";
import { BandRepository } from "../repository/BandRepository";
import { BandUseCase } from "../useCases/BandUseCase";

export const bandRouter = express.Router();

const bandUseCase = new BandUseCase(new BandRepository());

const bandController = new BandController(bandUseCase);

bandRouter.post("/", bandController.create);
bandRouter.get("/", bandController.getBandByNameOrId);
bandRouter.get("/all", bandController.getAllBands);
