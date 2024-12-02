"use client";
import { Product } from "@/components/product-card-grid";
import { ProductService } from "@/services/product.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProduct() {
      const data = await ProductService.getProductById(id);
      setProduct(data);
      setIsLoading(false);
    }

    fetchProduct();
  }, [id]);

  return (
    <div className="p-4 w-full h-screen">
      <div className="flex justify-center items-center">teste</div>
    </div>
  );
}
