"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ProgramStudi } from "@/features/program-studi/types";

export const columns: ColumnDef<ProgramStudi>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
  },
  {
    accessorKey: "nama",
    header: "Nama Program Studi",
  },
  {
    accessorKey: "jenjang",
    header: "Jenjang",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
