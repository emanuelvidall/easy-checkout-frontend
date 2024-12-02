"use client";

import { useEffect, useState } from "react";
import { SalesTable } from "@/components/sales-table";
import { Order, OrderService } from "@/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      console.log("Fetching orders...");
      try {
        const ordersData = await OrderService.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="w-full px-8 h-full justify-center items-center flex flex-col">
      <h1 className="text-xl font-semibold mb-4">Vendas</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <SalesTable
          sales={orders.map((order) => ({
            id: order.id,
            productId: order.productId,
            customerName: order.customerName,
            customerCPF: order.customerCPF,
            customerPhone: order.customerPhone,
            customerEmail: order.customerEmail,
            status: order.status,
            paymentMethod: order.paymentMethod,
            createdAt: order.createdAt,
          }))}
        />
      )}
    </div>
  );
}
