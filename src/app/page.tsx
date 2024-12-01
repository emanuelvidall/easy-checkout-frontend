"use client";

import { AddProductDialog } from "@/components/add-product-dialog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/product.service";
import { CirclePlus, PackagePlus } from "lucide-react";
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
      <div className="flex w-full flex-col gap-40">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl mb-8">Produtos</h1>
          <Button
            className="bg-[#039ADC] hover:bg-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <CirclePlus stroke="white" />
            <span className="text-white">Novo produto</span>
          </Button>
        </div>
        {products.length == 0 && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer p-4 rounded-lg max-h-40 flex flex-col items-center justify-center self-center text-center gap-8 border border-transparent hover:border-[#039ADC] transition-all ease-in-out duration-250"
          >
            <div className="p-4 rounded-full bg-[#039ADC]">
              <PackagePlus stroke="white" />
            </div>
            Parece que você ainda não possui produtos registrados <br />
            Clique aqui para registrar um novo produto
          </div>
        )}
      </div>
    </div>
  );
}
