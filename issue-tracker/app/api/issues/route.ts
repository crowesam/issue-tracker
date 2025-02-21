import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";

// Handle POST requests (Creating new issues)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// Handle GET requests (Fetching issues)
export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: {
        createdAt: "desc", // Sort by most recent issues first
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
