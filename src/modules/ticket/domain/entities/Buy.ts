export class Buy {

    constructor (
        private nameTicket: string,
        private ticketQuantity: number,
        private userId: string
    ) {}

    public getTicketQuantity = (): number => {
        return this.ticketQuantity
    }

    public getNameTicket = (): string => {
        return this.nameTicket
    }

    public getUserId = (): string => {
        return this.userId
    }

    static toBuyModel = (buy: any): Buy => {
        return new Buy (
            buy.ticket_quantity,
            buy.name_ticket,
            buy.user_id
        )
    }
}