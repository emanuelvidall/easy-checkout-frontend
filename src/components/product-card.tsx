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
    imageURL: string;
  };
  handleDeleteProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleDeleteProduct,
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

  return (
    <Card className="max-w-[293px]">
      <CardHeader>
        <Image
          className="max-w-[253px] max-h-[153px] object-cover rounded-sm"
          loader={myLoader}
          src={`${product.imageURL}` || "https://placehold.co/253x153"}
          width={253}
          height={153}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,...encoded-placeholder..."
          alt="banner do card"
          loading="lazy"
        />
        <CardTitle>{nameElipsis(product.name)}</CardTitle>
        <CardDescription className="break-all">
          {descriptionElipsis(product.description)}
        </CardDescription>
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
