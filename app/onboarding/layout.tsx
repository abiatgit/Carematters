"use client";
export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="grid sm:grid-cols-12 min-h-screen bg-gradient-to-tr from-sky-100 via-blue-100 to-indigo-100">
      {/* Left Panel - Header */}
      <header className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 sm:col-span-6 md:col-span-5 flex flex-col items-start p-4 sm:p-6 shadow-2xl rounded-bl-4xl sm:rounded-bl-none sm:rounded-tr-4xl rounded-br-4xl w-full text-white">
        <div className="mt-6 mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">{`Welcome ${"abi"}`}</h2>
            <p className="font-light text-sm">Manager</p>
          </div>
        </div>

        <div className="w-full mt-9 p-9">
          <h3 className="text-xl sm:text-4xl md:text-5xl leading-snug font-bold text-white drop-shadow-md mb-4 break-words">
          Ease, Comfort,  Great Care ! <span className="mt-9"><br></br></span> <span className=" mt-9 text-yellow-400 text-7xl">Just a few clicks away.</span>
          </h3>
          <h3 className="bg-white mt-9 text-indigo-700 rounded-xl px-4 py-3 text-xl sm:text-3xl md:text-4xl leading-snug font-semibold shadow-md">
            Create your care home NOW
          </h3>
        </div>
      </header>

      {/* Right Panel - Main */}
      <main className="sm:col-span-6 md:col-span-7 flex justify-center items-center p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
