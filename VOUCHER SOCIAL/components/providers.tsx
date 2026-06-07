"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Web3AuthProvider } from "@web3auth/modal/react"
import { WagmiProvider } from "@web3auth/modal/react/wagmi"
import { useState } from "react"
import web3AuthContextConfig from "@/lib/web3/web3auth-config"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  )
}
