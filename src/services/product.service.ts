import client from "@/lib/apollo-client";
import axiosInstance from "@/lib/axios-instance";
import { Product } from "@/components/product-card-grid";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "@/graphql/mutations/product-mutations";

const uploadImageUrl = "upload/product-image/";

export class ProductService {
  static async getProducts() {
    const { data } = await client.query({ query: GET_PRODUCTS });
    return data.getProducts;
  }

  static async getProductById(productId: string) {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: { id: productId },
      fetchPolicy: "network-only",
    });
    return data.getProductById;
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
