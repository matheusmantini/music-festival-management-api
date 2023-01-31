import { Photos } from "@prisma/client";
import { Photo } from "../../domain/entities/Photo";
import { client } from "../../../../shared/helpers/PrismaClient";

export class PhotoRepository {
  protected static TABLE_NAME = "lama_photos";

  public insert = async (photoInput: Photo): Promise<void> => {
    try {
      const newPhoto = {
        photo: photoInput.getPhoto(),
        show_id: photoInput.getShowId(),
      };
      await client.photos.create({ data: newPhoto });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getPhotosByShowId = async (
    showId: string
  ): Promise<Photos[] | null> => {
    try {
      const photos = await client.photos.findMany({
        where: { show_id: showId },
      });

      return photos;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
