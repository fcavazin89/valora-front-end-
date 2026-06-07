import { NextResponse } from "next/server"
import { beneficiarios } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: beneficiarios, total: beneficiarios.length })
}
