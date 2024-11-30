"use client";

import { AddProductDialog } from "@/components/add-product-dialog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/product.service";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductService.fetchProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="p-4 w-full">
      <AddProductDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex w-full flex-row justify-between">
        <h1 className="text-3xl mb-8">Produtos</h1>
        <Button
          className="bg-[#039ADC] hover:bg-gray-500"
          onClick={() => setIsOpen(true)}
        >
          <CirclePlus />
          Novo produto
        </Button>
      </div>
    </div>
  );
}
