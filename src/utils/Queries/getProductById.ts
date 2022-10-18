import { gql } from "@apollo/client";
import { client } from "../..";
import { ShoppingItem } from "../../../types";

const getProductById = async (productId: string): Promise<ShoppingItem> => {
  return client
    .query({
      query: gql`
        query GetProducts($productId: String!) {
          product(id: $productId) {
            id
            name
            inStock
            gallery
            description
            category
            brand
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
          }
        }
      `,
      variables: { productId },
    })
    .then(
      (result: {
        data: { product: ShoppingItem };
        loading: boolean;
        networkStatus: any;
      }) => {
        return result.data.product;
      }
    );
};
export default getProductById;
