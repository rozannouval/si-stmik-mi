import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "ADMIN":
      redirect("/dashboard/admin");

    case "DOSEN":
      redirect("/dashboard/dosen");

    default:
      redirect("/dashboard/mahasiswa");
  }
}
