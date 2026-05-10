import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      organization,
      email,
      phone,
      category,
      requirement,
      quantity,
    } = body;

    if (!name || !email || !phone || !requirement) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    const saved = await prisma.quoteRequest.create({
      data: {
        name,
        organization,
        email,
        phone,
        category,
        requirement,
        quantity,
      },
    });

    // 📧 EMAIL SETUP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 EMAIL CONTENT
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // you receive it
      subject: "New Quote Request - FundMan",
      html: `
        <h2>New Request Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
      `,
    });

    return NextResponse.json(
      { message: "Saved & email sent", data: saved },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ data });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}