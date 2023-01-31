import express from "express";
import { TicketUseCase } from "../../../domain/useCases/TicketUseCase";
import { TicketController } from "../controller/TicketController";
import { ShowRepository } from "../../../../show/infra/repository/ShowRepository";
import { TicketRepository } from "../../repository/TicketRepository";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";
import { validateAdmin } from "../../../../../shared/middlewares/validateAdmin";

export const ticketRoutes = express.Router();

const ticketBusiness = new TicketUseCase(
  new TicketRepository(),
  new ShowRepository()
);

const ticketController = new TicketController(ticketBusiness);

ticketRoutes.post(
  "/",
  ensureAuthenticated,
  validateAdmin,
  ticketController.create
);
ticketRoutes.post("/purchase", ensureAuthenticated, ticketController.buy);
