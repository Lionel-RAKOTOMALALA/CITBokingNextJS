import Link from "next/link";
import { ReactNode } from "react";

const menu = [
  { label: "Hébergements", href: "/(backoffice)/dashboard/hebergements" },
  { label: "Types de chambre", href: "/(backoffice)/dashboard/typechambres" },
  { label: "Chambres", href: "/(backoffice)/dashboard/chambres" },
  { label: "Réservations", href: "/(backoffice)/dashboard/reservations" },
  { label: "Paiements", href: "/(backoffice)/dashboard/paiements" },
  { label: "Vidéos privées", href: "/(backoffice)/dashboard/videosprivees" },
  { label: "Photos", href: "/(backoffice)/dashboard/photos" },
  { label: "Voitures", href: "/(backoffice)/dashboard/voitures" },
  { label: "Activités", href: "/(backoffice)/dashboard/activites" },
  { label: "Utilisateurs", href: "/(backoffice)/dashboard/utilisateurs" },
];

export default function BackofficeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 border-r p-4">
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 