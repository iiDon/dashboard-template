import { columns } from "@/components/example/columns";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { IUsersRequest } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Example = () => {
  // get query params
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      console.log("Start fetching data");
      console.log(pageParam);
      setSearchParams({ page: pageParam.toString(), limit: "10" });
      const param = searchParams.toString() || "page=1&limit=10";
      const response = await fetch(
        `http://localhost:4000/user?${param}`,

        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ1YTdkZTdkNGU2NjliN2RiMDk1NDYiLCJpYXQiOjE3MTE4NDcyMjUsImV4cCI6MTcxMjQ1MjAyNX0.OpQu4QfGXs01d5Yo2mhW5DZHnw8vCAEcxCEylGP411E`,
          },
        }
      );

      const data: IUsersRequest = await response.json();

      return data;
    },
    initialPageParam: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.total >=
        Number(searchParams.get("limit")) * Number(searchParams.get("page"))
      ) {
        console.log("Next page", Number(searchParams.get("page")));
        return Number(searchParams.get("page")) + 1;
      }
    },
  });

  if (!data) return <Loading />;

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-lg p-4 mb-8">
      <ExampleTable
        columns={columns}
        // send data depend on page
        data={data.pages.map((page) => page.users)}
        limit={10}
        pageIndex={Number(searchParams.get("page"))}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading || isFetching}
      />

      <Button
        disabled={!hasNextPage}
        variant="outline"
        size="sm"
        onClick={() => fetchNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

export default Example;
