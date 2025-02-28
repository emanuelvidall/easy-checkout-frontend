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

export const GET_ORDERS = gql`
  query GET_ORDERS {
    getOrders {
      id
      productId
      customerName
      customerPhone
      customerCPF
      customerEmail
      paymentMethod
      status
      createdAt
    }
  }
`;
