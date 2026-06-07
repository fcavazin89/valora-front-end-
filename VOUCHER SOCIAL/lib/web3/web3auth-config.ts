import { type Web3AuthContextConfig } from "@web3auth/modal/react"
import { WEB3AUTH_NETWORK } from "@web3auth/modal"

// Só executa no browser — nunca durante SSR/prerender
const clientId =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ?? "")
    : ""

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    // SAPPHIRE_DEVNET para localhost/dev. Troque por SAPPHIRE_MAINNET em produção.
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  },
}

export default web3AuthContextConfig
