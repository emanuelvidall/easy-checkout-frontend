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
import { Product } from "./product-card-grid";
import { Skeleton } from "./ui/skeleton";
import { FilePen, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

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
    return `${product.imageURL == "" ? placeholderImage : product?.imageURL}`;
  };

  const router = useRouter();

  const placeholderImage = "https://placehold.co/253x153";

  const price = product.price.toLocaleString("pt-BR");

  const handleGoToCheckout = () => {
    router.push(`/checkout/${product.id}`);
  };

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
        <Card className="w-[279px] justify-between flex flex-col border-slate-500 border-border rounded-2xl drop-shadow-none shadow-none ">
          <CardHeader className="w-full max-w-[600px]">
            <Image
              className="w-full h-[153px] object-cover rounded-sm"
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
            <CardTitle className="flex flex-row justify-between items-start">
              <div className="truncate">
                <p className="text-[#101827] font-bold text-xl truncate tracking-wide">
                  {product.name}
                </p>
              </div>
              <div className="flex flex-col min-w-[100px]">
                <p className="text-sm font-bold opacity-60 text-right">
                  R$ {price}
                </p>
              </div>
            </CardTitle>
            <CardDescription className="truncate">
              <p className="truncate text-base tracking-wide">
                {product.description}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              className="w-full bg-[#039ADC] hover:bg-[#2868c7] font-semibold"
              size="lg"
              onClick={handleGoToCheckout}
            >
              Comprar agora
            </Button>
          </CardContent>
          <CardFooter className="flex flex-row justify-between gap-4 items-center">
            <Button
              className="bg-[#e3edfb] text-[#3483fa] hover:bg-[#dbe7fb] font-semibold w-full"
              onClick={() => onEdit(product)}
            >
              <FilePen /> Editar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[36px] rounded-full" variant="destructive">
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Excluir produto</DialogTitle>
                  <DialogDescription>
                    O produto excluído não poderá ser recuperado. Tem certeza
                    que deseja excluir?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Voltar
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    size="sm"
                    className="px-3 bg-red-500 font-semibold"
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir Produto
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
