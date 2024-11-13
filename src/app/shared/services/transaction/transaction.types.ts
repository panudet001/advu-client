import { Pagination } from "@shared/types/core.types";

import { User } from "../user/user.types";

export interface TransactionPagination {
  pagination: Pagination;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: number;
  user: User;
  fromAddress: string;
  toAddress: string;
  amount: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
}
