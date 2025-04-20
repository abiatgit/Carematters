"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <UserButton />
      Welcome Nurse
    </div>
  );
};

export default Page;
