import express from "express"
import { ShowController } from "../controller/ShowController"
import { BandRepository } from "../repository/BandRepository"
import { ShowRepository } from "../repository/ShowRepository"
import { ShowUseCase } from "../useCases/ShowUseCase"

export const showRouter = express.Router()

const showUseCase = new ShowUseCase(
    new ShowRepository(),
    new BandRepository(),
)

const showController = new ShowController(
    showUseCase
)

showRouter.post("/", showController.create)
showRouter.get("/", showController.getShowsByDate)