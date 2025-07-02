"use server"

import { prisma } from "@/lib/db";

export async function updateCarehome(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  await prisma.careHome.update({
    where: { id },
    data: { name },
  });
}