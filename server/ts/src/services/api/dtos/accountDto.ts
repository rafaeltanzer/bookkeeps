import { TransactionDto } from "./transactionDto";

export interface AccountDto{
    title: string,
    incomingAmount: number,
    outgoingAmount: number,
    actualAmount: number,
    userEmail: string,
    transactions: TransactionDto[]
}