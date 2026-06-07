"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/browser"
import { ScanLine, CameraOff, RefreshCw } from "lucide-react"

interface QrCameraScannerProps {
  onScan: (result: string) => void
  onError?: (error: string) => void
  active: boolean
}

export function QrCameraScanner({ onScan, onError, active }: QrCameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  const stopReader = useCallback(() => {
    if (readerRef.current) {
      try {
        BrowserMultiFormatReader.releaseAllStreams()
      } catch {}
      readerRef.current = null
    }
  }, [])

  const startScanner = useCallback(async () => {
    if (!videoRef.current || isStarting) return
    setIsStarting(true)
    setCameraError(null)

    try {
      // Pede permissão de câmera explicitamente (traseira no mobile)
      await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      })

      const reader = new BrowserMultiFormatReader()
      readerRef.current = reader

      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      // Prefere câmera traseira
      const backCamera =
        devices.find((d) =>
          /back|rear|environment/i.test(d.label)
        ) ?? devices[devices.length - 1]

      const deviceId = backCamera?.deviceId

      await reader.decodeFromVideoDevice(
        deviceId ?? undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            stopReader()
            onScan(result.getText())
          }
          if (err && !(err instanceof NotFoundException)) {
            // NotFoundException é normal (frame sem QR), ignora
          }
        }
      )
    } catch (err: any) {
      const msg =
        err?.name === "NotAllowedError"
          ? "Permissão de câmera negada. Habilite nas configurações do navegador."
          : err?.name === "NotFoundError"
          ? "Nenhuma câmera encontrada neste dispositivo."
          : "Erro ao acessar a câmera."
      setCameraError(msg)
      onError?.(msg)
    } finally {
      setIsStarting(false)
    }
  }, [onScan, onError, stopReader, isStarting])

  useEffect(() => {
    if (active) {
      startScanner()
    } else {
      stopReader()
    }
    return () => stopReader()
  }, [active])

  if (cameraError) {
    return (
      <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-gray-900 text-center px-4">
        <CameraOff className="h-10 w-10 text-orange-400" />
        <p className="text-sm text-gray-300">{cameraError}</p>
        <button
          onClick={() => { setCameraError(null); startScanner() }}
          className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
        >
          <RefreshCw className="h-3 w-3" />
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gray-900">
      {/* Cantos decorativos */}
      <div className="absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 border-orange-400 z-10" />
      <div className="absolute right-4 top-4 h-10 w-10 rounded-tr-2xl border-r-4 border-t-4 border-orange-400 z-10" />
      <div className="absolute bottom-4 left-4 h-10 w-10 rounded-bl-2xl border-b-4 border-l-4 border-orange-400 z-10" />
      <div className="absolute bottom-4 right-4 h-10 w-10 rounded-br-2xl border-b-4 border-r-4 border-orange-400 z-10" />

      {/* Linha de scan animada */}
      {active && (
        <div className="absolute left-6 right-6 h-0.5 animate-bounce bg-orange-400 shadow-[0_0_12px_4px_rgba(251,146,60,0.6)] z-10" />
      )}

      {/* Preview da câmera */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* Overlay de carregando */}
      {isStarting && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/80">
          <ScanLine className="h-8 w-8 animate-pulse text-orange-400" />
          <p className="text-xs text-gray-300">Iniciando câmera...</p>
        </div>
      )}
    </div>
  )
}
