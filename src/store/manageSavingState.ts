import { CartState } from "../../types";

export class StateLoader {
  loadState() {
    try {
      let savedState = localStorage.getItem("http://localhost:3000:state");

      if (savedState === null) return this.initializeState();
      return JSON.parse(savedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state: CartState) {
    try {
      let savedState = JSON.stringify(state);
      localStorage.setItem("http://localhost:3000:state", savedState);
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
