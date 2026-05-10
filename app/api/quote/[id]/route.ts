import { prisma } from "../../../lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ FIX: await params
    const { id } = await context.params;

    const numericId = Number(id);

    if (isNaN(numericId)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    console.log("Updating ID:", numericId);
    console.log("New Status:", status);

    const updated = await prisma.quoteRequest.update({
      where: { id: numericId },
      data: { status },
    });

    return Response.json({ data: updated });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}