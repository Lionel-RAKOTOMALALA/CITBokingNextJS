"use client"
import React from "react"

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-slate-900 rounded-xl shadow-2xl w-[600px] max-w-[95vw] relative flex flex-col"
        style={{ minWidth: 350 }}
      >
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-white z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>
  )
}
