"use client";

import { useEffect, useState } from "react";
import { Property } from "../../../types/Property";
import PropertyCard from "../../../components/PropertyCard";
import Link from "next/link";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("properties");
    if (stored) {
      setProperties(JSON.parse(stored));
    }
  }, []);

  // Delete property
  const deleteProperty = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    localStorage.setItem("properties", JSON.stringify(updated));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Link
        href="/admin/add"
        className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add New Property
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="relative border rounded p-3 shadow">
              <PropertyCard property={property} />
              <div className="mt-2 flex justify-between">
                <Link
                  href={`/admin/edit/${property.id}`}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteProperty(property.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No properties found.</p>
        )}
      </div>
    </main>
  );
}
