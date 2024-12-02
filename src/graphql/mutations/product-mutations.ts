import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      description
      price
      imageURL
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
      name
      description
      price
      imageURL
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $input: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $input) {
      id
      name
      description
      price
      imageURL
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;
