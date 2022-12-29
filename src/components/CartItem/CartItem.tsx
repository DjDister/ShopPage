import React, { PureComponent } from "react";
import styles from "./CartItem.module.css";
import { connect, ConnectedProps } from "react-redux";
import { cartItem, currency } from "../../../types";
import { ReactComponent as RightArrow } from "./rightArrow.svg";
import { ReactComponent as LeftArrow } from "./leftArrow.svg";
import AttributeItem from "./AttributeItem";
import CounterButton from "./CounterButton";
interface Props extends PropsFromRedux {
  cartItem: cartItem;
  lastChild?: boolean;
  miniCart?: boolean;
}

type State = {
  showedPicture: number;
};

class CartItem extends PureComponent<Props, State> {
  state = {
    showedPicture: 0,
  };
  async componentDidMount() {}

  setNextPicture = () => {
    if (this.state.showedPicture + 1 < this.props.cartItem.gallery.length)
      this.setState((previousState) => ({
        showedPicture: previousState.showedPicture + 1,
      }));
  };

  setPreviousPicture = () => {
    if (this.state.showedPicture - 1 >= 0)
      this.setState((previousState) => ({
        showedPicture: previousState.showedPicture - 1,
      }));
  };

  render() {
    const priceByCurrentCurrency = this.props.cartItem.prices.find(
      (price) => price.currency.label === this.props.currency.label
    );
    const cartItem = this.props.cartItem;
    return (
      <>
        <div
          className={styles.cartItem}
          style={
            this.props.miniCart
              ? {}
              : this.props.lastChild
              ? {
                  borderBottom: "1px solid #E5E5E5",
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }
              : { borderTop: "1px solid #E5E5E5", paddingTop: "12px" }
          }
        >
          <div
            className={styles.cartItemsDetails}
            style={this.props.miniCart ? {} : { minWidth: "30%" }}
          >
            <div className={styles.titleContainer}>
              <div className={styles.title}>{cartItem.brand}</div>
              <div>{cartItem.name}</div>
            </div>
            <div className={styles.amount}>
              {priceByCurrentCurrency
                ? priceByCurrentCurrency.currency.symbol +
                  priceByCurrentCurrency.amount
                : ""}
            </div>
            {cartItem.attributes.map((attribute, index) => (
              <AttributeItem key={index} {...attribute} />
            ))}
          </div>
          <CounterButton cartItem={cartItem} miniCart={this.props.miniCart} />
          <div className={styles.imageContainer}>
            <img
              className={styles.cartItemImage}
              alt={cartItem.name}
              src={cartItem.gallery[this.state.showedPicture]}
            />
            {this.props.miniCart ? null : cartItem.gallery.length > 1 ? (
              <div className={styles.imageArrowsContainer}>
                <div
                  onClick={() => this.setPreviousPicture()}
                  className={styles.arrowButton}
                >
                  <LeftArrow />
                </div>
                <div
                  onClick={() => this.setNextPicture()}
                  className={styles.arrowButton}
                >
                  <RightArrow />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state: { currency: currency }) {
  const currency = state.currency;
  return {
    currency,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
