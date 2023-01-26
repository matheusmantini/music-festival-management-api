import express from "express";
import { PhotoController } from "../controller/PhotoController";
import { PhotoUseCase } from "../useCases/PhotoUseCase";
import { PhotoRepository } from "../repository/PhotoRepository";
import { ShowRepository } from "../repository/ShowRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const photoRouter = express.Router();

const photoUseCase = new PhotoUseCase(
  new ShowRepository(),
  new PhotoRepository()
);

const photoController = new PhotoController(photoUseCase);

photoRouter.post("/", ensureAuthenticated, photoController.addPhoto);
photoRouter.get("/:showId", ensureAuthenticated, photoController.getPhotosByShowId);
