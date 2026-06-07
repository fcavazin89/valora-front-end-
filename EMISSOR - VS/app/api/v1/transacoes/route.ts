import { NextResponse } from "next/server"
import { transacoes } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ data: transacoes, total: transacoes.length })
}
