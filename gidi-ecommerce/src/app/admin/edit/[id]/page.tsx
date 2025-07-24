'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Property } from '../../../../../types/Property';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;

  const [formData, setFormData] = useState<Property | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('properties');
    const properties: Property[] = stored ? JSON.parse(stored) : [];

    const propertyToEdit = properties.find(p => p.id === propertyId);
    if (!propertyToEdit) {
      alert('Property not found');
      router.push('/admin');
    } else {
      setFormData(propertyToEdit);
    }
  }, [propertyId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => prev ? { ...prev, image: reader.result as string } : null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const stored = localStorage.getItem('properties');
    const properties: Property[] = stored ? JSON.parse(stored) : [];

    const updatedProperties = properties.map(p => p.id === propertyId ? formData : p);

    localStorage.setItem('properties', JSON.stringify(updatedProperties));

    router.push('/admin');
  };

  if (!formData) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
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
          type="number"
          value={formData.price}
          onChange={handleChange}
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
          placeholder="Location"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Property
        </button>
      </form>
    </main>
  );
}
