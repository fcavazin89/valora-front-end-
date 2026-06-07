import { NextResponse } from "next/server"
import { comercios } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: comercios, total: comercios.length })
}
