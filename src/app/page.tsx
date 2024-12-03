"use client";

import { AddProductDialog } from "@/components/add-product-dialog";
import { BreadCrumBar } from "@/components/bread-crumb-bar";
import { Product, ProductCardGrid } from "@/components/product-card-grid";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/utils";
import { ProductService } from "@/services/product.service";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductService.getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    scrollToTop();
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      setProducts((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      const { data } = await ProductService.deleteProduct(productId);
      console.log(`Product deleted:`, data);
      toast.success("Produto deletado com sucesso!");
      scrollToTop();
      setIsLoading(false);
    } catch (error) {
      toast.error("Erro ao deletar produto!");
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } else {
      setProducts((prev) => [updatedProduct, ...prev]);
    }
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <div className="p-8 w-full h-screen pr-[27px]">
      <BreadCrumBar />
      <AddProductDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
        isLoading={isLoading}
        setProducts={setProducts}
      />
      <div className="flex w-full flex-col h-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-3xl">Produtos</h1>
            <p className="text-gray-500 text-sm">
              Lista de produtos registrados
            </p>
          </div>
          <Button
            className="bg-[#039ADC] hover:bg-[#2868c7]"
            onClick={() => {
              setIsOpen(true);
              setSelectedProduct(null);
            }}
          >
            <CirclePlus stroke="white" />
            <span className="text-white">Adicionar produto</span>
          </Button>
        </div>
        <ProductCardGrid
          isLoading={isLoading}
          setIsOpen={setIsOpen}
          products={products}
          handleDeleteProduct={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
}
