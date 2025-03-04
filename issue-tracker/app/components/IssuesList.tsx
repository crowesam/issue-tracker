"use client";

import { useEffect, useState } from "react";

interface Issue {
    id: number;
    title: string;
    status: string;
}

const STATUSES = ["Open", "In Progress", "On Hold", "Resolved"];

export default function IssuesList() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/issues");
            if (!res.ok) throw new Error("Failed to fetch issues");
            const data = await res.json();
            setIssues(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

   const updateStatus = async (id: number, newStatus: string) => {
    try {
        const res = await fetch(`/api/issues/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!res.ok) {
            throw new Error(`Failed to update issue: ${res.statusText}`);
        }

        const updatedIssue = await res.json();
        setIssues((prevIssues) =>
            prevIssues.map((issue) =>
                issue.id === id ? { ...issue, status: updatedIssue.status } : issue
            )
        );
    } catch (err) {
        console.error("Failed to update issue status", err);
    }
};

    const deleteIssue = async (id: number) => {
        try {
            const res = await fetch(`/api/issues/${id}`, { method: "DELETE" });

            if (res.ok) {
                setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete issue", err);
        }
    };

    if (loading) return <p>Loading issues...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Submitted Issues</h2>

            <ul className="space-y-4">
                {issues.length > 0 ? (
                    issues.map((issue) => (
                        <li key={issue.id} className="p-4 border rounded-lg shadow-sm bg-gray-100 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{issue.title}</p>
                                <p className="text-sm text-gray-600">Status: <span className={`font-bold text-${getStatusColor(issue.status)}`}>{issue.status}</span></p>
                            </div>
                            <div className="space-x-2">
                                {/* Status Update Buttons */}
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => updateStatus(issue.id, "In Progress")}
                                >
                                    In Progress
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    onClick={() => updateStatus(issue.id, "On Hold")}
                                >
                                    On Hold
                                </button>
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => updateStatus(issue.id, "Resolved")}
                                >
                                    Resolved
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => deleteIssue(issue.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No issues found.</p>
                )}
            </ul>
        </div>
    );
}

// Function to assign colors dynamically based on status
function getStatusColor(status: string) {
    switch (status) {
        case "Open":
            return "gray-700";
        case "In Progress":
            return "blue-600";
        case "On Hold":
            return "yellow-600";
        case "Resolved":
            return "green-600";
        default:
            return "gray-500";
    }
}
