import { PackagePlus } from "lucide-react";
import { ProductCard } from "./product-card";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

interface ProductCardGridProps {
  products: Product[];
  handleDeleteProduct: (productId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  onEdit: (product: Product) => void;
  isLoading: boolean;
}

export const ProductCardGrid: React.FC<ProductCardGridProps> = ({
  products,
  handleDeleteProduct,
  setIsOpen,
  onEdit,
  isLoading,
}) => {
  const noProducts = (
    <div className="flex-1 pb-32  items-center justify-center flex">
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer p-4 rounded-lg flex flex-col items-center justify-center self-center text-center gap-8 border border-transparent hover:border-[#039ADC] transition-all ease-in-out duration-250"
      >
        <div className="p-4 rounded-full bg-[#039ADC]">
          <PackagePlus stroke="white" />
        </div>
        Parece que você ainda não possui produtos registrados <br />
        Clique aqui para registrar um novo produto
      </div>
    </div>
  );

  return (
    <>
      {products.length === 0 ? (
        noProducts
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              isLoading={isLoading}
              key={product.id}
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </>
  );
};
