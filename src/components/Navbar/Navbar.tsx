import React, { PureComponent } from "react";
import styles from "./Navbar.module.css";
import getCategories from "../../utils/Queries/getCategories";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as DownArrow } from "./downarrow.svg";
import { ReactComponent as UpArrow } from "./uparrow.svg";
import { ReactComponent as Cart } from "./cartNavbar.svg";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { CartState } from "../../../types";
import CartOverlay from "../CartOverlay/CartOverlay";
import cartItemsAmount from "../../utils/cartItemsAmount";
import getCurrencies from "../../utils/Queries/getCurrencies";
import { setCurrency } from "../../store/actionCreators";
import CurrenciesMenu from "../CurrenciesMenu/CurrenciesMenu";
// eslint-disable-next-line no-use-before-define
interface Props extends PropsFromRedux {
  pathName?: string;
}

type State = {
  categories: [] | string[];
  showCartOverlay: boolean;
  showCurrenciesMenu: boolean;
  currencies: [] | { label: string; symbol: string }[];
};

class Navbar extends PureComponent<Props, State> {
  state = {
    categories: [],
    showCartOverlay: false,
    showCurrenciesMenu: false,
    currencies: [{ label: "", symbol: "" }],
  };

  async componentDidMount() {
    const fetchedCategories = await getCategories();
    this.setState((previousState) => ({
      ...previousState,
      categories: fetchedCategories,
    }));
    const currencies = await getCurrencies();
    this.setState((previousState) => ({
      ...previousState,
      currencies: currencies,
      chosenCurrency: currencies[0],
    }));
  }

  closeOverlay = (shouldClose: boolean) => {
    if (shouldClose)
      this.setState((previousState) => ({
        ...previousState,
        showCartOverlay: false,
      }));
  };
  closeMenu = (shouldClose: Boolean) => {
    if (shouldClose)
      this.setState((previousState) => ({
        ...previousState,
        showCurrenciesMenu: false,
      }));
  };

  render() {
    return (
      <>
        <div className={styles.heightPageFixer} />
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.categoriesWrapper}>
              {this.state.categories.map((category: string, index) => (
                <NavLink
                  exact
                  to={category === "all" ? "/" : `/category/${category}`}
                  className={styles.categoryButton}
                  key={index}
                  activeClassName={styles.active}
                >
                  {category.toUpperCase()}
                </NavLink>
              ))}
            </div>
            <NavLink exact to={`/`}>
              <Logo />
            </NavLink>
            <div className={styles.rightContainer}>
              <div className={styles.rightWrapper}>
                <div
                  onClick={
                    this.state.showCartOverlay
                      ? () => null
                      : () =>
                          this.setState((previousState) => ({
                            ...previousState,
                            showCurrenciesMenu:
                              !previousState.showCurrenciesMenu,
                          }))
                  }
                  className={styles.currencyButtonContainer}
                  style={
                    this.state.showCartOverlay ? { cursor: "default" } : {}
                  }
                >
                  <div className={styles.currencySign}>
                    {this.props.currency.symbol}
                  </div>
                  {this.state.showCurrenciesMenu ? (
                    <div className={styles.marginLeft}>
                      <UpArrow />
                    </div>
                  ) : (
                    <div className={styles.marginLeft}>
                      <DownArrow />
                    </div>
                  )}
                </div>
                {this.state.showCurrenciesMenu ? (
                  <CurrenciesMenu closeMenu={this.closeMenu} />
                ) : null}
                <div className={styles.cartContainer}>
                  <div
                    onClick={
                      this.state.showCurrenciesMenu
                        ? () => null
                        : () =>
                            this.setState((previousState) => ({
                              ...previousState,
                              showCartOverlay: !previousState.showCartOverlay,
                            }))
                    }
                    className={styles.cartButton}
                    style={
                      this.state.showCurrenciesMenu ? { cursor: "default" } : {}
                    }
                  >
                    <Cart />
                    <div className={styles.cartItemsCounter}>
                      <div className={styles.counterAmount}>
                        {cartItemsAmount(this.props.cart)}
                      </div>
                    </div>
                  </div>
                  {this.state.showCartOverlay ? (
                    <CartOverlay closeOverlay={this.closeOverlay} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
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

const connector = connect(mapStateToProps, { setCurrency });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
