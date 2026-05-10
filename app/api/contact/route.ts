import { prisma } from "../../lib/prisma";
import { transporter } from "../../lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save message
    const saved = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: "New Contact Message",

      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    return Response.json({
      success: true,
      data: saved,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}