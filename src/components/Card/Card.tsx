import React, { Component } from "react";
import styles from "./Card.module.css";
import { ShoppingItem } from "../../../types";
import { ReactComponent as CartSVG } from "./cart.svg";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { addProduct } from "../../store/actionCreators";
import { cartItem } from "../../../types";

// eslint-disable-next-line no-use-before-define
interface CardProps extends PropsFromRedux {
  item: ShoppingItem;
}

type CardState = {
  isHovering: boolean;
};

class Card extends Component<CardProps, CardState> {
  state = {
    isHovering: false,
  };

  render() {
    const onMouseEnter = () => {
      this.setState({ isHovering: true });
    };
    const onMouseLeave = () => {
      this.setState({ isHovering: false });
    };

    const addItemToCart = (item: ShoppingItem) => {
      const product: cartItem = {
        ...item,
        attributes: [
          ...item.attributes.map((attribute) => {
            return { ...attribute, chosenAttribute: attribute.items[0].id };
          }),
        ],
      };

      this.props.addProduct(product);
    };

    const priceByCurrentCurrency = this.props.item.prices.find(
      (price) => price.currency.label === this.props.currency.label
    );

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.card}
      >
        <NavLink
          className={styles.cardLink}
          exact
          to={`/product/${this.props.item.id}`}
        >
          <img
            className={styles.imageCard}
            src={this.props.item.gallery[0]}
            alt={this.props.item.name}
          />

          <div className={styles.nameContainerCard}>
            <div className={styles.productName}>
              {this.props.item.brand} {this.props.item.name}
            </div>
            <div className={styles.productPrice}>
              {priceByCurrentCurrency
                ? priceByCurrentCurrency.amount +
                  priceByCurrentCurrency.currency.symbol
                : ""}
            </div>
          </div>
        </NavLink>
        {this.state.isHovering && this.props.item.inStock && (
          <div
            onClick={() => addItemToCart(this.props.item)}
            className={styles.cartButton}
          >
            <CartSVG />
          </div>
        )}
        {!this.props.item.inStock ? (
          <>
            <div className={styles.outOfStockDiv} />
            <div className={styles.outOfStockText}>OUT OF STOCK</div>
          </>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state: {
  cart: cartItem[];
  currency: { label: string; symbol: string };
}) {
  const cart = state.cart;
  const currency = state.currency;
  return {
    cart,
    currency,
  };
}

const connector = connect(mapStateToProps, { addProduct });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Card);
