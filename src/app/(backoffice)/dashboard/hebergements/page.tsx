import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const hebergements = [
  {
    id: 1,
    nom: "Hôtel du Parc",
    description: "Hôtel 4 étoiles avec piscine et spa.",
    localisation: "Paris, France",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    nom: "Auberge de la Plage",
    description: "Auberge conviviale en bord de mer.",
    localisation: "Nice, France",
    createdAt: "2023-11-05",
  },
  {
    id: 3,
    nom: "Chalet Montagne",
    description: "Chalet tout équipé au pied des pistes.",
    localisation: "Chamonix, France",
    createdAt: "2024-02-20",
  },
];

export default function HebergementsSection() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Hébergements • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des hébergements</h1>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Localisation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Créé le</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {hebergements.map((h, index) => (
                <tr
                  key={h.id}
                  className={`hover:bg-gray-750 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                      {h.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{h.nom}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-xs text-gray-400 truncate" title={h.description}>
                      {h.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">{h.localisation}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400">{h.createdAt}</span>
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
          {hebergements.length} hébergement{hebergements.length > 1 ? "s" : ""} au total
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