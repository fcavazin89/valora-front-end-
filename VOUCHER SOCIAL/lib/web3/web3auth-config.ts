import { type Web3AuthContextConfig } from "@web3auth/modal/react"
import { WEB3AUTH_NETWORK } from "@web3auth/modal"

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || ""

// Polygon Mainnet formatada para o Web3Auth
const polygonChain = {
  chainNamespace: "eip155" as const,
  chainId: "0x89", // 137 em hex
  rpcTarget: "https://polygon-rpc.com",
  displayName: "Polygon Mainnet",
  blockExplorerUrl: "https://polygonscan.com",
  ticker: "MATIC",
  tickerName: "MATIC",
}

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    // SAPPHIRE_DEVNET é obrigatório para localhost.
    // Sapphire Mainnet bloqueia origens localhost — use Devnet para desenvolvimento.
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    defaultChainConfig: polygonChain,
  },
}

export default web3AuthContextConfig
