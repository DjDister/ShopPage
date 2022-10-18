import React, { Component } from "react";
import styles from "./CartItem.module.css";
import { connect, ConnectedProps } from "react-redux";
import { cartItem } from "../../../types";

import {
  decreaseAmountProduct,
  increaseAmountProduct,
  removeProduct,
} from "../../store/actionCreators";

import { ReactComponent as RightArrow } from "./rightArrow.svg";
import { ReactComponent as LeftArrow } from "./leftArrow.svg";
// eslint-disable-next-line no-use-before-define
interface Props extends PropsFromRedux {
  cartItem: cartItem;
  lastChild?: boolean;
  miniCart?: boolean;
}

type State = {
  showedPicture: number;
};

class CartItem extends Component<Props, State> {
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
              <div key={index} className="attributeContainer">
                <div className={styles.attributeName}>{attribute.id}:</div>
                <div className={styles.buttonsContainer}>
                  {attribute.items.map((item, index) => {
                    return attribute.type === "swatch" ? (
                      <div
                        key={index}
                        className={styles.swatchButtonBorder}
                        style={
                          attribute.chosenAttribute === item.id
                            ? { border: "2px solid #5ECE7B" }
                            : {}
                        }
                      >
                        <div
                          key={index}
                          className={styles.swatchButton}
                          style={{
                            backgroundColor: item.value,
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className={styles.attributeButton}
                        style={
                          attribute.chosenAttribute === item.id
                            ? {
                                backgroundColor: "black",
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
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
              onClick={() => this.props.increaseAmountProduct(cartItem)}
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
                  ? this.props.decreaseAmountProduct(cartItem)
                  : this.props.removeProduct(cartItem)
              }
              className={styles.countButton}
            >
              -
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.cartItemImage}
              alt={cartItem.name}
              src={cartItem.gallery[this.state.showedPicture]}
            />
            {this.props.miniCart ? null : (
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
            )}
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state: {
  currency: { label: string; symbol: string };
}) {
  const currency = state.currency;
  return {
    currency,
  };
}

const connector = connect(mapStateToProps, {
  decreaseAmountProduct,
  increaseAmountProduct,
  removeProduct,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
