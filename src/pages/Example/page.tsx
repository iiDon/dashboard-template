import { columns } from "@/components/example/columns";
import Loading from "@/components/ui/Loading";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { IUsersRequest } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const getUsers = async (page: string) => {
  console.log("Start fetching data");
  console.log(page);
  const response = await fetch(
    `http://localhost:4000/user?page=${page}&limit=10`,

    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ1YTdkZTdkNGU2NjliN2RiMDk1NDYiLCJpYXQiOjE3MTE4NDcyMjUsImV4cCI6MTcxMjQ1MjAyNX0.OpQu4QfGXs01d5Yo2mhW5DZHnw8vCAEcxCEylGP411E`,
      },
    }
  );

  const data: IUsersRequest = await response.json();

  return data;
};

const Example = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["posts", searchParams.get("page")],
    queryFn: () => getUsers(searchParams.get("page") || "1"),
    placeholderData: keepPreviousData,
    refetchInterval: 60 * 1000,
    staleTime: 60 * 1000,
  });

  if (!data) return <Loading />;

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-lg p-4 mb-8">
      <ExampleTable
        columns={columns}
        data={data.users || []}
        isLoading={isLoading || isFetching}
        rowCount={data.total}
      />
    </div>
  );
};

export default Example;
