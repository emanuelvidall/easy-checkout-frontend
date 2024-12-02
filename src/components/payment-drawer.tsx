import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { PaymentService } from "@/services/payment.service";

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
  const [status, setStatus] = useState<string>("PENDING");

  useEffect(() => {
    if (!paymentData?.id || status === "approved") return;

    const pollPaymentStatus = async () => {
      try {
        const { status: newStatus } = await PaymentService.checkPaymentStatus(
          paymentData.id
        );
        setStatus(newStatus);

        if (newStatus === "approved") {
          setOpen(true);
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
      }
    };

    const interval = setInterval(pollPaymentStatus, 5000);
    return () => clearInterval(interval);
  }, [paymentData?.id, status, setOpen]);

  const QRCodeBox = () => {
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
          "w-[355px] h-[290px] border-2 border-dashed rounded-md border-slate-500 flex items-center justify-center"
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
  };

  const SuccessMessage = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <CheckCircle className="text-green-500 w-16 h-16" />
      <p className="text-lg font-semibold text-green-600">
        Pagamento aprovado com sucesso!
      </p>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
          <DialogHeader>
            <DialogTitle>
              {status === "approved"
                ? "Pagamento Concluído"
                : "QR-Code Pagamento PIX"}
            </DialogTitle>
          </DialogHeader>
          {status === "approved" ? <SuccessMessage /> : <QRCodeBox />}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="flex flex-col justify-center items-center">
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {status === "approved"
              ? "Pagamento Concluído"
              : "QR-Code Pagamento PIX"}
          </DrawerTitle>
        </DrawerHeader>
        {status === "approved" ? <SuccessMessage /> : <QRCodeBox />}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
