import { NextResponse } from "next/server"
import { recargas } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: recargas, total: recargas.length })
}
