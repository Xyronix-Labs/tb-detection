import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

const filePath = path.join(process.cwd(), "users.json");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: "No users found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { password: pw, ...userData } = user;
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
