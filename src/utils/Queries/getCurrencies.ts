import { gql } from "@apollo/client";
import { client } from "../..";

const getCurrencies = async (): Promise<
  { label: string; symbol: string }[]
> => {
  return client
    .query({
      query: gql`
        query GetCurrencies {
          currencies {
            label
            symbol
          }
        }
      `,
    })
    .then(
      (result: {
        data: { currencies: { label: string; symbol: string }[] };
        loading: boolean;
        networkStatus: any;
      }) => {
        return result.data.currencies;
      }
    );
};
export default getCurrencies;
