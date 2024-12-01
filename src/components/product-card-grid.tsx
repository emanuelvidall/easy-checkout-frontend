import { ProductCard } from "./product-card";

interface ProductCardGridProps {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
  handleDeleteProduct: (productId: string) => void;
}

export const ProductCardGrid: React.FC<ProductCardGridProps> = ({
  products,
  handleDeleteProduct,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          handleDeleteProduct={handleDeleteProduct}
          product={product}
        />
      ))}
    </div>
  );
};
