import { gql } from "@apollo/client";
import { client } from "../..";

const getCategories = async (): Promise<string[]> => {
  return client
    .query({
      query: gql`
        query GetProducts {
          categories {
            name
          }
        }
      `,
    })
    .then(
      (result: {
        data: { categories: { name: string }[] };
        loading: boolean;
        networkStatus: any;
      }) => {
        return [...result.data.categories.map((category) => category.name)];
      }
    );
};
export default getCategories;
