const fs = require('fs');

const workflows = {
  'structural-engineering': [
    {
      step: '01',
      title: 'Project Setup & Scope',
      category: 'Initiation',
      desc: 'Reviewing architectural intent and establishing structural load requirements.',
      icon: 'Settings',
      tag: 'Phase 01',
      metric: '100% Scope Lock'
    },
    {
      step: '02',
      title: 'Analysis & Design',
      category: 'Engineering',
      desc: 'Performing comprehensive structural analysis and optimizing member sizes.',
      icon: 'Box',
      tag: 'Phase 02',
      metric: 'Code Compliant'
    },
    {
      step: '03',
      title: 'Detailed Modeling',
      category: 'Drafting',
      desc: 'Creating precise 3D structural models and extracting accurate 2D drawings.',
      icon: 'Layers',
      tag: 'Phase 03',
      metric: 'LOD 350-400'
    }
  ],
  'miscellaneous-steel-detailing': [
    {
      step: '01',
      title: 'Design Review',
      category: 'Initiation',
      desc: 'Reviewing architectural intent and field measurements.',
      icon: 'FileSearch',
      tag: 'Phase 01',
      metric: 'Intent Match'
    },
    {
      step: '02',
      title: '3D Modeling',
      category: 'Drafting',
      desc: 'Creating accurate 3D models of complex miscellaneous steel elements.',
      icon: 'Box',
      tag: 'Phase 02',
      metric: 'High Precision'
    },
    {
      step: '03',
      title: 'Shop Drawings Generation',
      category: 'Documentation',
      desc: 'Extracting clear, accurate, and fully dimensioned shop drawings for fabrication.',
      icon: 'FileText',
      tag: 'Phase 03',
      metric: 'Shop-Ready'
    }
  ],
  'bom-material-documentation': [
    {
      step: '01',
      title: 'Model Validation',
      category: 'Preparation',
      desc: 'Ensuring the 3D model is fully detailed and attributed for accurate data extraction.',
      icon: 'CheckSquare',
      tag: 'Phase 01',
      metric: 'Data Integrity'
    },
    {
      step: '02',
      title: 'Data Extraction',
      category: 'Processing',
      desc: 'Running advanced scripts to extract precise quantities and material specifications.',
      icon: 'Database',
      tag: 'Phase 02',
      metric: '100% Accuracy'
    },
    {
      step: '03',
      title: 'Report Formatting',
      category: 'Delivery',
      desc: 'Formatting data into customized, easy-to-read reports tailored for procurement systems.',
      icon: 'FileText',
      tag: 'Phase 03',
      metric: 'ERP Ready'
    }
  ]
};

const targets = [
  { file: 'components/structural-engineering/StructuralSections.tsx', key: 'structural-engineering' },
  { file: 'components/miscellaneous-steel-detailing/MiscSteelSections.tsx', key: 'miscellaneous-steel-detailing' },
  { file: 'components/bom-material-documentation/BomSections.tsx', key: 'bom-material-documentation' }
];

targets.forEach(t => {
  let content = fs.readFileSync(t.file, 'utf8');
  const data = workflows[t.key];
  
  const workflowStr = 'const WORKFLOW = [\n' + data.map(item => {
    return `  {
    step: '${item.step}',
    title: '${item.title}',
    category: '${item.category}',
    desc: '${item.desc}',
    icon: ${item.icon},
    tag: '${item.tag}',
    metric: '${item.metric}'
  }`;
  }).join(',\n') + '\n];';

  content = content.replace(/const WORKFLOW = \[\s*\{[\s\S]*?\];/m, workflowStr);
  
  fs.writeFileSync(t.file, content);
  console.log('Updated workflow in ' + t.file);
});
