import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/reports.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const reports = JSON.parse(data);
    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to load reports" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newReport = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const reports = JSON.parse(data);

    const updatedReports = [
      ...reports,
      { id: reports.length + 1, ...newReport }
    ];

    await fs.writeFile(filePath, JSON.stringify(updatedReports, null, 2));
    return new Response(JSON.stringify({ message: "Report saved!" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to save report" }), { status: 500 });
  }
}
