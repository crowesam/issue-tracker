// export default function Home() {
//   return(
//     <div>
//       Hello Worlds
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const res = await fetch("/api/issues");
        if (!res.ok) throw new Error("Failed to load issues");

        const data: Issue[] = await res.json();
        setIssues(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Issue Dashboard</h1>

      {loading ? (
        <p>Loading issues...</p>
      ) : issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{issue.id}</td>
                <td className="border border-gray-300 px-4 py-2">{issue.title}</td>
                <td className="border border-gray-300 px-4 py-2">{issue.status}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(issue.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

