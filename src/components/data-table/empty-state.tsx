import { FileX } from "lucide-react";

export function DataTableEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
      <FileX className="h-8 w-8" />
      <p className="text-sm">Tidak ada data ditemukan.</p>
    </div>
  );
}
