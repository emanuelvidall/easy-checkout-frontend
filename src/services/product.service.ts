import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

const GET_PRODUCTS = gql`
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

const CREATE_PRODUCT = gql`
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

export class ProductService {
  static async fetchProducts() {
    const { data } = await client.query({ query: GET_PRODUCTS });
    return data.getProducts;
  }

  static async createProduct(input: {
    name: string;
    description: string;
    price: number;
    imageURL: string;
  }) {
    const { data } = await client.mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        input,
      },
    });

    return data.createProduct;
  }
}
