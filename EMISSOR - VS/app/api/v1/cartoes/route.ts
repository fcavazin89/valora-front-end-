import { NextResponse } from "next/server"
import { cartoes } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: cartoes, total: cartoes.length })
}
