"use client";

import { useState } from "react";
import PropertyCard from "../../components/PropertyCard";
import dummyProperties from "../../data/properties.json";
import Link from "next/link";
export default function Home() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(100000000);

  const types = [
    "All",
    ...Array.from(new Set(dummyProperties.map((p) => p.type))),
  ];

  const filteredProperties = dummyProperties.filter((property) => {
    return (
      (selectedType === "All" || property.type === selectedType) &&
      property.price <= maxPrice
    );
  });

  return (

    <>
    <div className="flex justify-end mb-4">
      <Link
        href="/admin"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mt-4 mr-5"
      >
        Go to Admin Dashboard
      </Link>
    </div>
    <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Available Properties</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Property Type:
            </label>
            <select
              className="border rounded px-2 py-1"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">
              Max Price: ₦{maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="1000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-56" />
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              No properties match your filter.
            </p>
          )}
        </div>
      </main>
    </>
  );
  
}
