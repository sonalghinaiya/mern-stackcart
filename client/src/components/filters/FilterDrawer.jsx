import React from "react";
import { X, SlidersHorizontal } from "lucide-react";

export default function FilterDrawer({
  filters,
  handleFilterChange,
  clearFilters,
  availableBrands,
  activeFiltersCount,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              <h3 className="font-bold text-lg">Filters</h3>
              {activeFiltersCount > 0 && (
                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                clearFilters();
                onClose();
              }}
              className="w-full mb-6 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 font-medium"
            >
              Clear All Filters
            </button>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Brands</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={filters.priceMin}
                  onChange={(e) =>
                    handleFilterChange("priceMin", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-gray-500 self-center">-</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={filters.priceMax}
                  onChange={(e) =>
                    handleFilterChange("priceMax", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Any Rating</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock === "true"}
                  onChange={(e) =>
                    handleFilterChange(
                      "inStock",
                      e.target.checked ? "true" : "",
                    )
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  In Stock Only
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.bestSeller === "true"}
                  onChange={(e) =>
                    handleFilterChange(
                      "bestSeller",
                      e.target.checked ? "true" : "",
                    )
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Best Sellers Only
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
