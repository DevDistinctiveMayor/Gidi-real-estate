"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Property } from "../../../../types/Property";

export default function AddPropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Property, "id">>({
    title: "",
    description: "",
    price: 0,
    type: "",
    image: "", // will store Base64 string
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newProperty: Property = { ...formData, id };

    const existing = localStorage.getItem("properties");
    const properties: Property[] = existing ? JSON.parse(existing) : [];

    localStorage.setItem(
      "properties",
      JSON.stringify([...properties, newProperty])
    );

    router.push("/admin");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="price"
          type="text"
          value={Number(formData.price).toLocaleString()} // show formatted
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, ""); // remove commas
            const numericValue = parseInt(rawValue, 10);
            if (!isNaN(numericValue)) {
              setFormData((prev) => ({ ...prev, price: numericValue }));
            } else {
              setFormData((prev) => ({ ...prev, price: 0 }));
            }
          }}
          placeholder="Price"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (e.g. Apartment)"
          required
          className="w-full border px-3 py-2 rounded"
        />

          <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (e.g. Lagos)"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
        >
          Add Property
        </button>
      </form>
    </main>
  );
}
