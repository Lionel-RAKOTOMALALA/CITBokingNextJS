import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Image from "next/image";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    hebergement: "Hôtel du Parc",
    description: "Façade de l'hôtel au printemps.",
    dateAjout: "2024-07-01",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    hebergement: "Auberge de la Plage",
    description: "Vue sur la plage depuis la terrasse.",
    dateAjout: "2024-06-15",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    hebergement: "Chalet Montagne",
    description: "Chalet sous la neige.",
    dateAjout: "2024-05-20",
  },
];

export default function PhotosSection() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Photos • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des photos</h1>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg">
          <FaPlus className="text-xs" />
          Ajouter
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Recherche..."
            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-200 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-750 border-b border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Id</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Hébergement</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Ajoutée le</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {photos.map((p, index) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-750 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                      {p.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-16 h-10 rounded overflow-hidden border border-gray-600">
                      <Image
                        src={p.url || "/placeholder.svg"}
                        alt={p.description}
                        width={48}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">{p.hebergement}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-xs text-gray-400 truncate" title={p.description}>
                      {p.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400">{p.dateAjout}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150">
                        <FaEdit className="text-xs" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150">
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer avec pagination compacte */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {photos.length} photo{photos.length > 1 ? "s" : ""} au total
        </span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">‹</button>
          <button className="px-3 py-1 bg-orange-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">›</button>
        </div>
      </div>
    </div>
  );
} 