import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./product-card-grid";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
  };
  handleDeleteProduct: (productId: string) => void;
  onEdit: (product: Product) => void;
  isLoading: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleDeleteProduct,
  onEdit,
  isLoading,
}) => {
  const myLoader = () => {
    return `${product.imageURL}`;
  };

  const nameElipsis = (text: string) => {
    if (text.length > 32) {
      return `${text.slice(0, 32)}...`;
    } else {
      return text;
    }
  };
  const descriptionElipsis = (text: string) => {
    if (text.length > 36) {
      return `${text.slice(0, 36)}...`;
    } else {
      return text;
    }
  };

  const placeholderImage = "https://placehold.co/253x153";

  const price = product.price.toLocaleString("pt-BR");

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <Card className="max-w-[293px] justify-between flex flex-col">
          <CardHeader className="min-h-[246px]">
            <Image
              className="max-h-[153px] object-cover rounded-sm"
              loader={myLoader}
              src={product?.imageURL || placeholderImage}
              width={253}
              height={153}
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,...encoded-placeholder..."
              alt="banner do card"
              loading="lazy"
            />
            <CardTitle className="flex flex-row justify-between items-start min-h-[48px]">
              <div className="w-7/12 break-all">
                <p className="text-[#101827]">{nameElipsis(product.name)}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-bold opacity-60">R$ {price}</p>
              </div>
            </CardTitle>
            <CardDescription className="break-all min-h-[40px]">
              {descriptionElipsis(product.description)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>Link para checkout 🛒</p>
            <div className="w-full flex flex-col justify-center h-10 p-3 border-dashed border border-[#039ADC]">
              <Link href={`/checkout/${product.id}`}> link.com </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between gap-4 items-center">
            <Button
              className="bg-[#E4AF00] w-1/2"
              onClick={() => onEdit(product)}
            >
              Editar
            </Button>
            <Button
              onClick={() => handleDeleteProduct(product.id)}
              className="w-1/2"
              variant="destructive"
            >
              Excluir
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
