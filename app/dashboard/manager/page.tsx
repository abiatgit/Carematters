"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="mt-9">
      <UserButton />
      Welcome Manager
    </div>
  );
};

export default Page;
