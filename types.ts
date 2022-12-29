export type ShoppingItem = {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  attributes: {
    id: string;
    name: string;
    type: string;
    items: { displayValue: string; value: string; id: string }[];
  }[];
  prices: {
    amount: number;
    currency: currency;
  }[];
};

export type currency = {
  label: string;
  symbol: string;
};

export type state = {
  cart: cartItem[];
  currency: currency;
};
export interface cartItem extends ShoppingItem {
  attributes: {
    id: string;
    name: string;
    type: string;
    items: { displayValue: string; value: string; id: string }[];
    chosenAttribute: string;
  }[];
  amount?: number;
}

export type CartState = {
  cart: cartItem[];
  currency: currency;
};
