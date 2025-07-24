// app/property/[id]/page.tsx
import { Metadata } from 'next';
import { Property } from '../../../../types/Property';
import properties from '../../../../data/properties.json';
import Image from 'next/image';

// SEO Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return {
      title: 'Property Not Found - Gidi Real Estate',
      description: 'The property you are looking for could not be found.',
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

// Component
interface Props {
  params: { id: string };
}

export default function PropertyDetailsPage({ params }: Props) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return <div className="p-4 text-red-500">Property not found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-gray-300">{property.description}</p>
      <p className="text-xl text-primary font-bold mt-2">₦{property.price.toLocaleString()}</p>
      <p className="text-green-600 font-semibold mt-1">{property.type}</p>
      <p className="text-green-600 font-semibold mt-1">{property.location}</p>
    </div>
  );
}
