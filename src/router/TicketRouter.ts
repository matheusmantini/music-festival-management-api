import express from "express";
import { TicketUseCase } from "../useCases/TicketUseCase";
import { TicketController } from "../controller/TicketController";
import { ShowRepository } from "../repository/ShowRepository";
import { TicketRepository } from "../repository/TicketRepository";

export const ticketRouter = express.Router();

const ticketBusiness = new TicketUseCase(
  new TicketRepository(),
  new ShowRepository()
);

const ticketController = new TicketController(ticketBusiness);

ticketRouter.post("/", ticketController.create);
ticketRouter.post("/purchase", ticketController.buy);
