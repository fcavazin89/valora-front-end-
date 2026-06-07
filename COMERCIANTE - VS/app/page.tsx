import { MerchantTerminal } from "@/components/merchant/merchant-terminal"
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
  return (
    <>
      <MerchantTerminal />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: "#1E293B",
            border: "1px solid #334155",
            color: "#F8FAFC",
          },
        }}
      />
    </>
  )
}
