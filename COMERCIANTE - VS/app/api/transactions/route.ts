import { NextResponse } from "next/server"
import { publicClient, CONTRACT_ADDRESS_RAW as CONTRACT_ADDRESS, VOUCHER_ABI } from "@/lib/blockchain"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const merchantAddress = searchParams.get("merchantAddress")

    if (!merchantAddress) {
      return NextResponse.json(
        { error: "merchantAddress é obrigatório" },
        { status: 400 }
      )
    }

    const latestBlock = await publicClient.getBlockNumber()
    const fromBlock = latestBlock - BigInt(10000)

    const logs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: {
        type: "event",
        name: "ChargeApproved",
        inputs: [
          { type: "bytes32", name: "chargeId", indexed: true },
          { type: "address", name: "merchant", indexed: true },
          { type: "address", name: "beneficiary", indexed: true },
          { type: "uint256", name: "amount" },
        ],
      },
      args: {
        merchant: merchantAddress as `0x${string}`,
      },
      fromBlock,
      toBlock: "latest",
    })

    const transactions = logs.map((log) => ({
      chargeId: log.args.chargeId,
      beneficiary: log.args.beneficiary,
      amount: log.args.amount?.toString(),
      transactionHash: log.transactionHash,
      blockNumber: log.blockNumber?.toString(),
    }))

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Erro ao buscar transações:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
