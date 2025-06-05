import CreateHomeForm from "@/components/forms/careHome/createHomeForm";
import { Rabbit } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="grid md:grid-cols-3 h-screen ">
      {/* //Left */}
      <div className=" md:col-span-1 p-4 flex items-center ">
        <div className="mt-9">
          <h1 className="scroll-m-20 text-center text-2xl text-gray-600 font-extrabold tracking-tight text-balance">
            Welcome to <span className="text-green-700">CareMatters </span>your
            better version of perfomance just a few clicks away
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
              <h1 className=" text-xl font-bold">Create A CareHome</h1>
            </div>
            <CreateHomeForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
