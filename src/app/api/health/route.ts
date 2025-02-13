import { NextResponse } from "next/server";
import prisma from "../services/prisma"; // Adjust import based on your setup
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { calories, protein, date } = await req.json();

    if (calories === 0 && protein === 0) {
      return NextResponse.json({ message: "No data to save" }, { status: 200 });
    }

    const entry = await prisma.dailyHealthLog.create({
      data: {
        userId: session.user.id,
        calories,
        protein,
        date: new Date(date),
      },
    });

    return NextResponse.json({ message: "Data saved", entry });
  } catch (error) {
    console.error("Error saving health data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}