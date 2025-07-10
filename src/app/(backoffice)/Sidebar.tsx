"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Bed,
  DoorOpen,
  Calendar,
  CreditCard,
  Video,
  Camera,
  Car,
  MapPin,
  Users,
  ChevronRight,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Shield,
} from "lucide-react"

const menu = [
  {
    label: "Hébergements",
    href: "/dashboard/hebergements",
    icon: Home,
    description: "Gestion des hébergements",
  },
  {
    label: "Types de chambre",
    href: "/dashboard/typechambres",
    icon: Bed,
    description: "Configuration des types",
  },
  {
    label: "Chambres",
    href: "/dashboard/chambres",
    icon: DoorOpen,
    description: "Gestion des chambres",
  },
  {
    label: "Réservations",
    href: "/dashboard/reservations",
    icon: Calendar,
    description: "Suivi des réservations",
  },
  {
    label: "Paiements",
    href: "/dashboard/paiements",
    icon: CreditCard,
    description: "Gestion financière",
  },
  {
    label: "Vidéos privées",
    href: "/dashboard/videosprivees",
    icon: Video,
    description: "Contenu multimédia",
  },
  {
    label: "Photos",
    href: "/dashboard/photos",
    icon: Camera,
    description: "Galerie d'images",
  },
  {
    label: "Voitures",
    href: "/dashboard/voitures",
    icon: Car,
    description: "Parc automobile",
  },
  {
    label: "Activités",
    href: "/dashboard/activites",
    icon: MapPin,
    description: "Activités touristiques",
  },
  {
    label: "Utilisateurs",
    href: "/dashboard/utilisateurs",
    icon: Users,
    description: "Gestion des comptes",
  },
  
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <style jsx>{`
        /* Custom scrollbar styles */
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgb(30 41 59);
          border-radius: 3px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgb(71 85 105);
          border-radius: 3px;
          transition: background-color 0.2s;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgb(100 116 139);
        }
        
        /* Firefox scrollbar */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgb(71 85 105) rgb(30 41 59);
        }
      `}</style>

      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white border-r border-slate-700 min-h-screen flex flex-col shadow-2xl overflow-hidden">
        {/* Header/Logo Section - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏨</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dashboard</h2>
              <p className="text-xs text-slate-400">Centre Touristique</p>
            </div>
          </div>
        </div>
        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1 scrollbar-custom">
          {menu.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transform scale-[1.02]"
                    : "hover:bg-slate-700/50 text-slate-300 hover:text-white hover:transform hover:scale-[1.01]"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
                )}
                {/* Icon */}
                <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-orange-400"}`}>
                  <Icon size={20} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm ${isActive ? "text-white" : "text-slate-200"}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-orange-100" : "text-slate-500 group-hover:text-slate-400"}`}>
                    {item.description}
                  </div>
                </div>
                {/* Arrow indicator */}
                <ChevronRight
                  size={16}
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    isActive
                      ? "text-white transform rotate-90"
                      : "text-slate-500 group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1"
                  }`}
                />
              </Link>
            )
          })}
        </nav>
        {/* Footer - Fixed */}
        <div className="flex-shrink-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">Admin</div>
              <div className="text-xs text-slate-400">En ligne</div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </aside>
    </>
  )
}
  