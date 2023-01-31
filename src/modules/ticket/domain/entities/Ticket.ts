export class Ticket {

    constructor (
        private ticketName: string,
        private price: number,
        private totalQuantity: number,
        private soldQuantity: number = 0,
        private showId: string
    ) {}
    
    public getTicketName = () => {
        return this.ticketName
    }

    public getPrice = () => {
        return this.price
    }

    public getTotalQuantity = () => {
        return this.totalQuantity
    }

    public getSoldQuantity = () => {
        return this.soldQuantity
    }

    public getShowId = () => {
        return this.showId
    }

    static toTicketModel(ticket: any): Ticket {
        return new Ticket(
            ticket.ticket_name,
            ticket.price,
            ticket.total_quantity,
            ticket.sold_quantity,
            ticket.show_id
        )
    }
}