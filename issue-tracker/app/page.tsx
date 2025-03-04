// import IssuesList from "@/app/components/IssuesList";

import IssuesList from "@/app/components/IssuesList";

export default function Dashboard() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <IssuesList issues={[]} />
        </main>
    );
}
