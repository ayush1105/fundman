import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      companyName,
      email,
      password,
      phone,
      gstNumber,
      address,
      category,
    } = body;

    // CHECK EXISTING USER
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        name: companyName,
        email,
        password: hashedPassword,
        role: "VENDOR",
      },
    });

    // CREATE VENDOR PROFILE
    const vendor = await prisma.vendor.create({
      data: {
        companyName,
        email,
        phone,
        gstNumber,
        address,
        category,

        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "Vendor created successfully",
      vendor,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}