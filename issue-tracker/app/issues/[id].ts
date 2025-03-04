import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "PATCH") {
        const { status } = req.body;

        if (!["Open", "In Progress", "On Hold", "Resolved"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        try {
            const updatedIssue = await prisma.issue.update({
                where: { id: Number(id) },
                data: { status },
            });
            return res.json(updatedIssue);
        } catch (error) {
            return res.status(500).json({ message: "Error updating issue" });
        }
    }

    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
