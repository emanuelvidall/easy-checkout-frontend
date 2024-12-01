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
import Banner from "../../public/temp/card-test-banner.png";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  handleDeleteProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleDeleteProduct,
}) => {
  return (
    <Card className="max-w-[293px]">
      <CardHeader>
        <Image
          className="max-w-[253px] rounded-sm"
          src={Banner}
          alt="banner do card"
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description} </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>Link para checkout 🛒</p>
        <div className="w-full flex flex-col justify-center h-10 p-3 border-dashed border border-[#039ADC]">
          <Link href={"/"}> link.com </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-4 items-center">
        <Button className="bg-[#E4AF00] w-1/2">Editar</Button>
        <Button
          onClick={() => handleDeleteProduct(product.id)}
          className="w-1/2"
          variant="destructive"
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};
