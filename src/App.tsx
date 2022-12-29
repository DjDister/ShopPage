import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import AllCategories from "./AllCategories";
class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <AllCategories {...props} />}
          />
          <Route
            exact
            path="/category/:category"
            render={(props) => <CategoryPage {...props} />}
          />
          <Route
            exact
            path="/product/:product"
            render={(props) => <ProductPage {...props} />}
          />
          <Route
            exact
            path="/cart"
            render={(props) => <CartPage {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
