"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/login");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="relative w-full h-screen flex justify-center items-center text-white">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md"
                style={{ backgroundImage: "url('/icon.png')" }}
            ></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Sign Up form */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-gray-800 bg-opacity-80 p-6 rounded-lg space-y-4 w-96 backdrop-blur-md shadow-lg z-10"
            >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 bg-opacity-70"
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 bg-opacity-70"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 bg-opacity-70"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">Sign Up</button>
                <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
