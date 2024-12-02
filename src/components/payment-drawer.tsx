import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";

interface PaymentDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  paymentData: {
    id: string;
    qrCode: string;
    qrCodeBase64: string;
  } | null;
}

export function PaymentDrawer({
  open,
  setOpen,
  paymentData,
}: PaymentDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
          <DialogHeader>
            <DialogTitle>QR-Code Pagamento PIX</DialogTitle>
            <DialogDescription>
              Aponte seu celular para o código abaixo para realizar o pagamento
            </DialogDescription>
          </DialogHeader>
          <QRCodeBox className="px-4" paymentData={paymentData ?? undefined} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className=" flex flex-col justify-center items-center">
        <DrawerHeader className="text-left">
          <DrawerTitle>QR-Code Pagamento PIX</DrawerTitle>
          <DrawerDescription>
            Aponte seu celular para o código abaixo para realizar o pagamento
          </DrawerDescription>
        </DrawerHeader>
        <QRCodeBox className="px-4" paymentData={paymentData ?? undefined} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function QRCodeBox({
  className,
  paymentData,
}: {
  className?: string;
  paymentData?: { qrCodeBase64?: string };
}) {
  if (!paymentData || !paymentData.qrCodeBase64) {
    return (
      <div className="w-[355px] h-[290px] border-2 border-dashed rounded-md border-slate-500 flex items-center justify-center">
        <p className="text-center text-sm text-slate-500">
          Carregando QR Code...
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-[355px] h-[290px] border-2 border-dashed rounded-md border-slate-500 flex items-center justify-center",
        className
      )}
    >
      <div>
        <Image
          src={`data:image/png;base64,${paymentData.qrCodeBase64}`}
          alt="QR Code"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
