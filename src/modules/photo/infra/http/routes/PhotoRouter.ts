import express from "express";
import { PhotoController } from "../controller/PhotoController";
import { PhotoUseCase } from "../../../domain/useCases/PhotoUseCase";
import { PhotoRepository } from "../../repository/PhotoRepository";
import { ShowRepository } from "../../../../show/infra/repository/ShowRepository";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";

export const photoRoutes = express.Router();

const photoUseCase = new PhotoUseCase(
  new ShowRepository(),
  new PhotoRepository()
);

const photoController = new PhotoController(photoUseCase);

photoRoutes.post("/", ensureAuthenticated, photoController.addPhoto);
photoRoutes.get(
  "/:showId",
  ensureAuthenticated,
  photoController.getPhotosByShowId
);
