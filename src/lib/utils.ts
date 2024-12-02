import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handlePriceChange = (value: string, max: number): string => {
  const numericValue = parseFloat(value.replace(/\D/g, "")) || 0;
  if (numericValue > max) return formatToBrazilianCurrency(max.toString());
  return formatToBrazilianCurrency(value);
};

export const formatToBrazilianCurrency = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  const floatValue = parseFloat(numericValue) / 100;
  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const handleTextMaxLength = (
  value: string,
  maxLength: number
): string => {
  if (value.length > maxLength) {
    return value.slice(0, maxLength);
  }
  return value;
};

export const scrollToTop = (smooth: boolean = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

export function enforceCPFMaxLength(value: string): string {
  const numericValue = value.replace(/\D/g, "");
  const truncatedValue = numericValue.slice(0, 11);
  return truncatedValue;
}

export function enforcePhoneMaxLength(value: string): string {
  return value.slice(0, 11);
}
