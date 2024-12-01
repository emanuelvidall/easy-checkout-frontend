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
import { set, useForm } from "react-hook-form";
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
import { useState } from "react";

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
  setProducts: (value: any) => void;
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
  };
  onSave: (product: any) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome deve possuir pelo menos 3 caracteres",
    })
    .max(50, { message: "O nome deve possuir no máximo 50 caracteres" }),
  description: z
    .string()
    .max(120, { message: "A descrição deve possuir no máximo 120 caracteres" }),
  imageFiles: z.array(z.instanceof(File)).optional(),
  price: z
    .string()
    .refine(
      (value) => {
        const numericValue = parseFloat(
          value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return numericValue >= 1;
      },
      { message: "O preço deve ser no mínimo R$ 1,00" }
    )
    .refine(
      (value) => {
        const numericValue = parseFloat(
          value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return numericValue <= 999999;
      },
      { message: "O preço deve ser no máximo R$ 899.999,00" }
    ),
});

export const AddProductDialog: React.FC<AddProductDialogComponentProps> = ({
  isOpen,
  setIsOpen,
  product,
  onSave,
}) => {
  const [textAreaCharCount, setTextAreaCharCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: formatToBrazilianCurrency(product.price.toString()),
          imageFiles: [],
        }
      : {
          name: "",
          description: "",
          price: formatToBrazilianCurrency("0"),
          imageFiles: [],
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPosting(true);
    try {
      const price = parseFloat(
        values.price.replace(/[^\d,]/g, "").replace(",", ".")
      );

      let imageUrl = product?.imageURL || "";

      const productInput = {
        name: values.name,
        description: values.description,
        price,
        imageURL: imageUrl,
      };

      let productId = product?.id;

      if (product) {
        await ProductService.updateProduct(productId, productInput);
        console.log("Product updated successfully");
        toast.success("Produto atualizado com sucesso!");
      } else {
        const productResponse = await ProductService.createProduct(
          productInput
        );
        productId = productResponse.id;

        console.log(`Product created successfully with ID: ${productId}`);
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
        id: productId,
        ...productInput,
        imageURL: imageUrl,
      });

      form.reset();
      setIsOpen(false);
      toast.success(
        product
          ? "Produto atualizado com sucesso!"
          : "Produto adicionado com sucesso!"
      );
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
