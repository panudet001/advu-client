export interface Currency {
  id: string;
  name: string;
  symbol: string;
  rate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
