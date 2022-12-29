import React, { PureComponent } from "react";
import styles from "./CartOverlay.module.css";
import { connect, ConnectedProps } from "react-redux";
import { CartState } from "../../../types";
import cartItemsAmount from "../../utils/cartItemsAmount";
import totalCartPrice from "../../utils/totalCartPrice";
import { removeProduct } from "../../store/actionCreators";
import { NavLink } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

// eslint-disable-next-line no-use-before-define
interface Props extends PropsFromRedux {
  closeOverlay: (arg0: boolean) => void;
}

type State = {};

class CartOverlay extends PureComponent<Props, State> {
  async componentDidMount() {}

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.containerRelative}>
            <div className={styles.bagName}>
              <div style={{ fontWeight: 800, marginRight: 4 }}>My Bag, </div>
              {cartItemsAmount(this.props.cart)} items
            </div>
            {this.props.cart.length === 0 ? (
              <div className={styles.emptyCart}>CART IS EMPTY</div>
            ) : (
              this.props.cart.map((cartItem, index) => (
                <CartItem cartItem={cartItem} key={index} miniCart />
              ))
            )}
          </div>
          <div className={styles.checkoutContainer}>
            <div className={styles.totalAmount}>
              <div>Total</div>
              <div>
                {this.props.currency.symbol}
                {totalCartPrice(this.props.cart, this.props.currency)}
              </div>
            </div>
            <div className={styles.checkoutButtonsContainer}>
              <NavLink
                exact
                to={`/cart`}
                className={styles.button}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #1D1F22",
                }}
              >
                VIEW BAG
              </NavLink>
              <div
                className={styles.button}
                style={{ backgroundColor: "#5ECE7B", color: "white" }}
              >
                CHECK OUT
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => this.props.closeOverlay(true)}
          className={styles.wholePageCover}
        />
      </>
    );
  }
}

function mapStateToProps(state: CartState) {
  const cart = state.cart;
  const currency = state.currency;
  return {
    cart,
    currency,
  };
}
const connector = connect(mapStateToProps, {
  removeProduct,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartOverlay);
