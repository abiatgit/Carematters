import CreateHomeForm from "@/components/forms/careHome/createHomeForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Rabbit } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
const page = async () => {
  const session = await auth();
  if (!session) redirect("/auth/sign-in");
  const user = session?.user;
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!currentUser?.id)redirect("/auth/sign-in");
  if (currentUser?.onboarded) redirect("/user");

  return (
    <div className="grid md:grid-cols-4 h-full">
      {/* //Left */}
      <div className=" md:col-span-2 flex items-center justify-center h-ful">
        <div className="mt-9 p-9 flex items-center justify-center">
          <h1 className="font-poppins scroll-m-20 text-center text-2xl text-gray-800 font-extrabold tracking-wide text-balance leading-loose">
            <span className="text-green-700 underline">CareMatters </span>
            <br></br>
            &apos; Reimagine care management — the way it should be
            &apos;
          </h1>
        </div>
      </div>
      {/* //right */}
      <div className=" md:col-span-2 ">
        <div className="flex items-center justify-center my-9">
          <Rabbit className="text-green-700"></Rabbit>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <div className="text-startmt-7 flex items-center justify-center ">
              <h1 className=" text-xl font-bold">Create Your CareHome</h1>
            </div>
            <CreateHomeForm userId={currentUser?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
