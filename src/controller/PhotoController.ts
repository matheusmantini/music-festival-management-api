import { Request, Response } from "express";
import { PhotoUseCase } from "../useCases/PhotoUseCase";
import { PhotoInputDTO } from "../types/photoInput.dto";

export class PhotoController {
  constructor(private photoUseCase: PhotoUseCase) {}

  public addPhoto = async (req: Request, res: Response) => {
    try {
      const { photo, showId } = req.body;

      const newPhoto: PhotoInputDTO = {
        photo,
        showId,
      };

      await this.photoUseCase.insert(newPhoto);

      res.status(201).send({ message: "Photo successfully inserted" });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public getPhotosByShowId = async (req: Request, res: Response) => {
    try {
      const { showId } = req.params;

      const photosList = await this.photoUseCase.getPhotosByShowId(showId);

      res.status(200).send({ photosList });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}
