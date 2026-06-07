import { NextResponse } from "next/server"
import { saques } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: saques, total: saques.length })
}
