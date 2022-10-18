import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./ProductPage.css";
import { connect, ConnectedProps } from "react-redux";
import {
  decreaseAmountProduct,
  increaseAmountProduct,
  removeProduct,
} from "./store/actionCreators";
import { cartItem } from "../types";
import CartItem from "./components/CartItem/CartItem";
import totalCartPrice from "././utils/totalCartPrice";
import cartItemsAmount from "././utils/cartItemsAmount";
import styles from "./CartPage.module.css";
interface CartPageProps
  // eslint-disable-next-line no-use-before-define
  extends PropsFromRedux {}

type CartPageState = {};

class CartPage extends Component<CartPageProps, CartPageState> {
  state = {};

  render() {
    const cartPrice = totalCartPrice(this.props.cart, this.props.currency);
    return (
      <div className="container">
        <Navbar />
        <div className="flexCenter">
          <div className="pageContainer">
            <div className="categoryName">CART</div>
            {this.props.cart.length === 0 ? (
              <div className={styles.emptyCart}>YOUR CART IS EMPTY</div>
            ) : (
              <>
                {this.props.cart.map((cartItem, index) => {
                  return (
                    <CartItem
                      cartItem={cartItem}
                      key={index}
                      lastChild={index === this.props.cart.length - 1}
                    />
                  );
                })}
                <div className={styles.cartDetails}>
                  <div style={{ display: "flex" }}>
                    <div className={styles.textContainer}>Tax 21%:</div>
                    <div className={styles.text}>
                      {this.props.currency.symbol +
                        Math.round(cartPrice * 0.21 * 100) / 100}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className={styles.textContainer}>Quantity:</div>
                    <div className={styles.text}>
                      {cartItemsAmount(this.props.cart)}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className={styles.textContainer}>Total:</div>{" "}
                    <div className={styles.text}>
                      {this.props.currency.symbol + cartPrice}
                    </div>
                  </div>
                  <div className={styles.orderButton}>ORDER</div>
                </div>
              </>
            )}
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
  return {
    cart: state.cart,
    currency: state.currency,
  };
}
const connector = connect(mapStateToProps, {
  increaseAmountProduct,
  decreaseAmountProduct,
  removeProduct,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);
