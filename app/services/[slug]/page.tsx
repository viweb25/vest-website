import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceData, getAllServiceSlugs, SERVICES_DATA } from '@/data/servicesData';
import ServiceTemplate from '@/components/services/ServiceTemplate';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const allSlugs = getAllServiceSlugs();
  return allSlugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceData(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found | VEST Solutions',
    };
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    keywords: service.meta.keywords,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      type: 'website',
      url: `https://vestsolutions.com/services/${service.slug}`,
    },
  };
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = getServiceData(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceTemplate data={service} />;
}

