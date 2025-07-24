import type { Property } from "../types/Property";
import Image from "next/image";
import Link from "next/link";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-md transition">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-3">{property.title}</h2>
      <p className="text-sm text-gray-600">{property.description}</p>
      <p className="text-primary font-bold text-xl mb-2">
        ₦{property.price.toLocaleString()}
      </p>
      <div className="mt-2 font-bold text-green-600">{property.type}</div>
      <div className="mt-2 font-bold text-green-600">{property.location}</div>

      <Link
        href={`/property/${property.id}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
