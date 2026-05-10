import { prisma } from "../../../../lib/prisma";
import { transporter } from "../../../../lib/mailer";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params (important for Next.js 15)
    const { id } = await params;

    const numericId = Number(id);

    if (isNaN(numericId)) {
      return Response.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status } = body;

    // UPDATE DATABASE
    const updated = await prisma.quoteRequest.update({
      where: { id: numericId },
      data: { status },
    });

    // SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: updated.email,

      subject: `Request ${status}`,

      html: `
        <h2>FundMan Request Update</h2>

        <p>Hello ${updated.name},</p>

        <p>
          Your request status has been updated to:
          <strong>${status}</strong>
        </p>
      `,
    });

    return Response.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}