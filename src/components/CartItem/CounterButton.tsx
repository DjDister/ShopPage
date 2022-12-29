import React, { PureComponent } from "react";
import styles from "./CartItem.module.css";
import { connect, ConnectedProps } from "react-redux";
import { cartItem, currency } from "../../../types";

import { changeAmountProduct, removeProduct } from "../../store/actionCreators";

// eslint-disable-next-line no-use-before-define
interface CounterButtonProps extends PropsFromRedux {
  cartItem: cartItem;
  miniCart?: boolean;
}

type State = {};

class CounterButton extends PureComponent<CounterButtonProps, State> {
  state = {
    showedPicture: 0,
  };

  render() {
    const cartItem = this.props.cartItem;
    return (
      <div
        className={styles.counterButtonContainer}
        style={
          this.props.miniCart
            ? {}
            : {
                justifySelf: "right",
                width: "90%",
                display: "flex",
                alignItems: "flex-end",
                marginRight: "10px",
              }
        }
      >
        <div
          onClick={() =>
            this.props.changeAmountProduct(
              cartItem,
              cartItem.amount ? cartItem.amount + 1 : 1
            )
          }
          className={styles.countButton}
        >
          +
        </div>
        <div style={{ width: "24px", textAlign: "center" }}>
          {cartItem.amount ? cartItem.amount : 1}
        </div>
        <div
          onClick={() =>
            cartItem.amount && cartItem.amount > 1
              ? this.props.changeAmountProduct(cartItem, cartItem.amount - 1)
              : this.props.removeProduct(cartItem)
          }
          className={styles.countButton}
        >
          -
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: { currency: currency }) {
  const currency = state.currency;
  return {
    currency,
  };
}

const connector = connect(mapStateToProps, {
  removeProduct,
  changeAmountProduct,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CounterButton);
