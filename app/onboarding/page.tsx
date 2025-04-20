// app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useClerk, UserButton } from '@clerk/nextjs';

export default function OnboardingPage() {
  const [careHomeName, setCareHomeName] = useState('');
  const [address, setAddress] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useClerk();
  const router = useRouter();
  console.log("current user",user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!careHomeName || !address || !totalRooms) {
      toast.error('Please fill in all the fields');
      setIsLoading(false);
      return;
    }

    try {
      // Assuming you have an API endpoint to save care home details
      // Replace this with actual logic to store the care home details (e.g., Supabase, Prisma)

      const response = await fetch('/api/create-care-home', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          careHomeName,
          address,
          totalRooms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Care home created successfully!');
        router.push('/dashboard'); // Redirect to dashboard or wherever necessary
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full'>
      {/* Header with UserButton */}
      <div className='w-full bg-gray-100 h-[3.75rem] flex items-center justify-end mr-9'>
        <UserButton />
      </div>
  
      {/* Form Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">{`Welcome ${user?.firstName}`}</h1>
        <h1 className="text-4xl font-bold mb-6">Create your organizaiton</h1>
        <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="careHomeName" className="block text-sm font-medium text-gray-700">
              Care Home Name
            </label>
            <input
              type="text"
              id="careHomeName"
              name="careHomeName"
              value={careHomeName}
              onChange={(e) => setCareHomeName(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700">
              Total Rooms
            </label>
            <input
              type="number"
              id="totalRooms"
              name="totalRooms"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Care Home'}
          </button>
        </form>
      </div>
    </div>
  );
  
}
