import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <TableCaption>Lista das vendas recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Método</TableHead>
          <TableHead className="text-right">Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">{sale.id}</TableCell>
            <TableCell>{sale.productId}</TableCell>
            <TableCell>{sale.customerName}</TableCell>
            <TableCell>{sale.customerCPF}</TableCell>
            <TableCell>{sale.customerPhone}</TableCell>
            <TableCell>{sale.customerEmail}</TableCell>
            <TableCell>{sale.status}</TableCell>
            <TableCell>{sale.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
