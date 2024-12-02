"use client";
import { Product } from "@/components/product-card-grid";
import { ProductService } from "@/services/product.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreditCard } from "lucide-react";
import Image from "next/image";

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
    <div className="p-4 w-full h-screen flex items-center justify-center">
      <div className="flex w-full justify-center items-center bg-[#ebecf1] rounded-lg h-1/2 p-8">
        <div className="bg-white w-2/3 h-full rounded-xl p-8">
          <h1 className="text-2xl">Dados da Compra</h1>
          <p className="text-sm pt-4 font-medium opacity-50">
            Forneça o dados de pagamento para completar a compra
          </p>
          <Tabs defaultValue="pix" className="mt-4">
            <TabsList className="">
              <TabsTrigger
                className="items-center justify-center flex gap-2"
                value="pix"
              >
                <Image
                  src="/pix-icon.svg"
                  alt="pix icon"
                  width={24}
                  height={24}
                />
                Pagar com Pix
              </TabsTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TabsTrigger
                      className="items-center justify-center flex gap-2"
                      disabled
                      value="creditcard"
                    >
                      <CreditCard /> Cartão de Crédito
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indisponível no momento</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>
            <TabsContent value="pix">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
