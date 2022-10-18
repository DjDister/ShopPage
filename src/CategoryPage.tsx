import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";

import getProductsForCategory from "./utils/Queries/getProductsForCategory";
import Card from "./components/Card/Card";
import { ShoppingItem } from "../types";
interface CategoryPageProps extends RouteComponentProps<{ category: string }> {}

type CategoryPageState = {
  shopingItems: ShoppingItem[];
  cart: any;
};

class CategoryPage extends Component<CategoryPageProps, CategoryPageState> {
  state = {
    shopingItems: [],
    cart: [],
  };

  async componentDidMount() {
    const fetchedProducts = await getProductsForCategory(
      this.props.match.params.category
    );
    this.setState((previousState) => ({
      shopingItems: fetchedProducts,
      cart: previousState.cart,
    }));
  }

  async componentDidUpdate(prevProps: CategoryPageProps) {
    if (this.props !== prevProps) {
      const fetchedProducts = await getProductsForCategory(
        this.props.match.params.category
      );

      this.setState((previousState) => ({
        shopingItems: fetchedProducts,
        cart: previousState.cart,
      }));
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar pathName={this.props.location.pathname} />
        <div className="flexCenter">
          <div className="pageContainer">
            <div className="categoryName">
              {this.props.match.params.category.toUpperCase()}
            </div>
            <div className="gridCardContainer">
              {this.state.shopingItems.map((item: ShoppingItem, index) => (
                <Card item={item} key={index} />
              ))}
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default CategoryPage;
