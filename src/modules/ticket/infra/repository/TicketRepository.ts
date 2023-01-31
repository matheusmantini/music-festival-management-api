import { Buy } from "../../domain/entities/Buy";
import { Ticket } from "../../domain/entities/Ticket";
import { client } from "../../../../shared/helpers/PrismaClient";
import { UpdateTicketInputDTO } from "../../domain/dto/updateTicketInput.dto";

export class TicketRepository {
  public create = async (ticket: Ticket) => {
    try {
      const newTicket = {
        ticket_name: ticket.getTicketName(),
        price: ticket.getPrice(),
        total_quantity: ticket.getTotalQuantity(),
        sold_quantity: ticket.getSoldQuantity(),
        show_id: ticket.getShowId(),
      };
      return await client.tickets.create({ data: newTicket });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getTicketByName = async (name: string) => {
    try {
      const ticket = await client.tickets.findFirst({
        where: { ticket_name: name },
      });

      return ticket;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public update = async (newTicketData: UpdateTicketInputDTO) => {
    try {
      await client.tickets.update({
        where: {
          ticket_name: newTicketData.ticket_name,
        },
        data: { ...newTicketData },
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buy = async (buy: Buy) => {
    try {
      const ticketToBuy = {
        name_ticket: buy.getNameTicket(),
        ticket_quantity: buy.getTicketQuantity(),
        user_id: buy.getUserId(),
      };
      return await client.soldTickets.create({ data: ticketToBuy });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
