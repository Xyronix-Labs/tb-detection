// src/app/report/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [symptoms, setSymptoms] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("userInfo");
    const s = localStorage.getItem("symptoms");
    const m = localStorage.getItem("medicalHistory");

    if (u && s && m) {
      setUserInfo(JSON.parse(u));
      setSymptoms(JSON.parse(s));
      setMedicalHistory(JSON.parse(m));
    } else {
      router.push("/user-info");
    }
  }, [router]);

  if (!userInfo || !symptoms || !medicalHistory) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 px-4">
      <div className="bg-gray-900 text-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Patient Report Summary
        </h2>

        {/* Basic Info */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
            <p><span className="font-medium">Name:</span> {userInfo.name}</p>
            <p><span className="font-medium">Age:</span> {userInfo.age}</p>
            <p><span className="font-medium">Gender:</span> {userInfo.gender}</p>
            <p><span className="font-medium">Weight:</span> {userInfo.weight} kg</p>
            <p><span className="font-medium">Height:</span> {userInfo.height} cm</p>
            <p><span className="font-medium">Smoking History:</span> {userInfo.smoking}</p>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Symptoms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(symptoms).map(([key, value]) => (
              <p
                key={key}
                className={`p-3 rounded-lg text-sm sm:text-base ${
                  value ? "bg-red-600/30 border border-red-500" : "bg-gray-800"
                }`}
              >
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>{" "}
                {value ? "Yes" : "No"}
              </p>
            ))}
          </div>
        </section>

        {/* Medical History */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Medical History</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(medicalHistory).map(([key, value]) => (
              <p
                key={key}
                className="p-3 bg-gray-800 rounded-lg text-sm sm:text-base"
              >
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>{" "}
                {value}
              </p>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => router.push("/symptoms")}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg font-semibold text-sm sm:text-base"
          >
            Edit Information
          </button>
          <button
            onClick={() => alert("Report submitted!")}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold text-sm sm:text-base"
          >
            Confirm Report
          </button>
        </div>
      </div>
    </div>
  );
}