import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import getProducts from "./utils/Queries/getProducts";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Card from "./components/Card/Card";
import { ShoppingItem } from "../types";
import { cartItem } from "../types";

// eslint-disable-next-line no-use-before-define
interface Props extends PropsFromRedux {}

type State = {
  shopingItems: ShoppingItem[];
  cart: any;
};

class App extends Component<Props, State> {
  state = {
    shopingItems: [],
    cart: [],
  };

  async componentDidMount() {
    const fetchedProducts = await getProducts();
    if (fetchedProducts) {
      this.setState((previousState) => ({
        shopingItems: fetchedProducts,
        cart: previousState.cart,
      }));
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="flexCenter">
          <div className="pageContainer">
            <div className="categoryName">ALL</div>
            <div className="gridCardContainer">
              {this.state.shopingItems.map((item: ShoppingItem, index) => (
                <Card item={item} key={index} />
              ))}
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: {
  cart: cartItem[];
  currency: { label: string; symbol: string };
}) {
  const cart = state.cart;

  return {
    cart,
  };
}
const connector = connect(mapStateToProps);

export default connector(App);

type PropsFromRedux = ConnectedProps<typeof connector>;
