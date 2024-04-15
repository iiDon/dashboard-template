import { getUsers } from "@/api/example";
import { columns } from "@/components/example/columns";
import Loading from "@/components/ui/Loading";
import { DataTable as ExampleTable } from "@/components/ui/data-table";
import { useAllSearchParams } from "@/hooks/useGetParams";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Example = () => {
  const allParams = useAllSearchParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["example", allParams],
    queryFn: () => getUsers(allParams),
    placeholderData: keepPreviousData,
    refetchInterval: 60 * 1000,
    staleTime: 60 * 1000,
  });

  if (!data) return <Loading />;

  return (
    <div className="flex flex-col gap-4 shadow-lg border rounded-lg p-4 mb-8">
      <ExampleTable
        columns={columns}
        filters={["search", "test2"]}
        data={data.users}
        isLoading={isLoading || isFetching}
        rowCount={data.total}
      />
    </div>
  );
};

export default Example;
