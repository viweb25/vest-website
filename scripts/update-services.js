const fs = require('fs');

function updateServices(file, items) {
  let content = fs.readFileSync(file, 'utf8');
  
  const services = items.map((title, idx) => {
    const id = String(idx + 1).padStart(2, '0');
    return `  {
    id: '${id}',
    title: '${title}',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    heading: '${title.toUpperCase()}',
    desc: 'Professional ${title.toLowerCase()} for precision execution and engineering compliance.',
    features: [
      { name: 'Detailing', icon: FileText },
      { name: 'Documentation', icon: Layers },
      { name: 'Quality Check', icon: Shield },
      { name: 'Final Delivery', icon: CheckCircle2 }
    ]
  }`;
  });
  
  const meta = items.reduce((acc, title, idx) => {
    const id = String(idx + 1).padStart(2, '0');
    acc[id] = { type: 'ENGINEERING', ref: 'ENG-' + id, status: 'READY', rev: '01', shortTitle: title.split(' ')[0].toUpperCase() };
    return acc;
  }, {});

  const servicesStr = 'const SERVICES = [\n' + services.join(',\n') + '\n];';
  const metaStr = 'const SERVICE_META: Record<string, any> = ' + JSON.stringify(meta, null, 2) + ';';

  // Replace everything between const SERVICES = [ and the closing ];
  content = content.replace(/const SERVICES = \[\s*\{[\s\S]*?\];/m, servicesStr);
  
  // Replace SERVICE_META
  content = content.replace(/const SERVICE_META[^;]+;/m, metaStr);

  fs.writeFileSync(file, content);
}

updateServices('components/structural-engineering/StructuralSections.tsx', [
  'Structural Steel Detailing', 'Structural Drawings', 'Steel Fabrication Drawings', 
  'Erection Drawings', 'Connection Detailing', 'Member Detailing', 'Structural Documentation', 'Shop Drawings'
]);

updateServices('components/miscellaneous-steel-detailing/MiscSteelSections.tsx', [
  'Platforms', 'Staircases', 'Handrails', 'Ladders', 'Equipment Supports', 
  'Pipe Supports', 'Walkways', 'Miscellaneous Structures', 'Industrial Steel Components'
]);

updateServices('components/bom-material-documentation/BomSections.tsx', [
  'Bill of Materials', 'Material Take-Off', 'Quantity Take-Off', 'Fabrication Lists', 
  'Material Schedules', 'Component Lists', 'Procurement Support Documentation'
]);

console.log('Services updated successfully');
