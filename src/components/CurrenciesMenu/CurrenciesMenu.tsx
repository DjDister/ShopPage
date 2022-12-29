import React, { PureComponent } from "react";
import styles from "./CurrenciesMenu.module.css";
import { connect, ConnectedProps } from "react-redux";
import { cartItem } from "../../../types";

import { removeProduct, setCurrency } from "../../store/actionCreators";
import getCurrencies from "../../utils/Queries/getCurrencies";

// eslint-disable-next-line no-use-before-define
interface Props extends PropsFromRedux {
  closeMenu: (arg0: boolean) => void;
}

type State = {
  currencies: [] | { label: string; symbol: string }[];
};

class CurrenciesMenu extends PureComponent<Props, State> {
  state = {
    currencies: [{ label: "", symbol: "" }],
  };
  async componentDidMount() {
    const currencies = await getCurrencies();
    this.setState((previousState) => ({
      ...previousState,
      currencies: currencies,
    }));
  }

  render() {
    return (
      <>
        <div className={styles.currenciesContainer}>
          {this.state.currencies.length > 0
            ? this.state.currencies.map((currency, index) => (
                <div
                  onClick={() => {
                    this.setState((previousState) => ({
                      ...previousState,
                      chosenCurrency: currency,
                    }));
                    this.props.closeMenu(true);
                    this.props.setCurrency(currency);
                  }}
                  style={index % 2 !== 0 ? { backgroundColor: "#EEEEEE" } : {}}
                  key={index}
                  className={styles.currencyButton}
                >
                  <div style={{ marginRight: 4 }}>{currency.symbol}</div>
                  {currency.label}
                </div>
              ))
            : null}
        </div>
        <div
          onClick={() => this.props.closeMenu(true)}
          className={styles.wholePageCover}
        />
      </>
    );
  }
}

function mapStateToProps(state: { cart: cartItem[] }) {
  return { cart: state.cart };
}

const connector = connect(mapStateToProps, {
  removeProduct,
  setCurrency,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrenciesMenu);
