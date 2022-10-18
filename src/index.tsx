import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/category/:category" component={CategoryPage} />
          <Route
            exact
            path="/product/:product"
            render={(props) => <ProductPage {...props} />}
          />
          <Route exact path="/cart" component={CartPage} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
