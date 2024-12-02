"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { CirclePlus, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileDropzone } from "./file-dropzone";
import {
  formatToBrazilianCurrency,
  handlePriceChange,
  handleTextMaxLength,
} from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { ProductService } from "@/services/product.service";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Product } from "./product-card-grid";
import { addProductFormSchema } from "@/lib/validation";

type formType = {
  name: string;
  description: string;
  price: string;
  imageFiles?: File[];
};

interface AddProductDialogComponentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoading: boolean;
  setProducts: (value: Product[]) => void;
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
  } | null;
  onSave: (product: Product) => void;
}

export const AddProductDialog: React.FC<AddProductDialogComponentProps> = ({
  isOpen,
  setIsOpen,
  product,
  onSave,
}) => {
  const [isPosting, setIsPosting] = useState(false);
  const [textAreaCharCount, setTextAreaCharCount] = useState(0);

  const form = useForm<formType>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: product
      ? {
          name: product.name || "",
          description: product.description || "",
          price: formatToBrazilianCurrency(product.price?.toString() || "0"),
          imageFiles: [],
        }
      : {
          name: "",
          description: "",
          price: formatToBrazilianCurrency("0"),
          imageFiles: [],
        },
  });

  useEffect(() => {
    console.log(product, "product");
    if (product) {
      form.reset({
        name: product.name || "",
        description: product.description || "",
        price: formatToBrazilianCurrency(product.price?.toString() || "0"),
        imageFiles: [],
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price: formatToBrazilianCurrency("0"),
        imageFiles: [],
      });
    }
  }, [product, form]);

  async function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    setIsPosting(true);
    try {
      const price = values.price
        ? parseFloat(values.price.replace(/[^\d,]/g, "").replace(",", "."))
        : undefined;

      let imageUrl = product?.imageURL || "";

      const productInput = {
        name: values.name || "",
        description: values.description || "",
        price: price || 0,
        imageURL: imageUrl,
      };

      let productId = product?.id;

      if (product && productId) {
        await ProductService.updateProduct(productId, productInput);
        toast.success("Produto atualizado com sucesso!");
      } else {
        const productResponse = await ProductService.createProduct(
          productInput
        );
        productId = productResponse.id;

        console.log(`Product created successfully with ID: ${productId}`);
        toast.success("Produto adicionado com sucesso!");
      }

      if (values.imageFiles?.length && productId) {
        const file = values.imageFiles[0];
        const uploadedImageUrl = await ProductService.uploadImage(
          file,
          productId
        );
        imageUrl = uploadedImageUrl.url;

        if (!product) {
          await ProductService.updateProduct(productId, {
            ...productInput,
            imageURL: imageUrl,
          });
        }
      }

      onSave({
        id: productId || "",
        ...productInput,
        imageURL: imageUrl,
      });

      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Erro ao salvar produto!");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        setIsOpen(!isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">
            {product ? "Editar produto" : "Adicionar produto"}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <DialogDescription>
          {product
            ? "Edite as informações do produto selecionado"
            : "Aqui você pode adicionar produtos em seu estoque"}
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <div>
                      <Textarea
                        className="h-32 resize-none"
                        placeholder="Descrição"
                        {...field}
                        onChange={(e) => {
                          const truncatedValue = handleTextMaxLength(
                            e.target.value,
                            120
                          );
                          field.onChange(truncatedValue);
                          setTextAreaCharCount(truncatedValue.length);
                        }}
                      />
                      <p className="text-xs text-right">
                        {textAreaCharCount}/120
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="imageFiles"
                render={({ field }) => <FileDropzone field={field} />}
              />
              <p className="text-xs opacity-50 self-end text-right mt-2">
                Apenas arquivos *.jpeg e *.png. Tamanho máximo: 5mb
              </p>
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="R$ 0,00"
                      {...field}
                      onChange={(e) => {
                        const formattedValue = handlePriceChange(
                          e.target.value,
                          89999999
                        );
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {product ? (
              <Button
                disabled={isPosting}
                className="w-full flex flex-row justify-between bg-[#E4AF00] hover:bg-gray-500"
                type="submit"
              >
                <p>Salvar alterações</p> <Save />
              </Button>
            ) : (
              <Button
                disabled={isPosting}
                className="w-full flex flex-row justify-between bg-[#039ADC] hover:bg-gray-500"
                type="submit"
              >
                <p>Adicionar produto</p> <CirclePlus />
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
