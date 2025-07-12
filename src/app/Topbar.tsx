"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { Bell, Search, Settings } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 h-16">
        {/* Logo et titre */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 relative">
              <Image src="/images/logo.png" alt="Centre d'Information Touristique" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Centre Touristique</h1>
              <p className="text-xs text-slate-400">Système de gestion</p>
            </div>
          </div>
        </div>
        {/* Barre de recherche centrale */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-200 placeholder-slate-400 text-sm transition-all duration-200"
            />
          </div>
        </div>
        {/* Actions et authentification */}
        <div className="flex items-center gap-3">
          {/* Bouton de recherche mobile */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Search size={20} />
          </button>
          {/* Bouton de switch thème */}
          <ThemeToggle />
          {/* Notifications */}
          <SignedIn>
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>
            {/* Paramètres */}
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
            {/* Profil utilisateur */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-600">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-slate-800 border-slate-600",
                    userButtonPopoverActionButton: "text-slate-200 hover:bg-slate-700",
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
              >
                Connexion
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Inscription
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  )
} 