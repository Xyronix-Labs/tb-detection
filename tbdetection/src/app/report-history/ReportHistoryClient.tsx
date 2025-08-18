// src/app/report-history/ReportHistoryClient.tsx
"use client";

import { useState } from "react";

interface Report {
    id: number;
    userEmail: string;
    date: string;
    reportType: string;
    result: string;
    notes?: string; // notes can be undefined
}

interface Props {
    reports: Report[];
}

export default function ReportHistoryClient({ reports }: Props) {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    // Helper to safely parse notes like:
    // "Symptoms: {...}, History: {...}"
    // Helper to safely parse notes like: "Symptoms: {...}, History: {...}"
    const parseNotes = (notes: string | undefined) => {
    if (!notes || typeof notes !== "string") return {};
    const result: Record<string, Record<string, any>> = {};
    try {
        const parts = notes.split(/(?<=}),\s*(?=\w+:)/); // split by "}, History:"
        parts.forEach((part) => {
        const [key, value] = part.split(/:\s*(\{.*\})/).filter(Boolean);
        if (key && value) {
            result[key.trim()] = JSON.parse(value);
        }
        });
    } catch (err) {
        console.error("Failed to parse notes", err);
    }
    return result;
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 text-center tracking-wide">
                My Report History
            </h2>

            {(!reports || reports.length === 0) ? (
                <p className="text-white text-center mt-10 text-lg">No reports submitted yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reports.map((report) => {
                        const parsedNotes = parseNotes(report.notes);
                        return (
                            <div
                                key={report.id}
                                onClick={() => setSelectedReport(report)}
                                className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-700"
                            >
                                <p className="text-sm text-gray-400 mb-2">{report.date}</p>
                                <h3 className="text-xl font-semibold mb-2 text-white">{report.reportType}</h3>
                                <p
                                    className={`font-medium mb-2 ${report.result === "Pending Review" ? "text-yellow-400" : "text-green-400"
                                        }`}
                                >
                                    {report.result}
                                </p>

                                <div className="text-gray-300 text-sm space-y-1 mt-2">
                                    {Object.entries(parsedNotes).map(([section, values]) => (
                                        <div key={section} className="mb-1">
                                            <p className="font-semibold">{section}:</p>
                                            <div className="ml-3">
                                                {Object.entries(values).map(([key, value]) => (
                                                    <p key={key}>
                                                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>{" "}
                                                        {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
                    <div className="bg-gray-900 rounded-3xl p-8 max-w-xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]">
                        <button
                            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-red-500 transition-colors"
                            onClick={() => setSelectedReport(null)}
                        >
                            &times;
                        </button>

                        <h3 className="text-3xl font-bold mb-4 text-white">{selectedReport.reportType}</h3>

                        <p className="mb-3 text-gray-300">
                            <span className="font-semibold">Date:</span> {selectedReport.date}
                        </p>
                        <p className="mb-3">
                            <span className="font-semibold">Result:</span>{" "}
                            <span
                                className={
                                    selectedReport.result === "Pending Review" ? "text-yellow-400" : "text-green-400"
                                }
                            >
                                {selectedReport.result}
                            </span>
                        </p>

                        <div className="mb-3 text-gray-300">
                            <span className="font-semibold">Symptoms / History:</span>
                            <div className="mt-2 ml-2 space-y-1">
                                {Object.entries(parseNotes(selectedReport.notes)).map(([section, values]) => (
                                    <div key={section} className="mb-1">
                                        <p className="font-semibold">{section}:</p>
                                        <div className="ml-3">
                                            {Object.entries(values).map(([key, value]) => (
                                                <p key={key}>
                                                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>{" "}
                                                    {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mb-3 text-gray-300">
                            <span className="font-semibold">User Email:</span> {selectedReport.userEmail || "N/A"}
                        </p>

                        <button
                            onClick={() => setSelectedReport(null)}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
