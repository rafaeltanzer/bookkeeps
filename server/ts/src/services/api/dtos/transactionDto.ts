export interface TransactionDto{
    id: string,
    title: string,
    amount: number,
    category: string,
    date: Date,
    accountName: string,
    outgoing: boolean,
}

export class CTransactionDto implements TransactionDto{
    
    /**
     *
     */
     constructor(id: string, title: string, amount: number, category: string, date: Date, accountName: string, outgoing: boolean) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.accountName = accountName;
        this.outgoing = outgoing;
    }

    id: string;
    title: string;
    amount: number;
    category: string;
    date: Date;
    accountName: string;
    outgoing: boolean;

}