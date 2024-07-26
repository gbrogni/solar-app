import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { ProductType } from '../Navbar/Navbar';

interface SearchPageProps {
  searchParams: { query?: string; type?: string };
}

export function generateMetadata({
  searchParams: { query, type },
}: SearchPageProps): Metadata {
  const title = query ? `Search: ${query}` : "Search";
  const typeTitle = type ? `Type: ${type}` : "";
  return {
    title: `${title} ${typeTitle} - Flowmazon`,
  };
}

export default async function SearchPage({
  searchParams: { query, type },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      AND: [
        query ? { name: { contains: query, mode: "insensitive" } } : {},
        type ? { type: { equals: type as ProductType } } : {},
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}