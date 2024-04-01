import React from "react";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/shadcn";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  data: TData[];
  isLoading: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  fetchNextPage,
  fetchPreviousPage,
  data,
  isLoading,
  hasNextPage,
  hasPreviousPage,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <div className="rounded-md border p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        `${t("common.dir") === "rtl" ? "text-right" : ""}`
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn(
                    `${t("common.dir") === "rtl" ? "text-right" : ""}`
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {isLoading ? (
                        <Skeleton key={row.id} className="h-8" />
                      ) : (
                        <>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="h-8" />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  لا يوجد بيانات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center gap-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchPreviousPage}
          disabled={!hasPreviousPage}
        >
          {t("pagination.previous")}
        </Button>
        <span>
          {table.getState().pagination.pageIndex} {t("pagination.of")}{" "}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchNextPage}
          disabled={!hasNextPage}
        >
          {t("pagination.next")}
        </Button>
      </div>
    </div>
  );
}
