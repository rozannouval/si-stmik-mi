"use client";

import { Input } from "@/components/ui/input";
import { DataTableToolbarProps } from "./types";

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Cari...",
}: DataTableToolbarProps<TData>) {
  if (!searchKey) return null;

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder={searchPlaceholder}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn(searchKey)?.setFilterValue(e.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
