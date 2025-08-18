"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserMd, FaHospital, FaPills, FaXRay, FaBars, FaTimes } from "react-icons/fa";

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) {
      setUser(JSON.parse(loggedIn));
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) return null; // Wait until user is loaded

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-20 w-64 bg-gray-800 text-white shadow-lg h-full transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 text-2xl font-bold text-blue-500 flex justify-between items-center">
          TB DETECTION
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-4 mt-4">
          <button className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/dashboard")}>
            Dashboard
          </button>
          <button className="py-2 px-3 hover:bg-gray-700 rounded-lg" onClick={() => router.push("/appointment")}>
            Appointment
          </button>
          <button
            className="py-2 px-3 hover:bg-gray-700 rounded-lg text-red-400"
            onClick={() => router.push("/report-history")}
          >
            Report History
          </button>

          <button className="py-2 px-3 hover:bg-gray-700 rounded-lg">Doctor</button>
          <button className="py-2 px-3 hover:bg-gray-700 rounded-lg">Message</button>
          <button className="py-2 px-3 hover:bg-gray-700 rounded-lg">Settings</button>
          <div className="border-t mt-4"></div>
          <button className="py-2 px-3 hover:bg-gray-700 rounded-lg">My Account</button>
          <button
            className="py-2 px-3 text-red-500 hover:bg-gray-700 rounded-lg"
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              router.push("/login");
            }}
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto w-full">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
            <FaBars size={24} />
          </button>
          <input
            type="text"
            placeholder="Search here..."
            className="hidden sm:block w-1/2 p-2 rounded-lg border-2 border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 text-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-center mb-6 h-auto md:h-60">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Welcome {user.name} to TB DETECTION APP</h2>
            <button
              onClick={() => router.push("/user-info")}
              className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Features</h3>
            <button className="text-blue-600 text-sm">See All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-gray-700 shadow rounded-lg">
              <FaHospital className="text-blue-500 text-3xl mb-2" />
              <span>Hospital</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-700 shadow rounded-lg">
              <FaUserMd className="text-blue-500 text-3xl mb-2" />
              <span>Doctor</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-700 shadow rounded-lg">
              <FaPills className="text-blue-500 text-3xl mb-2" />
              <span>Pharmacy</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-700 shadow rounded-lg">
              <FaXRay className="text-blue-500 text-3xl mb-2" />
              <span>X-ray Scan</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
