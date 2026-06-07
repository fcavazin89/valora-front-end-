"use client"

import { useWeb3AuthConnect, useWeb3AuthDisconnect } from "@web3auth/modal/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Shield, Loader2, Wallet } from "lucide-react"

interface LoginScreenProps {
  onLogin: (address: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { connect, isConnected, isConnecting, error } = useWeb3AuthConnect()

  const handleConnect = async () => {
    await connect()
    // onLogin é chamado pelo MerchantTerminal ao detectar isConnected
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600 mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Terminal do Comerciante</h1>
          <p className="text-slate-400">Voucher Social NFT</p>
        </div>

        {/* Card de Login */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Acesso ao Terminal</CardTitle>
            <CardDescription className="text-slate-400">
              Entre com sua carteira digital ou rede social para acessar o terminal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-medium"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Entrar com Web3Auth
                </>
              )}
            </Button>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error.message}</p>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Badge de Segurança */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Shield className="w-4 h-4" />
          <span>Login seguro via Web3Auth • Blockchain ativa</span>
        </div>

      </div>
    </div>
  )
}
