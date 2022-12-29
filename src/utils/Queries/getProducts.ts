import { gql } from "@apollo/client";
import { client } from "../..";
import { ShoppingItem } from "../../../types";
const getProducts = async (): Promise<ShoppingItem[]> => {
  return client
    .query({
      query: gql`
        {
          categories {
            name
            products {
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
        }
      `,
      fetchPolicy: "no-cache",
    })
    .then(
      (result: {
        data: { categories: { products: ShoppingItem[] }[] };
        loading: boolean;
      }) => {
        return result.data.categories[0].products;
      }
    );
};
export default getProducts;
