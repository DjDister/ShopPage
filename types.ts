export type ShoppingItem = {
  id: any;
  name: any;
  brand: any;
  inStock: any;
  gallery: any[];
  description: any;
  attributes: {
    id: any;
    name: string;
    type: string;
    items: { displayValue: any; value: any; id: any }[];
  }[];
  prices: {
    amount: any;
    currency: {
      label: any;
      symbol: any;
    };
  }[];
};

export interface cartItem extends ShoppingItem {
  attributes: {
    id: any;
    name: string;
    type: string;
    items: { displayValue: any; value: any; id: any }[];
    chosenAttribute: any;
  }[];
  amount?: number;
}

export type CartState = {
  cart: cartItem[];
  currency: { label: string; symbol: string };
};
