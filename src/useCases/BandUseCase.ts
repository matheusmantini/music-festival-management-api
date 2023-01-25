import { BadRequestError } from "../errors/BadRequestError";
import { Band } from "../model/Band";
import { BandRepository } from "../repository/BandRepository";
import { CreateBandInputDTO } from "../types/createBandInput.dto";

export class BandUseCase {
  constructor(private bandRepository: BandRepository) {}

  public create = async (newBand: CreateBandInputDTO) => {
    const { name, musicGenre, responsible } = newBand;

    if (!name || !musicGenre || !responsible) {
      throw new BadRequestError(
        "Invalid entries. The 'name', 'musicGenre' and 'responsible' fields are required."
      );
    }

    const bandAlreadyExists = await this.bandRepository.getBandByNameOrId(name);

    if (bandAlreadyExists) {
      throw new BadRequestError(
        `Band with name '${name}' is already registered in the system`
      );
    }

    const band = new Band(name, musicGenre, responsible);

    const newCreatedUser = await this.bandRepository.create(band);

    return newCreatedUser;
  };

  public getBandByNameOrId = async (search: string) => {
    if (!search) {
      throw new BadRequestError(
        "Invalid entries. The search field is required with 'name' or 'id'."
      );
    }

    const band = await this.bandRepository.getBandByNameOrId(search);
    return band;
  };

  public getAllBands = async () => {
    const bands = await this.bandRepository.getAllBands();
    return bands;
  };
}
