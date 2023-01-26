import express from "express";
import { PhotoController } from "../controller/PhotoController";
import { PhotoUseCase } from "../useCases/PhotoUseCase";
import { PhotoRepository } from "../repository/PhotoRepository";
import { ShowRepository } from "../repository/ShowRepository";

export const photoRouter = express.Router();

const photoUseCase = new PhotoUseCase(
  new ShowRepository(),
  new PhotoRepository()
);

const photoController = new PhotoController(photoUseCase);

photoRouter.post("/", photoController.addPhoto);
photoRouter.get("/:showId", photoController.getPhotosByShowId);
