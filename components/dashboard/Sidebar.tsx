import React from 'react';
import {
  Home,
  Users,
  UserCheck,
  Mail,
  Pill,
  Handshake,
} from "lucide-react";
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-400 text-white w-16 hover:w-64 transition-all duration-300 ease-in-out flex flex-col items-center py-8">
      <div className="space-y-6 w-full group">
        
        {/* Dashboard */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <Home className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block" ><Link href={"/user"}>Dashboard</Link></span>
        </div>

        {/* Residents */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <Users className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block" ><Link href={"/list/resident"}>Residents</Link></span>
        </div>

        {/* Staff */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <UserCheck className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block"><Link href={"/list/staff"}>Staff</Link></span>
        </div>

        {/* Messages */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <Mail className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block"><Link href={"/list/messages"}>Messages</Link></span>
        </div>

        {/* Handover */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <Handshake className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block"><Link href={"/list/handover"}>Handover</Link></span>
        </div>

        {/* Medications */}
        <div className="flex items-center justify-center hover:bg-gray-700 p-2 rounded-full w-full cursor-pointer group-hover:justify-start">
          <Pill className="ml-2" />
          <span className="ml-4 text-sm hidden group-hover:block"><Link href={"/list/medicine"}>Medicine</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
