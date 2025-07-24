// app/property/[id]/page.tsx
import { Metadata } from 'next';
import properties from '../../../../data/properties.json';
import Image from 'next/image';

// ✅ FIXED: params is not a Promise
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return {
      title: 'Property Not Found - Gidi Real Estate',
      description: 'This property could not be found.',
    };
  }

  return {
    title: `${property.title} | Gidi Real Estate`,
    description: property.description,
    openGraph: {
      title: `${property.title} | Gidi Real Estate`,
      description: property.description,
      images: [
        {
          url: property.image,
          width: 800,
          height: 600,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description,
      images: [property.image],
    },
  };
}

// ✅ Generate static params
export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

// ✅ Main page component
export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return <div className="p-4 text-red-500">Property not found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-300">{property.description}</p>
      <p className="text-xl text-primary font-bold mt-2">₦{property.price.toLocaleString()}</p>
      <p className="text-green-600 font-semibold mt-1">{property.type}</p>
      <p className="text-green-600 font-semibold mt-1">{property.location}</p>
    </div>
  );
}
