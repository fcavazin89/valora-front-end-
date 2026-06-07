import { NextResponse } from "next/server"
import { emissores } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: emissores, total: emissores.length })
}
