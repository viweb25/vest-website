'use client';

import React from 'react';
import { ServicePageTemplate } from '@/components/engineering-services/ServicePageTemplate';
import { servicePagesData } from '@/data/servicePages';

export default function StructuralEngineeringPage() {
  const data = servicePagesData['structural-engineering'];
  return <ServicePageTemplate data={data} />;
}
