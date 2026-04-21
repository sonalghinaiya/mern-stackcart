import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import ProductCard from "../../components/product/ProductCard";
import ProductSkeleton from "../../components/product/ProductSkeleton";
import toast from "react-hot-toast";

function ProductList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    brand: searchParams.get("brand") || "",
    rating: searchParams.get("rating") || "",
    inStock: searchParams.get("inStock") || "",
    bestSeller: searchParams.get("bestSeller") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    order: searchParams.get("order") || "desc",
    page: Number(searchParams.get("page")) || 1,
  });

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
  });

  const [availableBrands, setAvailableBrands] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};

      if (filters.search) params.name = filters.search;
      if (filters.brand) params.brand = filters.brand;
      if (filters.rating) params.rating = filters.rating;
      if (filters.inStock) params.inStock = filters.inStock;
      if (filters.bestSeller) params.bestSeller = filters.bestSeller;
      if (filters.priceMin) params.priceMin = filters.priceMin;
      if (filters.priceMax) params.priceMax = filters.priceMax;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.order) params.order = filters.order;

      params.page = filters.page;
      params.limit = 8;

      const res = await api.get("/products", { params });

      setProducts(res.data.data);
      setPagination({
        totalPages: res.data.pagination.totalPages,
        totalItems: res.data.pagination.totalItems,
        currentPage: res.data.pagination.page,
      });

      const brands = [...new Set(res.data.data.map((p) => p.brand))];
      setAvailableBrands(brands);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params[key] = filters[key];
      }
    });

    setSearchParams(params);
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      brand: "",
      rating: "",
      inStock: "",
      bestSeller: "",
      priceMin: "",
      priceMax: "",
      sortBy: "createdAt",
      order: "desc",
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFiltersCount = [
    filters.brand,
    filters.rating,
    filters.inStock,
    filters.bestSeller,
    filters.priceMin,
    filters.priceMax,
  ].filter(Boolean).length;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          All Products
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <select
            value={`${filters.sortBy}-${filters.order}`}
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split("-");
              setFilters((prev) => ({ ...prev, sortBy, order, page: 1 }));
            }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto justify-center"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-white text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {products.length} of {pagination.totalItems} products
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
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
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) =>
                        handleFilterChange("priceMin", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-gray-500 self-center">-</span>
                    <input
                      type="number"
                      placeholder="Max"
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
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4★ & above</option>
                    <option value="3">3★ & above</option>
                    <option value="2">2★ & above</option>
                    <option value="1">1★ & above</option>
                  </select>
                </div>

                <div>
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
                </div>

                <div>
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
            </div>
          </div>
        )}

        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>

          {!loading && products.length > 0 && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span className="px-3 py-2">...</span>
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg border ${
                              pagination.currentPage === page
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg border ${
                          pagination.currentPage === page
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
