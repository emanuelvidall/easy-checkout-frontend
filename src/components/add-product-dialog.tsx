"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { FileDropzone } from "./file-dropzone";

interface formType {
  name: string;
  description: string;
  price: number;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome deve possuir pelo menos 3 caracteres",
    })
    .max(50, { message: "O nome deve possuir no máximo 50 caracteres" }),
  price: z
    .number({
      invalid_type_error: "O preço deve ser um número válido",
    })
    .positive("O preço deve ser um número positivo")
    .max(999999, { message: "O preço deve ser no máximo R$ 999.999" }),
});

export function AddProductDialog({ isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar produto</DialogTitle>
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
                    <Input placeholder="Nome" {...field} />
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
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FileDropzone />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      max={999999}
                      type="number"
                      placeholder="R$ 00.00"
                      {...field}
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
}
