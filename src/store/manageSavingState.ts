import { CartState } from "../../types";

export class StateLoader {
  loadState() {
    try {
      const savedState = localStorage.getItem("state");

      if (savedState === null) return this.initializeState();
      return JSON.parse(savedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state: CartState) {
    try {
      const savedState = JSON.stringify(state);
      localStorage.setItem("state", savedState);
    } catch (err) {
      console.log(err); // Log errors here, or ignore
    }
  }

  initializeState() {
    return {
      cart: [],
      currency: { label: "USD", symbol: "$" },
    };
  }
}
