"use client";
import { Product } from "@/components/product-card-grid";
import { ProductService } from "@/services/product.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Loader2, Lock } from "lucide-react";
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
import { toast } from "sonner";
import { PaymentDrawer } from "@/components/payment-drawer";
import {
  enforceCPFMaxLength,
  enforcePhoneMaxLength,
  handleTextMaxLength,
} from "@/lib/utils";
import axiosInstance from "@/lib/axios-instance";

type CheckoutFormType = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<{
    id: string;
    qrCode: string;
    qrCodeBase64: string;
  } | null>(null);

  const createPaymentUrl = "/payment/create";

  async function createPayment(details: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    price: number;
    productId: string;
  }) {
    if (!details.price) {
      console.error("Price is missing in payment details");
      return;
    }

    try {
      const response = await axiosInstance.post(createPaymentUrl, details);
      setPaymentData(response.data.payment);
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Erro ao criar pagamento.");
    }
  }

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    },
  });

  const onSubmit = async (values: CheckoutFormType) => {
    setIsSubmitting(true);
    if (!product?.price) {
      toast.error("O preço do produto não está disponível.");
      return;
    }

    try {
      createPayment({
        name: values.nome,
        cpf: values.cpf,
        email: values.email,
        phone: values.telefone,
        price: product.price,
        productId: productId,
      });
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Falha ao realizar a compra");
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const data = await ProductService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Erro ao carregar o produto.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center h-screen"></div>
    );
  }

  return (
    <div className="py-4 w-full h-screen flex items-center justify-center pr-[27px]">
      {isLoading ? (
        <Loader2 className="animate-spin w-8 h-8" />
      ) : (
        <>
          <PaymentDrawer
            open={isOpen}
            setOpen={setIsOpen}
            paymentData={paymentData}
          />
          <div className="flex w-full justify-center items-center rounded-lg p-8">
            <div className="bg-white max-w-[485px] w-full h-full rounded-xl p-8 border-2 border-solid border-slate-200">
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
                  <TabsTrigger
                    className="items-center justify-center flex gap-2"
                    disabled
                    value="creditcard"
                  >
                    <CreditCard width={16} height={16} /> Cartão
                  </TabsTrigger>
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
                                disabled={isSubmitting}
                                placeholder="Digite seu nome"
                                {...field}
                                maxLength={50}
                                onChange={(e) => {
                                  const truncatedValue = handleTextMaxLength(
                                    e.target.value,
                                    100
                                  );
                                  field.onChange(truncatedValue);
                                }}
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
                                disabled={isSubmitting}
                                placeholder="000.000.000-00"
                                {...field}
                                onChange={(e) => {
                                  const rawValue = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  const limitedValue =
                                    enforceCPFMaxLength(rawValue);

                                  const formattedValue = limitedValue
                                    .replace(/(\d{3})(\d)/, "$1.$2")
                                    .replace(/(\d{3})(\d)/, "$1.$2")
                                    .replace(/(\d{3})(\d{2})$/, "$1-$2");
                                  field.onChange(formattedValue);
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
                              <Input
                                disabled={isSubmitting}
                                placeholder="exemplo@email.com"
                                {...field}
                                onChange={(e) => {
                                  const truncatedValue = handleTextMaxLength(
                                    e.target.value,
                                    50
                                  );
                                  field.onChange(truncatedValue);
                                }}
                              />
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
                                disabled={isSubmitting}
                                placeholder="(00) 00000-0000"
                                {...field}
                                onChange={(e) => {
                                  const rawValue = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  const limitedValue =
                                    enforcePhoneMaxLength(rawValue);

                                  const formattedValue = limitedValue
                                    .replace(/(\d{2})(\d)/, "($1) $2")
                                    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");

                                  field.onChange(formattedValue);
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
                          {product && (
                            <p className="font-semibold">R$ {product?.price}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-[#039ADC] hover:bg-gray-500"
                      >
                        {isSubmitting ? (
                          <div
                            className="flex flex-row items-center justify-center gap-2"
                            onClick={() => setIsOpen(true)}
                          >
                            <Loader2 className="animate-spin" />{" "}
                            <p>Processando...</p>
                          </div>
                        ) : (
                          <p className="font-semibold">Realizar pagamento</p>
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className="flex flex-row items-center gap-2">
                    <Lock width={16} height={16} className="opacity-50" />
                    <p className="text-xs opacity-50 text-center mt-4 mb-4">
                      Ambiente criptografado e 100% seguro.
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <Image
                      src={"/BIGcompra 1.png"}
                      width={122}
                      height={62}
                      alt="Compra segura"
                    />
                    <Image
                      src={"/BIGcompra 2.png"}
                      width={122}
                      height={62}
                      alt="Compra segura"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
