import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import axiosInstance from "@/lib/axios-instance";

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

const UPDATE_PRODUCT = gql`
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

const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

const uploadImageUrl = "upload/product-image/";

export class ProductService {
  static async fetchProducts() {
    const { data } = await client.query({ query: GET_PRODUCTS });
    return data.getProducts;
  }

  static async uploadImage(file: File, productId: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId);

    try {
      const response = await axiosInstance.post(uploadImageUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw error;
    }
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

  static async updateProduct(
    id: string,
    input: {
      name: string;
      description: string;
      price: number;
      imageURL: string;
    }
  ) {
    const { data } = await client.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        id,
        input,
      },
    });

    return data.updateProduct;
  }

  static async deleteProduct(productId: string) {
    const { data } = await client.mutate({
      mutation: DELETE_PRODUCT,
      variables: {
        productId,
      },
    });

    return data.deleteProduct;
  }
}
