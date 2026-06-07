import { NextResponse } from "next/server"
import { programas } from "@/lib/mock-data"
import type { Programa } from "@/lib/types"

export async function GET() {
  return NextResponse.json({ data: programas, total: programas.length })
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Programa>

  if (!body.nome || !body.emissor || !body.tipo) {
    return NextResponse.json(
      { error: "Os campos nome, emissor e tipo são obrigatórios." },
      { status: 400 },
    )
  }

  const novo: Programa = {
    id: `PRG-${String(programas.length + 1).padStart(4, "0")}`,
    nome: body.nome,
    emissor: body.emissor,
    tipo: body.tipo,
    status: body.status ?? "PENDENTE",
    beneficiarios: body.beneficiarios ?? 0,
    criadoEm: new Date().toISOString(),
  }

  programas.unshift(novo)

  return NextResponse.json({ data: novo }, { status: 201 })
}
