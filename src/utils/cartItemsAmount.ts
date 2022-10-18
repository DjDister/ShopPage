import { cartItem } from "../../types";

const cartItemsAmount = (cart: cartItem[]) => {
  return cart.reduce(
    (previousValue, currentValue) =>
      previousValue + (currentValue.amount ? currentValue.amount : 1),
    0
  );
};

export default cartItemsAmount;
