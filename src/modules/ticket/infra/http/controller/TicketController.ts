import { Request, Response } from "express";
import { TicketUseCase } from "../../../domain/useCases/TicketUseCase";
import { BuyTicketInputDTO } from "../../../domain/dto/buyTicketInput.dto";
import { TicketInputDTO } from "../../../domain/dto/ticketInput.dto";

export class TicketController {
  constructor(private ticketUseCase: TicketUseCase) {}

  public create = async (req: Request, res: Response) => {
    try {
      const { ticketName, price, totalQuantity, showId } = req.body;

      const newTicket: TicketInputDTO = {
        ticketName,
        price,
        totalQuantity,
        showId,
      };

      await this.ticketUseCase.create(newTicket);

      res.status(201).send({ message: "Ticket successfully registered" });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };

  public buy = async (req: Request, res: Response) => {
    try {
      const { ticketName, ticketQuantity, userId } = req.body;

      const newBuy: BuyTicketInputDTO = {
        ticketName,
        ticketQuantity,
        userId,
      };

      await this.ticketUseCase.buy(newBuy);

      res.status(201).send({ message: "Successful purchase" });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  };
}
