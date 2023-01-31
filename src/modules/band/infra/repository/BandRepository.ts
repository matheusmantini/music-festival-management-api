import { Band } from "../../domain/entities/Band";
import { client } from "../../../../shared/helpers/PrismaClient";

export class BandRepository {
  public create = async (band: Band) => {
    try {
      const newBand = {
        name: band.getName(),
        music_genre: band.getMusicGenre(),
        responsible: band.getReponsible(),
      };
      return await client.bands.create({ data: newBand });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getBandByNameOrId = async (search: string) => {
    try {
      const band = await client.bands.findFirst({
        where: { OR: [{ id: search }, { name: search }] },
      });

      return band;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllBands = async () => {
    try {
      const band = await client.bands.findMany();

      return band;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
