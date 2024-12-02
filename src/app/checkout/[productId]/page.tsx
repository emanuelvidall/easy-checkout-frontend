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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/lib/validation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CheckoutFormType = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    },
  });

  async function onSubmit(values: CheckoutFormType) {
    console.log("Form Values:", values);
  }

  useEffect(() => {
    async function fetchProduct() {
      const data = await ProductService.getProductById(productId);
      setProduct(data);
      setIsLoading(false);
    }

    fetchProduct();
  }, [productId]);

  return (
    <div className="p-4 w-full h-screen flex items-center justify-center">
      <div className="flex w-full justify-center items-center bg-[#ebecf1] rounded-lg p-8">
        <div className="bg-white max-w-[385px] h-full rounded-xl p-8">
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
                  width={16}
                  height={16}
                />
                <p className="">PIX</p>
              </TabsTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TabsTrigger
                      className="items-center justify-center flex gap-2"
                      disabled
                      value="creditcard"
                    >
                      <CreditCard width={16} height={16} /> Cartão
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indisponível no momento</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>
            <TabsContent value="pix">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome"
                            {...field}
                            maxLength={50}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="000.000.000-00"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/(\d{3})(\d)/, "$1.$2")
                                .replace(/(\d{3})(\d)/, "$1.$2")
                                .replace(/(\d{3})(\d{2})$/, "$1-$2");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemplo@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/(\d{2})(\d)/, "($1) $2")
                                .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col mt-8">
                    <Separator />
                    <div className="flex flex-row justify-between items-center mt-4">
                      <p>Total</p>
                      <p className="font-semibold">R$ {product?.price}</p>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#039ADC] hover:bg-gray-500"
                  >
                    Realizar Pagamento
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
