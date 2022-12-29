import React, { PureComponent } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./ProductPage.css";
import { connect, ConnectedProps } from "react-redux";
import { removeProduct } from "./store/actionCreators";
import { CartState } from "../types";
import CartItem from "./components/CartItem/CartItem";
import totalCartPrice from "././utils/totalCartPrice";
import cartItemsAmount from "././utils/cartItemsAmount";
import styles from "./CartPage.module.css";
import { RouteComponentProps } from "react-router-dom";
interface CartPageProps
  extends RouteComponentProps<{}>,
    // eslint-disable-next-line no-use-before-define
    PropsFromRedux {}

type CartPageState = {};

class CartPage extends PureComponent<CartPageProps, CartPageState> {
  state = {};

  render() {
    const cartPrice = totalCartPrice(this.props.cart, this.props.currency);
    return (
      <div className="container">
        <Navbar />
        <div className="flexCenter">
          <div className="pageContainerCart">
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
                  <div className={styles.flex}>
                    <div className={styles.textContainer}>Tax 21%:</div>
                    <div className={styles.text}>
                      {this.props.currency.symbol +
                        Math.round(cartPrice * 0.21 * 100) / 100}
                    </div>
                  </div>
                  <div className={styles.flex}>
                    <div className={styles.textContainer}>Quantity:</div>
                    <div className={styles.text}>
                      {cartItemsAmount(this.props.cart)}
                    </div>
                  </div>
                  <div className={styles.flex}>
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

function mapStateToProps(state: CartState) {
  return {
    cart: state.cart,
    currency: state.currency,
  };
}
const connector = connect(mapStateToProps, {
  removeProduct,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);
