import { prisma } from "../db";
export const createUser = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  const email = data.email as string;
  const password = data.password as string;
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return user;
};
