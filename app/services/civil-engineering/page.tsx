'use client';

import React from 'react';
import { ServicePageTemplate } from '@/components/engineering-services/ServicePageTemplate';
import { servicePagesData } from '@/data/servicePages';

export default function CivilEngineeringPage() {
  const data = servicePagesData['civil-engineering'];
  return <ServicePageTemplate data={data} />;
}
