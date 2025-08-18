import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/data/reports.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const reports = JSON.parse(data);
    return NextResponse.json(reports, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load reports" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newReport = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const reports = JSON.parse(data);

    const updatedReports = [
      ...reports,
      { id: reports.length + 1, ...newReport },
    ];

    await fs.writeFile(filePath, JSON.stringify(updatedReports, null, 2));
    return NextResponse.json(
      { message: "Report saved!" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}
