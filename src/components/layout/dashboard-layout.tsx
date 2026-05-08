import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface Props {
  children: React.ReactNode;
  role: "ADMIN" | "DOSEN" | "MAHASISWA";
}

export function DashboardLayout({ children, role }: Props) {
  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
