"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Hébergements", href: "/dashboard/hebergements" },
  { label: "Types de chambre", href: "/dashboard/typechambres" },
  { label: "Chambres", href: "/dashboard/chambres" },
  { label: "Réservations", href: "/dashboard/reservations" },
  { label: "Paiements", href: "/dashboard/paiements" },
  { label: "Vidéos privées", href: "/dashboard/videosprivees" },
  { label: "Photos", href: "/dashboard/photos" },
  { label: "Voitures", href: "/dashboard/voitures" },
  { label: "Activités", href: "/dashboard/activites" },
  { label: "Utilisateurs", href: "/dashboard/utilisateurs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 text-white border-r p-4 min-h-screen">
      <nav className="space-y-2">
        {menu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded transition-colors font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-gray-800 hover:text-blue-300 text-gray-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 