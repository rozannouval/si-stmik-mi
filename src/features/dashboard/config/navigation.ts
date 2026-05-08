import {
  LayoutDashboard,
  Users,
  BookOpen,
} from "lucide-react";

export const navigation = {
  ADMIN: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Mahasiswa",
      href: "/dashboard/admin/mahasiswa",
      icon: Users,
    },
  ],

  DOSEN: [
    {
      label: "Dashboard",
      href: "/dashboard/dosen",
      icon: LayoutDashboard,
    },
  ],

  MAHASISWA: [
    {
      label: "Dashboard",
      href: "/dashboard/mahasiswa",
      icon: BookOpen,
    },
  ],
};