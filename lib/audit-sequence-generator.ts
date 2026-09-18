import { auditProblems, AuditProblem } from '@/data/auditProblems';

export type Zone = 'tl' | 'tc' | 'tr' | 'ml' | 'mr' | 'bl' | 'bc' | 'br';

export interface FloatingItem {
  id: string; // The unique ID from auditProblems, acts as the key
  text: string;
  zone: Zone;
  enterDir: { x: number; y: number }; // Relative direction from where it enters
}

export interface AuditState {
  step: number;
  activeProblem: AuditProblem;
  floatingItems: FloatingItem[];
  progress: number;
  diagnosedCount: number;
}

const ALL_ZONES: Zone[] = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];

// Helper to get entry direction based on zone
function getEntryDir(zone: Zone) {
  switch (zone) {
    case 'tl': return { x: -30, y: -20 };
    case 'tc': return { x: 0, y: -30 };
    case 'tr': return { x: 30, y: -20 };
    case 'ml': return { x: -40, y: 0 };
    case 'mr': return { x: 40, y: 0 };
    case 'bl': return { x: -30, y: 20 };
    case 'bc': return { x: 0, y: 30 };
    case 'br': return { x: 30, y: 20 };
    default: return { x: 0, y: 0 };
  }
}

export function generateAuditSequence(totalSteps: number = 20): AuditState[] {
  const states: AuditState[] = [];
  
  // Track history to enforce rules
  const recentTexts: string[] = []; // Track recently used problem IDs (active or floating)
  const textZoneHistory: Record<string, Zone[]> = {}; // Track which zones a text has used recently
  
  // Starting count for the diagnostic indicator
  let currentCount = 189;

  for (let step = 0; step < totalSteps; step++) {
    const availableProblems = [...auditProblems];
    
    // 1. Pick Active Problem (Center)
    // Must not be in recentTexts (last 8)
    const validActive = availableProblems.filter(p => !recentTexts.includes(p.id));
    const activeProblem = validActive[Math.floor(Math.random() * validActive.length)] || availableProblems[0];
    
    recentTexts.push(activeProblem.id);
    if (recentTexts.length > 10) recentTexts.shift(); // Keep history size bounded
    
    // 2. Pick Floating Problems (7-8 items)
    const numFloating = 7 + Math.floor(Math.random() * 2); // 7 or 8 items
    const floatingItems: FloatingItem[] = [];
    const usedZonesInThisStep = new Set<Zone>();
    
    for (let i = 0; i < numFloating; i++) {
      // Find a valid text that is not currently active, not in recentTexts
      const validFloating = availableProblems.filter(p => !recentTexts.includes(p.id));
      if (validFloating.length === 0) break;
      
      const prob = validFloating[Math.floor(Math.random() * validFloating.length)];
      
      // Find a valid zone for this problem
      // Rule: Zone not used in this step, AND zone not in this problem's past 3 zones
      const pastZones = textZoneHistory[prob.id] || [];
      const validZones = ALL_ZONES.filter(z => !usedZonesInThisStep.has(z) && !pastZones.includes(z));
      
      if (validZones.length === 0) continue; // Skip if no valid zone found for this problem
      
      const zone = validZones[Math.floor(Math.random() * validZones.length)];
      
      // Assign
      usedZonesInThisStep.add(zone);
      floatingItems.push({
        id: prob.id,
        text: prob.text,
        zone,
        enterDir: getEntryDir(zone)
      });
      
      // Update Histories
      recentTexts.push(prob.id);
      if (recentTexts.length > 10) recentTexts.shift();
      
      if (!textZoneHistory[prob.id]) textZoneHistory[prob.id] = [];
      textZoneHistory[prob.id].unshift(zone); // Add to front
      if (textZoneHistory[prob.id].length > 3) textZoneHistory[prob.id].pop(); // Keep only last 3
    }
    
    // Random increment for the counter
    currentCount += Math.floor(Math.random() * 5) + 2;
    
    states.push({
      step,
      activeProblem,
      floatingItems,
      progress: Math.round((step / (totalSteps - 1)) * 100),
      diagnosedCount: currentCount
    });
  }
  
  return states;
}
