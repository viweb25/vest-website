const fs = require('fs');

const targets = [
  { file: 'components/structural-engineering/StructuralSections.tsx', key: 'structural-engineering' },
  { file: 'components/miscellaneous-steel-detailing/MiscSteelSections.tsx', key: 'miscellaneous-steel-detailing' },
  { file: 'components/bom-material-documentation/BomSections.tsx', key: 'bom-material-documentation' }
];

// Instead of importing, since it's a ts file, let's just hardcode the project replacements here.
const projects = {
  'structural-engineering': [
    {
      id: '01',
      category: 'Commercial High-Rise',
      title: 'Apex Corporate Center',
      scope: 'Complete structural steel detailing and connection design for a 45-story commercial tower.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tags: ['High-Rise', 'Steel Detailing', 'Complex Connections'],
      deliverables: [
        'Erection Drawings',
        'Fabrication Details',
        'Advanced BOM'
      ]
    }
  ],
  'miscellaneous-steel-detailing': [
    {
      id: '01',
      category: 'Industrial Facility',
      title: 'Nexus Processing Plant',
      scope: 'Detailing of over 50 custom access platforms, catwalks, and caged ladders for a large industrial plant.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      tags: ['Industrial', 'Platforms', 'OSHA'],
      deliverables: [
        'Platform Shop Drawings',
        'Ladder Details',
        'Grating BOM'
      ]
    }
  ],
  'bom-material-documentation': [
    {
      id: '01',
      category: 'Large-Scale Infrastructure',
      title: 'City Center Transit Hub',
      scope: 'Comprehensive material takeoffs and BOM generation for a complex transit hub project, saving the client 15% in material waste.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      tags: ['Infrastructure', 'Takeoffs', 'Cost Savings'],
      deliverables: [
        'Detailed Steel BOM',
        'Concrete Volume Reports',
        'Fastener Summaries'
      ]
    }
  ]
};

targets.forEach(t => {
  let content = fs.readFileSync(t.file, 'utf8');
  const data = projects[t.key];
  
  const projectsStr = 'const PROJECTS = ' + JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '$1:') + ';';

  // Replace everything between const PROJECTS = [ and the closing ];
  content = content.replace(/const PROJECTS = \[\s*\{[\s\S]*?\];/m, projectsStr);
  
  fs.writeFileSync(t.file, content);
  console.log('Updated projects in ' + t.file);
});
