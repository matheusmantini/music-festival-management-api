import { PhotoRepository } from "../../infra/repository/PhotoRepository";
import {ShowRepository} from "../../../show/infra/repository/ShowRepository"
import { Photo } from "../entities/Photo";
import { PhotoInputDTO } from "../dto/photoInput.dto";
import { BadRequestError, NotFoundError } from "../../../../shared/errors";

export class PhotoUseCase {
  constructor(
    private showRepository: ShowRepository,
    private photoRepository: PhotoRepository
  ) {}

  public insert = async (newPhoto: PhotoInputDTO) => {
    const { photo, showId } = newPhoto;

    if (!photo || !showId) {
      throw new BadRequestError(
        "Invalid entries! The 'photo' and 'showId' fields are required."
      );
    }

    const showAlreadyExists = await this.showRepository.getShowById(showId);

    if (!showAlreadyExists) {
      throw new NotFoundError("Show not found, make sure id is correct.");
    }

    const photoInput = new Photo(photo, showId);

    await this.photoRepository.insert(photoInput);
  };

  public getPhotosByShowId = async (showId: string) => {
    if (!showId || showId === ":showId") {
      throw new BadRequestError(
        "Invalid entry! The 'showId' param is required."
      );
    }

    const showAlreadyExists = await this.showRepository.getShowById(showId);

    if (!showAlreadyExists) {
      throw new NotFoundError("Show not found, make sure id is correct.");
    }

    const photosList = await this.photoRepository.getPhotosByShowId(showId);

    return photosList;
  };
}
