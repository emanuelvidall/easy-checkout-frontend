import { z } from "zod";

export const checkoutSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Telefone inválido" }),
});

export const addProductFormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageFiles: z.array(z.instanceof(File)).optional(),
  price: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const numericValue = parseFloat(
          value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return numericValue >= 1;
      },
      { message: "O preço deve ser no mínimo R$ 1,00" }
    )
    .refine(
      (value) => {
        if (!value) return true;
        const numericValue = parseFloat(
          value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return numericValue <= 999999;
      },
      { message: "O preço deve ser no máximo R$ 899.999,00" }
    ),
});
