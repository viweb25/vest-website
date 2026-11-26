import ProductDetailsClient from "./ProductDetailsClient";

export function generateStaticParams() {
  return [
    { id: "compactdaq" },
    { id: "compactrio" },
    { id: "pxi" },
    { id: "labview-suite" },
    { id: "erp" },
    { id: "repairsync" },
    { id: "auto-posting" },
    { id: "puro" },
  ];
}

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailsClient params={params} />;
}
