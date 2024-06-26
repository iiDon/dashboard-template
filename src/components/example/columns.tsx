import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "../ui/use-toast";
import { Link } from "react-router-dom";
import { IUser } from "@/types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "الاسم",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "phone",
    header: "رقم الجوال",
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الانشاء",
    cell: ({ row }) => <span>{row.original.createdAt.split("T")[0]}</span>,
  },
  {
    id: "actions",
    header: "العمليات",
    cell: function Cell({ row }) {
      const { toast } = useToast();
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>عمليات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(user.id));
                toast({
                  title: "تم نسخ المعرف",
                  description: "تم نسخ المعرف بنجاح",
                  variant: "default",
                });
              }}
            >
              نسخ المعرف
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={`/dashboard/events/${row.original.id}`}
                className="cursor-pointer"
              >
                استعراض التفاصيل
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>حذف</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
