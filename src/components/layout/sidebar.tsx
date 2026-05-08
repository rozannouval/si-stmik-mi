import Link from "next/link";
import { navigation } from "@/features/dashboard/config/navigation";

interface Props {
  role: "ADMIN" | "DOSEN" | "MAHASISWA";
}

export function Sidebar({ role }: Props) {
  const items = navigation[role];

  return (
    <aside className="w-64 border-r">
      <div className="p-4 font-bold">LMS SIAKAD</div>

      <nav className="flex flex-col gap-2 p-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
