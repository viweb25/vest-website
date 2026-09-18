import { auditProblems, SupportedLanguage } from '@/data/auditProblems';

export type Zone = 
  | 'tl' | 'tcl' | 'tr' 
  | 'ml' | 'mr' 
  | 'bl' | 'bcl' | 'br'
  | 'fl' | 'fr'
  | 'uml' | 'umr';

export const ALL_ZONES: Zone[] = [
  'tl', 'tcl', 'tr', 
  'ml', 'mr', 
  'bl', 'bcl', 'br',
  'fl', 'fr',
  'uml', 'umr'
];

export const MOBILE_ZONES: Zone[] = ['tl', 'tr', 'ml', 'mr', 'bl', 'br'];
export const TABLET_ZONES: Zone[] = ['tl', 'tcl', 'tr', 'ml', 'mr', 'bl', 'bcl', 'br'];

export interface PositionConfig {
  x: number;
  y: number;
}

export interface FloatingItemState {
  id: string; // The specific node ID e.g., 'node-1'
  problemId: string;
  text: string;
  language: SupportedLanguage;
  zone: Zone;
  enterDir: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const LANGUAGES: SupportedLanguage[] = ['en', 'ta', 'hi', 'ja', 'de'];

class FloatingTextScheduler {
  private occupiedZones = new Set<Zone>();
  private textHistory: string[] = []; // problemIds
  private nodeZoneHistory: Record<string, Zone[]> = {}; // nodeId -> zones
  private nodeLanguageHistory: Record<string, SupportedLanguage> = {}; // nodeId -> last lang
  
  // Keep history arrays bounded
  private MAX_TEXT_HISTORY = 10;
  private MAX_ZONE_HISTORY = 4; // minimum 3 position cooldown, so we keep 4 to check against

  // Get random entrance direction based on zone side
  private getEntryDir(zone: Zone): FloatingItemState['enterDir'] {
    if (zone.includes('l')) return 'left';
    if (zone.includes('r')) return 'right';
    if (zone.includes('t')) return 'top';
    if (zone.includes('b')) return 'bottom';
    return 'top';
  }

  // Choose next state for a node
  public getNextState(
    nodeId: string, 
    currentZone: Zone | null,
    isMobile: boolean = false,
    isTablet: boolean = false
  ): FloatingItemState | null {
    
    // 1. Determine available zones
    let validZones = isMobile ? MOBILE_ZONES : (isTablet ? TABLET_ZONES : ALL_ZONES);
    
    // Remove currently occupied zones
    validZones = validZones.filter(z => !this.occupiedZones.has(z) || z === currentZone);
    
    // Remove this node's recent zones
    const pastZones = this.nodeZoneHistory[nodeId] || [];
    validZones = validZones.filter(z => !pastZones.includes(z));

    if (validZones.length === 0) {
      // Fallback if we somehow run out of zones
      validZones = [isMobile ? 'tl' : 'ml'];
    }

    const nextZone = validZones[Math.floor(Math.random() * validZones.length)];

    // Update Zone History
    if (currentZone) {
      this.occupiedZones.delete(currentZone);
    }
    this.occupiedZones.add(nextZone);
    
    if (!this.nodeZoneHistory[nodeId]) {
      this.nodeZoneHistory[nodeId] = [];
    }
    this.nodeZoneHistory[nodeId].unshift(nextZone);
    if (this.nodeZoneHistory[nodeId].length > this.MAX_ZONE_HISTORY) {
      this.nodeZoneHistory[nodeId].pop();
    }

    // 2. Select Text
    const availableProblems = auditProblems.filter(p => !this.textHistory.includes(p.id));
    const selectedProblem = availableProblems.length > 0 
      ? availableProblems[Math.floor(Math.random() * availableProblems.length)]
      : auditProblems[Math.floor(Math.random() * auditProblems.length)]; // Fallback

    // Update Text History
    this.textHistory.push(selectedProblem.id);
    if (this.textHistory.length > this.MAX_TEXT_HISTORY) {
      this.textHistory.shift();
    }

    // 3. Select Language (Cycle if it has translations)
    let nextLang: SupportedLanguage = 'en';
    if (selectedProblem.translations) {
      const currentLang = this.nodeLanguageHistory[nodeId] || 'en';
      const availableLangs = Object.keys(selectedProblem.translations) as SupportedLanguage[];
      if (availableLangs.length > 1) {
        // Pick a random language that isn't the immediate last one for this node
        const otherLangs = availableLangs.filter(l => l !== currentLang);
        nextLang = otherLangs[Math.floor(Math.random() * otherLangs.length)] || 'en';
      }
    }
    this.nodeLanguageHistory[nodeId] = nextLang;

    const displayString = selectedProblem.translations?.[nextLang] || selectedProblem.text;

    return {
      id: nodeId,
      problemId: selectedProblem.id,
      text: displayString,
      language: nextLang,
      zone: nextZone,
      enterDir: this.getEntryDir(nextZone)
    };
  }
  
  public reset() {
    this.occupiedZones.clear();
    this.textHistory = [];
    this.nodeZoneHistory = {};
    this.nodeLanguageHistory = {};
  }
}

// Export singleton instance
export const textScheduler = new FloatingTextScheduler();
