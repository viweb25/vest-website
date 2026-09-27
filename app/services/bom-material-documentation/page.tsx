'use client';

import React from 'react';
import { ServicePageTemplate } from '@/components/engineering-services/ServicePageTemplate';
import { servicePagesData } from '@/data/servicePages';

export default function BomMaterialDocumentationPage() {
  const data = servicePagesData['bom-material-documentation'];
  return <ServicePageTemplate data={data} />;
}
