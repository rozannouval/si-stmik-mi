export function getDashboardByRole(role: string) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";

    case "DOSEN":
      return "/dashboard/dosen";

    default:
      return "/dashboard/mahasiswa";
  }
}
