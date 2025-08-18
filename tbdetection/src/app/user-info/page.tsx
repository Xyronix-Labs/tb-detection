"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface UserInfoForm {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  smoking: string;
}

export default function UserInfo() {
  const router = useRouter();
  const [form, setForm] = useState<UserInfoForm>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    smoking: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.weight ||
      !form.height ||
      !form.smoking
    ) {
      alert("Please fill all fields");
      return;
    }
    localStorage.setItem("userInfo", JSON.stringify(form));
    router.push("/symptoms");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black px-4">
      <div className="bg-gray-900 text-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">User Information</h2>

        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="p-3 border-2 border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Age:</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="p-3 border-2 border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Gender:</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="p-3 border-2 border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Enter your weight"
              className="p-3 border-2 border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Height (cm):</label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Enter your height"
              className="p-3 border-2 border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Smoking History */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Smoking History:</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="smoking"
                  value="Yes"
                  checked={form.smoking === "Yes"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="smoking"
                  value="No"
                  checked={form.smoking === "No"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                No
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
