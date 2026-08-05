import { NextResponse } from "next/server";
import { publishToSNS } from "@/lib/sns";

export async function GET() {
  try {
    await publishToSNS({
      message: "Hello from EKS using IRSA!",
      time: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}