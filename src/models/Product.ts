export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  unit: Unit;
  favorite: boolean;
  brand: string;
  price: number;
  quantity: number;
  currency: Currency;
  entryDate: Date;
}

export enum Unit {
  KG = 'KG'
}

export enum Currency {
  AED = 'AED'
}
