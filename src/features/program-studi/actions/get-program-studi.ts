import { prisma } from "@/lib/prisma";

export async function getProgramStudiList() {
  const data = await prisma.programStudi.findMany({
    select: {
      id: true,
      kode: true,
      nama: true,
      jenjang: true,
    },
    orderBy: {
      nama: "asc",
    },
  });

  return data;
}

export async function getProgramStudiById(id: string) {
  const data = await prisma.programStudi.findUnique({
    where: { id },
    select: {
      id: true,
      kode: true,
      nama: true,
      jenjang: true,
    },
  });

  return data;
}
