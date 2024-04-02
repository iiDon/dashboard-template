import { getUsers } from "@/api/example";
import { columns } from "@/components/example/columns";
import Loading from "@/components/ui/Loading";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const Example = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["example", searchParams.get("page"), searchParams.get("search")],
    queryFn: () =>
      getUsers(
        searchParams.get("page") || "1",
        searchParams.get("limit") || "10",
        searchParams.get("search") || undefined
      ),
    placeholderData: keepPreviousData,
    refetchInterval: 60 * 1000,
    staleTime: 60 * 1000,
  });

  if (!data) return <Loading />;

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-lg p-4 mb-8">
      <ExampleTable
        columns={columns}
        data={data.users}
        isLoading={isLoading || isFetching}
        rowCount={data.total}
      />
    </div>
  );
};

export default Example;
