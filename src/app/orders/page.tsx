"use client";

import { useEffect, useState } from "react";
import { SalesTable } from "@/components/sales-table";
import { Order, OrderService } from "@/services/order.service";
import { BreadCrumBar } from "@/components/breadcrumb-bar";

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
      <BreadCrumBar page="Vendas" />
      <div className="flex self-start flex-col gap-2 mb-4">
        <h1 className="text-3xl">Lista de Vendas</h1>
        <p className="text-gray-500 text-sm">Lista de pedidos registrados</p>
      </div>
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
