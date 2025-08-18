import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    let users = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      users = fileData ? JSON.parse(fileData) : [];
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    users.push({ name, email, password }); // NOTE: plaintext for demo only
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify({ message: "User created" }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
