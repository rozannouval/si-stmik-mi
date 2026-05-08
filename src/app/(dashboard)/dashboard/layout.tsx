import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/session";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout role={session.user.role}>{children}</DashboardLayout>;
}
