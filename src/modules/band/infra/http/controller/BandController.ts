import { Request, Response } from "express";
import { CreateBandInputDTO } from "../../../domain/dto/createBandInput.dto";
import { BandUseCase } from "../../../domain/useCases/BandUseCase";

export class BandController {
  constructor(private bandUseCase: BandUseCase) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { name, musicGenre, responsible } = req.body;

      const newBand: CreateBandInputDTO = {
        name,
        musicGenre,
        responsible,
      };

      const bandCreated = await this.bandUseCase.create(newBand);
      res.status(201).send({
        message: "Band successfully registered",
        band: bandCreated,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public getBandByNameOrId = async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const band = await this.bandUseCase.getBandByNameOrId(search as string);

      res.status(201).send(band);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public getAllBands = async (req: Request, res: Response) => {
    try {
      const bands = await this.bandUseCase.getAllBands();

      res.status(201).send(bands);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}
