import { cartItem, currency } from "../../types";

const totalCartPrice = (cart: cartItem[], currency: currency) => {
  const amount = cart.reduce((previousValue, currentValue) => {
    const priceByCurrentCurrency = currentValue.prices.find(
      (price) => price.currency.label === currency.label
    );
    return (
      previousValue +
      (priceByCurrentCurrency ? priceByCurrentCurrency.amount : 1) *
        (currentValue.amount ? currentValue.amount : 1)
    );
  }, 0);

  return Math.round(amount * 100) / 100;
};

export default totalCartPrice;
