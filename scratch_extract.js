const fs = require('fs');

const files = {
  'miscellaneous-steel-detailing': 'components/miscellaneous-steel-detailing/MiscSteelSections.tsx',
  'bom-material-documentation': 'components/bom-material-documentation/BomSections.tsx',
  'structural-engineering': 'components/structural-engineering/StructuralSections.tsx',
  'civil-engineering': 'components/civil-engineering/CivilSections.tsx'
};

let output = `import {
  ArrowRight, ChevronRight, ChevronLeft, FileText, Layers, LayoutTemplate, Archive, Grid, PenTool, BookOpen,
  ClipboardList, HardHat, Package, Target, Shield, FileSearch, Compass, CheckCircle2, Sparkles, ExternalLink,
  Sliders, Check, Building2, Factory, Cpu, Settings, Box, CheckSquare, Database
} from 'lucide-react';

export const servicePagesData: Record<string, any> = {
`;

for (const [key, path] of Object.entries(files)) {
  const content = fs.readFileSync('d:/AI/AILAVVIEW/repairsys-main/' + path, 'utf8');

  // Regexes to extract arrays/objects directly
  const servicesMatch = content.match(/const SERVICES = (\[[\s\S]*?\]);\s*const SERVICE_META/);
  const servicesStr = servicesMatch ? servicesMatch[1] : '[]';

  const metaMatch = content.match(/const SERVICE_META[^=]*= (\{[\s\S]*?\});\s*export function/);
  const metaStr = metaMatch ? metaMatch[1] : '{}';

  const workflowMatch = content.match(/const WORKFLOW = (\[[\s\S]*?\]);\s*export function EngineeringWorkflow/);
  const workflowStr = workflowMatch ? workflowMatch[1] : '[]';

  const projectsMatch = content.match(/const PROJECTS = (\[[\s\S]*?\]);\s*export function/);
  const projectsStr = projectsMatch ? projectsMatch[1] : '[]';

  // Extract text nodes for dynamic fields
  let overviewTitleMatch = content.match(/<motion\.h1[^>]*>([\s\S]*?)<\/motion\.h1>/);
  let overviewTitle = overviewTitleMatch ? overviewTitleMatch[1].replace(/<br[^>]*>/g, '\\n').replace(/<\/?span[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';

  let overviewDescMatch = content.match(/<ShimmerText[^>]*>([\s\S]*?)<\/ShimmerText>/);
  let overviewDesc = overviewDescMatch ? overviewDescMatch[1].trim() : '';

  let servicesTitleMatch = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  let servicesTitle = servicesTitleMatch ? servicesTitleMatch[1].replace(/<br[^>]*>/g, '\\n').replace(/\s+/g, ' ').trim() : '';
  
  let servicesDescMatch = content.match(/<ShimmerText[^>]*>([\s\S]*?)<\/ShimmerText>/g);
  let servicesDesc = servicesDescMatch && servicesDescMatch[1] ? servicesDescMatch[1].match(/>([\s\S]*?)<\/ShimmerText>/)[1].trim() : '';

  let workflowTitleMatch = content.match(/<motion\.h2[^>]*>([\s\S]*?)<\/motion\.h2>/);
  let workflowTitle = workflowTitleMatch ? workflowTitleMatch[1].replace(/<br[^>]*>/g, '\\n').replace(/\s+/g, ' ').trim() : '';

  let workflowDescMatch = content.match(/<ShimmerText[^>]*>([\s\S]*?)<\/ShimmerText>/g);
  let workflowDesc = workflowDescMatch && workflowDescMatch[2] ? workflowDescMatch[2].match(/>([\s\S]*?)<\/ShimmerText>/)[1].trim() : '';

  let galleryTitleMatch = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g);
  let galleryTitle = galleryTitleMatch && galleryTitleMatch[2] ? galleryTitleMatch[2].replace(/<br[^>]*>/g, '\\n').replace(/<\/?h2[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';

  let ctaTitleMatch = content.match(/<motion\.h2[^>]*>([\s\S]*?)<\/motion\.h2>/g);
  let ctaTitle = ctaTitleMatch && ctaTitleMatch[1] ? ctaTitleMatch[1].replace(/<br[^>]*>/g, '\\n').replace(/\s+/g, ' ').trim() : '';

  let ctaDescMatch = content.match(/<motion\.p[^>]*>([\s\S]*?)<\/motion\.p>/);
  let ctaDesc = ctaDescMatch ? ctaDescMatch[1].trim() : '';

  output += `  "${key}": {
    slug: "${key}",
    overview: {
      title: \`${overviewTitle}\`,
      description: \`${overviewDesc}\`,
      features: [
        { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
        { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
        { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' }
      ]
    },
    servicesTitle: \`${servicesTitle}\`,
    servicesDesc: \`${servicesDesc}\`,
    services: ${servicesStr},
    serviceMeta: ${metaStr},
    workflowTitle: \`${workflowTitle}\`,
    workflowDesc: \`${workflowDesc}\`,
    workflow: ${workflowStr},
    galleryTitle: \`${galleryTitle}\`,
    projects: ${projectsStr},
    ctaTitle: \`${ctaTitle}\`,
    ctaDesc: \`${ctaDesc}\`
  },
`;
}

output += `};`;

fs.writeFileSync('d:/AI/AILAVVIEW/repairsys-main/data/servicePages.ts', output);
console.log('Done!');
