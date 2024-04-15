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
import { useAllSearchParams } from "@/hooks/useGetParams";
import { Label } from "./label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  rowCount: number;
  filters?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  filters,
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
  const [allFilters, setAllFilters] = useState<{ [key: string]: string }>({});
  const allParams = useAllSearchParams();

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
      });

      if (filters) {
        setSearchParams({
          page: String(pagination.pageIndex),
          limit: String(pagination.pageSize),
          ...allFilters,
        });
      }
    }
  }, [pagination, allFilters, searchParams, setSearchParams, filters]);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem className="" value="item-1">
          <AccordionTrigger className="border p-4 my-2 rounded-lg">
            {t("common.filter")}
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <div className="flex flex-wrap flex-shrink ">
              {filters?.map((filter) => {
                return (
                  <form
                    key={filter}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPagination((prev) => ({
                        ...prev,
                        pageIndex: 1,
                      }));

                      setAllFilters((prev) => ({
                        ...prev,
                        [filter]: allFilters[filter],
                      }));

                      setSearchParams({
                        page: String(pagination.pageIndex),
                        limit: String(pagination.pageSize),
                        ...allFilters,
                      });
                    }}
                  >
                    <Label>{filter}</Label>
                    <div className="flex items-center  gap-2">
                      <Input
                        value={allFilters[filter] || ""}
                        onChange={(e) => {
                          setAllFilters((prev) => ({
                            ...prev,
                            [filter]: e.target.value,
                          }));
                        }}
                        className="p-4 my-4 sm:w-1/2 w-full"
                        placeholder={filter}
                      />
                      <Button disabled={!allFilters[filter]} type="submit">
                        {t("pagination.search")}
                      </Button>
                      <Button
                        onClick={() => {
                          setPagination((prev) => ({
                            ...prev,
                            pageIndex: 1,
                          }));
                          delete allFilters[filter];
                          setAllFilters((prev) => {
                            delete prev[filter];
                            return prev;
                          });

                          setSearchParams({
                            page: String(pagination.pageIndex),
                            limit: String(pagination.pageSize),
                            ...allFilters,
                          });
                        }}
                        type="reset"
                        disabled={!allFilters[filter] || !allParams[filter]}
                        variant="outline"
                      >
                        {t("pagination.cancel")}
                      </Button>
                    </div>
                  </form>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
