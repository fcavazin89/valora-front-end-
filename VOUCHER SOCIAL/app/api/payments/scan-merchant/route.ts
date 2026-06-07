import { NextResponse } from "next/server"
import { merchantRegistry } from "@/lib/web3/server/merchant-registry"

export async function POST() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2200))

    const merchant = merchantRegistry.getRandomMerchant()

    const amountOptions = [
      { amount: "45,50", voucherType: "alimentacao" as const },
      { amount: "18,00", voucherType: "alimentacao" as const },
      { amount: "100,00", voucherType: "gas" as const },
      { amount: "32,00", voucherType: "alimentacao" as const },
      { amount: "87,00", voucherType: "alimentacao" as const },
    ]

    const picked = amountOptions[Math.floor(Math.random() * amountOptions.length)]

    return NextResponse.json({
      merchantName: merchant.name,
      merchantAddress: merchant.address,
      merchantLocation: merchant.location,
      amount: `R$ ${picked.amount}`,
      amountValue: picked.amount,
      voucherType: picked.voucherType,
      verified: merchant.verified,
    })
  } catch (error: any) {
    console.error("[API] Erro ao escanear QR:", error)
    return NextResponse.json(
      { error: error?.message || "Falha ao escanear QR Code" },
      { status: 500 }
    )
  }
}
