import { columns } from "@/components/example/columns";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { IUsersRequest } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Example = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1, //initial page index
    pageSize: 10, //default page size
  });
  let [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (pagination.pageIndex) {
      setSearchParams({ page: pagination.pageIndex.toString(), limit: "10" });
    }
  }, [pagination.pageIndex]);

  const {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      console.log("Start fetching data");
      console.log(pageParam);
      const response = await fetch(
        `http://localhost:4000/user?page=${pageParam}&limit=10`,

        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ1YTdkZTdkNGU2NjliN2RiMDk1NDYiLCJpYXQiOjE3MTE4NDcyMjUsImV4cCI6MTcxMjQ1MjAyNX0.OpQu4QfGXs01d5Yo2mhW5DZHnw8vCAEcxCEylGP411E`,
          },
        }
      );

      const data: IUsersRequest = await response.json();

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= Math.ceil(lastPage.total / 10) ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      const previousPage = allPages[allPages.length - 1].page - 1;
      if (previousPage > 0) {
        return previousPage;
      }

      return undefined;
    },
  });

  if (!data) return <Loading />;

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-lg p-4 mb-8">
      <ExampleTable
        columns={columns}
        data={data?.pages[data.pages.length - 1].users ?? []}
        isLoading={isLoading || isFetching}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        rowCount={data?.pages[0].total}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default Example;
