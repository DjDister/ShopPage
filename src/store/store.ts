import { createStore } from "redux";
import * as actionTypes from "./actionTypes";
import { CartState, cartItem } from "../../types";
import { StateLoader } from "./manageSavingState";
import { areObjectsEqual } from "../utils/areObjectEqual";

const initialState = {
  cart: [],
  currency: { label: "USD", symbol: "$" },
};

function cartReducer(
  state: CartState = initialState,
  action: { type: string; payload: any }
) {
  const isRecievedObjectThisStateObject = (object: cartItem) => {
    if (
      object.id === action.payload.id &&
      areObjectsEqual(object.attributes, action.payload.attributes)
    )
      return state.cart.find(
        (cartItem) =>
          cartItem.id === object.id &&
          areObjectsEqual(cartItem.attributes, object.attributes)
      );
    return undefined;
  };

  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        cart: state.cart.find(
          (cartItem) =>
            cartItem.id === action.payload.id &&
            areObjectsEqual(cartItem.attributes, action.payload.attributes)
        )
          ? [
              ...state.cart.map((cartItem) => {
                const recievedObjectInState =
                  isRecievedObjectThisStateObject(cartItem);
                return recievedObjectInState
                  ? {
                      ...recievedObjectInState,
                      amount: recievedObjectInState.amount
                        ? recievedObjectInState.amount + 1
                        : 1,
                    }
                  : cartItem;
              }),
            ]
          : [{ ...action.payload, amount: 1 }, ...state.cart],
      };
    case actionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            (cartItem) => !isRecievedObjectThisStateObject(cartItem)
          ),
        ],
      };
    case actionTypes.DECREASE_AMOUNT_PRODUCT:
      return {
        ...state,
        cart: [
          ...state.cart.map((cartItem) => {
            const recievedObjectInState =
              isRecievedObjectThisStateObject(cartItem);
            return recievedObjectInState
              ? {
                  ...recievedObjectInState,
                  amount: recievedObjectInState.amount
                    ? recievedObjectInState.amount - 1
                    : 1,
                }
              : cartItem;
          }),
        ],
      };

    case actionTypes.INCREASE_AMOUNT_PRODUCT:
      return {
        ...state,
        cart: [
          ...state.cart.map((cartItem) => {
            const recievedObjectInState =
              isRecievedObjectThisStateObject(cartItem);
            return recievedObjectInState
              ? {
                  ...recievedObjectInState,
                  amount: recievedObjectInState.amount
                    ? recievedObjectInState.amount + 1
                    : 1,
                }
              : cartItem;
          }),
        ],
      };
    //TODO if needed
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
      };
    case actionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
}

const stateLoader = new StateLoader();
const loadedState = stateLoader.loadState();
const store = createStore(cartReducer, loadedState);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

export default store;
