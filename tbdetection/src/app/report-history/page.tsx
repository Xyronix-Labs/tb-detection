// src/app/report-history/page.tsx
import path from "path";
import { promises as fs } from "fs";
import ReportHistoryClient from "./ReportHistoryClient";

interface Report {
  id: number;
  userEmail: string;
  date: string;
  reportType: string;
  result: string;
  notes?: string; // keep as string because JSON inside string
}

export default async function ReportHistory() {
  const filePath = path.join(process.cwd(), "src/data/reports.json");
  const data = await fs.readFile(filePath, "utf-8");
  const reports: Report[] = JSON.parse(data);

  return <ReportHistoryClient reports={reports} />;
}
