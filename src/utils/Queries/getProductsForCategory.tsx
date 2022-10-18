import { gql } from "@apollo/client";
import { client } from "../..";
import { ShoppingItem } from "../../../types";

const getProductsForCategory = async (
  category: string
): Promise<ShoppingItem[]> => {
  return client
    .query({
      query: gql`
        query GetProducts($category: String!) {
          category(input: { title: $category }) {
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
      variables: { category },
      fetchPolicy: "no-cache",
    })
    .then(
      (result: {
        data: { category: { products: ShoppingItem[] } };
        loading: boolean;
        networkStatus: any;
      }) => {
        return result.data.category.products;
      }
    );
};
export default getProductsForCategory;
