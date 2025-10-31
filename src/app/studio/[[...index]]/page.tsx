'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '@/lib/sanity/schemas';
import StudioWrapper from '@/components/StudioWrapper';

const config = defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});

export default function StudioPage() {
  // Sanity Studio has built-in authentication
  // Users must log in with a Sanity account that has access to your project
  // Even if someone navigates here, they can't edit without proper Sanity credentials
  return (
    <StudioWrapper>
      <NextStudio config={config} />
    </StudioWrapper>
  );
}
