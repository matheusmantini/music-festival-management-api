import { ShowRepository } from "../../../show/infra/repository/ShowRepository";
import { TicketRepository } from "../../infra/repository/TicketRepository";
import { Ticket } from "../entities/Ticket";
import { Buy } from "../entities/Buy";
import { BuyTicketInputDTO } from "../dto/buyTicketInput.dto";
import { TicketInputDTO } from "../dto/ticketInput.dto";
import { BadRequestError, NotFoundError } from "../../../../shared/errors";

export class TicketUseCase {
  constructor(
    private ticketRepository: TicketRepository,
    private showRepository: ShowRepository
  ) {}

  public create = async (newTicket: TicketInputDTO) => {
    const { ticketName, price, totalQuantity, showId } = newTicket;

    if (!ticketName || !price || !totalQuantity || !showId) {
      throw new BadRequestError(
        "Invalid entries. The 'ticketName', 'price', 'totalQuantity' and 'showId' fields are required."
      );
    }

    const showAlreadyExists = await this.showRepository.getShowById(showId);

    if (!showAlreadyExists) {
      throw new NotFoundError("Show not found, make sure id is correct.");
    }

    const ticketAlreadyExists = await this.ticketRepository.getTicketByName(
      ticketName
    );

    if (ticketAlreadyExists) {
      throw new BadRequestError("Ticket already registered in the system");
    }

    let soldQuantity;

    const ticket = new Ticket(
      ticketName,
      price,
      totalQuantity,
      soldQuantity,
      showId
    );

    await this.ticketRepository.create(ticket);
  };

  public buy = async (newBuy: BuyTicketInputDTO) => {
    const { ticketName, ticketQuantity, userId } = newBuy;

    if (!ticketName || !ticketQuantity || !userId) {
      throw new BadRequestError(
        "Invalid entries. The 'ticketName', 'ticketQuantity' or 'userId' fields are required."
      );
    }

    const ticketAlreadyExists = await this.ticketRepository.getTicketByName(
      ticketName
    );

    if (!ticketAlreadyExists) {
      throw new NotFoundError(
        "Ticket not found, make sure name ticket is correct."
      );
    }

    if (ticketAlreadyExists.total_quantity < ticketQuantity) {
      throw new BadRequestError(
        `There are only ${ticketAlreadyExists.total_quantity} tickets available for this show`
      );
    }

    const buy = new Buy(ticketName, ticketQuantity, userId);

    await this.ticketRepository.buy(buy);

    const newTotalQuantity =
      ticketAlreadyExists.total_quantity - ticketQuantity;
    const newSoldQuantity = ticketAlreadyExists.sold_quantity + ticketQuantity;

    await this.ticketRepository.update({
      ticket_name: ticketName,
      total_quantity: newTotalQuantity,
      sold_quantity: newSoldQuantity,
    });
  };
}
