import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { useSearchParams } from "react-router-dom";
import { Input } from "./input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];

  data: TData[];
  isLoading: boolean;

  rowCount: number;
}

export function DataTable<TData, TValue>({
  columns,

  data,
  isLoading,
  rowCount,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("limit")) || 10,
  });
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: rowCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  useEffect(() => {
    if (searchParams.get("page") !== String(pagination.pageIndex)) {
      setSearchParams({
        page: String(pagination.pageIndex),
        limit: String(pagination.pageSize),
        search: search,
      });
    }
  }, [pagination]);

  return (
    <div>
      <div className="flex items-center  gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-4 my-4 sm:w-1/2 w-full"
          placeholder="البحث..."
        />
        <Button
          onClick={() => {
            setSearchParams({
              page: String(pagination.pageIndex),
              limit: String(pagination.pageSize),
              search: search,
            });

            table.setPageIndex(1);
          }}
        >
          بحث
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setSearchParams({
              page: String(pagination.pageIndex),
              limit: String(pagination.pageSize),
            });
          }}
        >
          إلغاء
        </Button>
      </div>
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
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex - 1,
            }))
          }
          disabled={isLoading || pagination.pageIndex === 1}
        >
          {t("pagination.previous")}
        </Button>
        <span>
          {table.getState().pagination.pageIndex} {t("pagination.of")}{" "}
          {rowCount
            ? Math.ceil(rowCount / table.getState().pagination.pageSize)
            : 0}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1,
            }))
          }
          disabled={
            isLoading ||
            table.getState().pagination.pageIndex >=
              Math.ceil(rowCount / pagination.pageSize)
          }
        >
          {t("pagination.next")}
        </Button>
      </div>
    </div>
  );
}
