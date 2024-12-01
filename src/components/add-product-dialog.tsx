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
import { CirclePlus } from "lucide-react";
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

interface formType {
  name: string;
  description: string;
  imageFiles: File[];
  price: string;
}

interface AddProductDialogComponentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
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
  imageFiles: z
    .array(z.object({ name: z.string(), preview: z.string() }))
    .optional(),
  price: z.string().refine((value) => {
    const numericValue = parseFloat(
      value.replace(/[^\d,]/g, "").replace(",", ".")
    );
    return !isNaN(numericValue) && numericValue <= 999999;
  }, "O preço deve ser um número válido e no máximo R$ 899.999,00"),
});

export const AddProductDialog: React.FC<AddProductDialogComponentProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: formatToBrazilianCurrency("0"),
      imageFiles: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const price = parseFloat(
      values.price.replace(/[^\d,]/g, "").replace(",", ".")
    );

    const formattedValues = {
      ...values,
      price,
    };
    console.log(formattedValues);
    form.reset();
    setIsOpen(false);
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
          <DialogTitle className="text-left">Adicionar produto</DialogTitle>
          <Separator />
        </DialogHeader>
        <DialogDescription>
          Aqui você pode adicionar produtos em seu estoque
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
                    <Textarea
                      className="h-32"
                      placeholder="Descrição"
                      {...field}
                      onChange={(e) => {
                        const truncatedValue = handleTextMaxLength(
                          e.target.value,
                          120
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
              name="imageFiles"
              render={({ field }) => <FileDropzone field={field} />}
            />
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
            <Button
              className="w-full flex flex-row justify-between bg-[#039ADC] hover:bg-gray-500"
              type="submit"
            >
              Adicionar produto <CirclePlus />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
