import React, { Component } from "react";

import Navbar from "./components/Navbar/Navbar";
import { RouteComponentProps } from "react-router-dom";
import "./ProductPage.css";

import getProductById from "./utils/Queries/getProductById";
import parse from "html-react-parser";
import { cartItem } from "../types";
import { connect, ConnectedProps } from "react-redux";
import { addProduct } from "./store/actionCreators";

interface ProductPageProps
  extends RouteComponentProps<{ product: string }>,
    // eslint-disable-next-line no-use-before-define
    PropsFromRedux {}

type ProductPageState = {
  product: cartItem;
  isLoading: boolean;
  chosenPicture: number;
};

class ProductPage extends Component<ProductPageProps, ProductPageState> {
  state = {
    product: {
      id: "",
      name: "",
      brand: "",
      inStock: "",
      description: "",
      gallery: [],
      attributes: [
        {
          id: "",
          type: "",
          name: "",
          items: [{ value: "", id: "", displayValue: "" }],
          chosenAttribute: "",
        },
      ],
      prices: [
        {
          amount: "",
          currency: {
            label: "",
            symbol: "",
          },
        },
      ],
    },
    isLoading: true,
    chosenPicture: 0,
  };
  async componentDidMount() {
    const fetchedProduct = await getProductById(
      this.props.match.params.product
    );
    if (fetchedProduct) {
      this.setState({
        product: {
          ...fetchedProduct,
          attributes: [
            ...fetchedProduct.attributes.map((attribute) => {
              return { ...attribute, chosenAttribute: attribute.items[0].id };
            }),
          ],
        },
        isLoading: false,
      });
    }
  }

  setChosenPicture = (index: number) => {
    this.setState((previousState) => ({
      ...previousState,
      chosenPicture: index,
    }));
  };

  setAsChosenAttribute = (attributeId: string, attributeName: string) => {
    this.setState((previousState) => ({
      ...previousState,
      product: {
        ...previousState.product,
        attributes: [
          ...previousState.product.attributes.map((attribute) => {
            if (attribute.name === attributeName)
              return { ...attribute, chosenAttribute: attributeId };
            return { ...attribute };
          }),
        ],
      },
    }));
  };

  render() {
    const priceByCurrentCurrency = this.state.product.prices.find(
      (price) => price.currency.label === this.props.currency.label
    );
    return (
      <div className="container">
        <Navbar />
        <div className="flexCenter">
          {!this.state.isLoading ? (
            <div className="productPageContainer">
              <div className="leftImagesContainer">
                {this.state.product.gallery.map((image, index) => (
                  <img
                    onClick={() => this.setChosenPicture(index)}
                    key={index}
                    className="leftImage"
                    src={image}
                    alt={image}
                  />
                ))}
              </div>
              <div className="mainImageContainer">
                <img
                  className="mainImage"
                  src={this.state.product.gallery[this.state.chosenPicture]}
                  alt="mainPicture"
                />
              </div>
              <div className="rightDetailsContainer">
                <div className="productName">{this.state.product.name}</div>
                <div className="productBrand">{this.state.product.brand}</div>
                <div className="attributesContainer">
                  {this.state.product.attributes.map((attribute, index) => (
                    <div key={index} className="attributeContainer">
                      <div className="attributeName">
                        {attribute.id.toUpperCase()}:
                      </div>
                      <div className="buttonsContainer">
                        {attribute.items.map((item, index) => {
                          return attribute.type === "swatch" ? (
                            <div
                              key={index}
                              onClick={() =>
                                this.setAsChosenAttribute(
                                  item.id,
                                  attribute.name
                                )
                              }
                              className="swatchButtonBorder"
                              style={
                                attribute.chosenAttribute === item.id
                                  ? { border: "2px solid #5ECE7B" }
                                  : {}
                              }
                            >
                              <div
                                className="swatchButton"
                                style={{
                                  backgroundColor: item.value,
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                this.setAsChosenAttribute(
                                  item.id,
                                  attribute.name
                                )
                              }
                              key={index}
                              className="attributeButton"
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
                <div className="priceContainer">
                  <div className="priceLabel">PRICE:</div>
                  <div className="priceAmount">
                    {priceByCurrentCurrency
                      ? priceByCurrentCurrency.currency.symbol +
                        priceByCurrentCurrency.amount
                      : ""}
                  </div>
                </div>
                <div
                  onClick={() => {
                    this.props.addProduct(this.state.product);
                  }}
                  className="addToCartButton"
                >
                  ADD TO CART
                </div>
                <div className="descriptionContainer">
                  {parse(this.state.product.description)}
                </div>
              </div>
            </div>
          ) : (
            <div className="categoryName">Loading</div>
          )}
        </div>
      </div>
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

const connector = connect(mapStateToProps, { addProduct });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);
