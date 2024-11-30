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

export const ProductCard = () => {
  return (
    <Card className="max-w-[293px]">
      <CardHeader>
        <Image
          className="max-w-[253px] rounded-sm"
          src={Banner}
          alt="banner do card"
        />
        <CardTitle>Produto 1</CardTitle>
        <CardDescription>Lorem ipsum etc tallis quantitative </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>Link para checkout 🛒</p>
        <div className="w-full flex flex-col justify-center h-10 p-3 border-dashed border border-[#039ADC]">
          <Link href={"/"}> link.com </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button style={{ backgroundColor: "#E4AF00" }}>Editar</Button>
        <Button variant="destructive">Excluir</Button>
      </CardFooter>
    </Card>
  );
};
