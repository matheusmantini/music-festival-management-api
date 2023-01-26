import { Request, Response } from "express";
import { ShowInputDTO } from "../types/showInput.dto";
import { ShowUseCase } from "../useCases/ShowUseCase";

class ShowController {
  constructor(private showUseCase: ShowUseCase) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { bandId, weekDay, startTime, endTime } = req.body;

      const newShow: ShowInputDTO = {
        bandId,
        weekDay,
        startTime,
        endTime,
      };

      await this.showUseCase.create(newShow);

      res.status(201).send({ message: "Show successfully registered" });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public getShowsByDate = async (req: Request, res: Response) => {
    try {
      const { weekDay } = req.query;
      const shows = await this.showUseCase.getShowsByDate(weekDay as string);

      res.status(201).send(shows);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}

export { ShowController };
