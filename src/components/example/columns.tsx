"use client";

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
    accessorKey: "userId",
    header: "معرف المستخدم",
    cell: ({ row }) => (
      <Link
        to={`/dashboard/events/${row.original.id}`}
        className="cursor-pointer"
      >
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "المعرف",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "title",
    header: "العنوان",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "body",
    header: "المحتوى",
    cell: ({ row }) => <span>{row.original.email.slice(0, 10)}</span>,
  },
  {
    id: "actions",
    header: "العمليات",
    cell: ({ row }) => {
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
