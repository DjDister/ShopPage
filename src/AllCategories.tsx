import React, { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import getProducts from "./utils/Queries/getProducts";
import Navbar from "./components/Navbar/Navbar";
import "./AllCategories.css";
import Card from "./components/Card/Card";
import { cartItem, CartState, ShoppingItem } from "../types";
import { RouteComponentProps } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
export interface AllCategoriesProps
  extends RouteComponentProps<{}>,
    PropsFromRedux {}

type State = {
  shopingItems: ShoppingItem[];
  cart: cartItem[];
};

class AllCategories extends PureComponent<AllCategoriesProps, State> {
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

function mapStateToProps(state: CartState) {
  const cart = state.cart;

  return {
    cart,
  };
}
const connector = connect(mapStateToProps);

export default connector(AllCategories);

type PropsFromRedux = ConnectedProps<typeof connector>;
