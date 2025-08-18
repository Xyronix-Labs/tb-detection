"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json(); // always returns JSON

      if (res.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data)); // store user in localStorage
        router.push("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4 w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded bg-gray-700"/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 rounded bg-gray-700"/>
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">Login</button>
        <p className="text-sm text-gray-400 text-center">
          Don’t have an account? <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
