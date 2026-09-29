'use client';

import React from 'react';
import { ServicePageTemplate } from '@/components/engineering-services/ServicePageTemplate';
import { servicePagesData } from '@/data/servicePages';

export default function MiscSteelDetailingPage() {
  const data = servicePagesData['miscellaneous-steel-detailing'];
  return <ServicePageTemplate data={data} />;
}
