import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.quoteRequest.findMany({
      where: {
        isPublished: true,
        status: "OPEN",
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      requests,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}