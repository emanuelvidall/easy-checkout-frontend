import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      id
      customerName
      status
      paymentMethod
      createdAt
      product {
        id
        name
        description
        price
      }
    }
  }
`;
