import { columns } from "@/components/example/columns";
import { Button } from "@/components/ui/button";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { IUsersRequest } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Example = () => {
  // get query params
  let [searchParams, setSearchParams] = useSearchParams({
    limit: "10",
    page: "1",
  });

  useEffect(() => {
    if (searchParams) {
      // set query params
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      searchParams.set("page", pageParam.toString());
      console.log(searchParams.toString());
      const response = await fetch(
        `http://localhost:4000/user?${searchParams.toString()}`,

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
    getNextPageParam: (lastPage) => {
      // data shap has only {total: number, users: []}
      const { total } = lastPage;
      const totalPages = Math.ceil(total / 10);
      const currentPage = Number(searchParams.get("page"));
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Error</div>;
  console.log(data);
  return (
    <div className="flex flex-col gap-4 shadow-2xl p-4">
      {/* <ExampleTable columns={columns} data={data?.posts} /> */}
      {data?.pages?.map((users) =>
        users.users.map((user) => (
          <div key={user.id}>
            <span>{user.phone}</span>
          </div>
        ))
      )}

      <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Next
      </Button>

      <Button>Pres</Button>
    </div>
  );
};

export default Example;
