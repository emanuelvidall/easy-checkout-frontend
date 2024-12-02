import client from "@/lib/apollo-client";
import { CREATE_ORDER } from "@/graphql/mutations/order-mutations";

interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerCPF: string;
  customerEmail: string;
  productId: string;
  paymentMethod: string;
  status: "APPROVED" | "PENDING";
}

interface Order {
  id: string;
  customerName: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
}

export const OrderService = {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input },
      });

      return data.createOrder;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  },
};
