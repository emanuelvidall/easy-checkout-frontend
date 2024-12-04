import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";

interface SalesTableProps {
  sales: {
    id: string;
    productId: string;
    customerName: string;
    customerCPF: string;
    customerPhone: string;
    customerEmail: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
  }[];
}

export const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#f1f7f9] tracking-wide">
          <TableHead className="rounded-l-md text-[#3d5660]">Pedido</TableHead>
          <TableHead className="text-[#3d5660]">Produto</TableHead>
          <TableHead className="text-[#3d5660]">Cliente</TableHead>
          <TableHead className="text-[#3d5660]">CPF</TableHead>
          <TableHead className="text-[#3d5660]">Telefone</TableHead>
          <TableHead className="text-[#3d5660]">Email</TableHead>
          <TableHead className="text-[#3d5660]">Status</TableHead>
          <TableHead className="text-[#3d5660]">Método</TableHead>
          <TableHead className="text-[#3d5660] text-right rounded-r-md">
            Data
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id} className="text-xs">
            <TableCell className="font-medium">{sale.id}</TableCell>
            <TableCell>{sale.productId}</TableCell>
            <TableCell>{sale.customerName}</TableCell>
            <TableCell>{sale.customerCPF}</TableCell>
            <TableCell>{sale.customerPhone}</TableCell>
            <TableCell>{sale.customerEmail}</TableCell>
            {sale.status === "PENDING" ? (
              <TableCell>
                <div className="bg-[#ffedd5] mt-1 rounded-md p-1 flex items-center justify-center">
                  <p className="text-[#c13d04] text-xs capitalize">pendente</p>
                </div>
              </TableCell>
            ) : (
              <TableCell className="bg-[#ecfdcb] mt-1 rounded-md p-1 flex items-center justify-center">
                <p className="text-[#4d7c0c] text-xs capitalize">aprovado</p>
              </TableCell>
            )}
            {sale.paymentMethod === "CREDIT_CARD" ? (
              <TableCell>{sale.paymentMethod}</TableCell>
            ) : (
              <TableCell>
                <div className="flex flex-row justify-start gap-2 items-center">
                  <Image
                    src="/pix-icon.svg"
                    alt="pix icon"
                    width={12}
                    height={12}
                  />
                  {sale.paymentMethod}
                </div>
              </TableCell>
            )}

            <TableCell className="text-right">
              {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
