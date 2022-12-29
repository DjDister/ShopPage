import { cartItem, currency } from "../../types";
import * as actionTypes from "./actionTypes";

export const addProduct = (product: cartItem) => {
  return { type: actionTypes.ADD_PRODUCT, payload: product };
};

export const removeProduct = (product: cartItem) => {
  return { type: actionTypes.REMOVE_PRODUCT, payload: product };
};

export const setCurrency = (currency: currency) => {
  return { type: actionTypes.SET_CURRENCY, payload: currency };
};

export const changeAmountProduct = (product: cartItem, newAmount: number) => {
  return {
    type: actionTypes.CHANGE_AMOUNT_PRODUCT,
    payload: { cartItem: product, newAmount: newAmount },
  };
};
