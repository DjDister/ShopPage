import { cartItem } from "../../types";
import * as actionTypes from "./actionTypes";

export const addProduct = (product: cartItem) => {
  return { type: actionTypes.ADD_PRODUCT, payload: product };
};

export const removeProduct = (product: cartItem) => {
  return { type: actionTypes.REMOVE_PRODUCT, payload: product };
};

export const decreaseAmountProduct = (product: cartItem) => {
  return { type: actionTypes.DECREASE_AMOUNT_PRODUCT, payload: product };
};

export const increaseAmountProduct = (product: cartItem) => {
  return { type: actionTypes.INCREASE_AMOUNT_PRODUCT, payload: product };
};

//TODO if needed
export const updateProduct = (
  indexOfProductInCart: number,
  updatedProductProperty: Partial<cartItem>
) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: { indexOfProductInCart, updatedProductProperty },
  };
};

export const setCurrency = (currency: { label: string; symbol: string }) => {
  return { type: actionTypes.SET_CURRENCY, payload: currency };
};
