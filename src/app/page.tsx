"use client";

import { AddProductDialog } from "@/components/add-product-dialog";
import { Product, ProductCardGrid } from "@/components/product-card-grid";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/utils";
import { ProductService } from "@/services/product.service";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductService.fetchProducts();
      setProducts(data);
    }

    scrollToTop();

    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      setProducts((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      const { data } = await ProductService.deleteProduct(productId);
      console.log(`Product deleted:`, data);

      scrollToTop();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4 w-full h-screen">
      <AddProductDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        setProducts={handleAddProduct}
      />
      <div className="flex w-full flex-col h-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl mb-8">Produtos</h1>
          <Button
            className="bg-[#039ADC] hover:bg-gray-500"
            onClick={() => setIsOpen(true)}
          >
            <CirclePlus stroke="white" />
            <span className="text-white">Adicionar produto</span>
          </Button>
        </div>

        <ProductCardGrid
          setIsOpen={setIsOpen}
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
