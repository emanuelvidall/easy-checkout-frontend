import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-8">Lista de produtos</h1>
      <ProductCard />
    </div>
  );
}
