import { DataTable } from "@/components/data-table";
import { columns } from "@/features/program-studi/components/columns";
import { getProgramStudiList } from "@/features/program-studi/actions/get-program-studi";

export default async function ProgramStudiPage() {
  const data = await getProgramStudiList();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Program Studi</h1>
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="nama"
        searchPlaceholder="Cari program studi..."
      />
    </div>
  );
}
