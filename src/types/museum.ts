export type RoomId = 
  | 'exterior'
  | 'facade'
  | 'floorplan'
  | 'architecture'
  | 'studio'
  | 'academic'
  | 'archive'
  | 'stories'
  | 'cinema'
  | 'kiddish'
  | 'hidden'
  | 'corridor'
  | 'rooftop';

// New immersive experience types
export type ScenePhase =
  | 'loading'
  | 'exterior'
  | 'lobby'
  | 'elevator'
  | 'floor'
  | 'rooftop';

export type FloorId = 1 | 2 | 3 | 4 | 5;

export interface ElevatorFloor {
  id: FloorId;
  label: string;
  name: string;
  subtitle: string;
  color: string;
}

export interface RoomDefinition {
  id: RoomId;
  number: string;
  name: string;
  subtitle: string;
  level: string;
  sectorCode: string;
  description: string;
}

export interface ExhibitItem {
  id: string;
  title: string;
  subtitle?: string;
  classification: string;
  medium?: string;
  catalogId: string;
  description: string[];
  meta?: { label: string; value: string }[];
  tag?: string;
  interactiveHint?: string;
  quote?: string;
}

export interface FloorPlanSector {
  id: string;
  name: string;
  code: string;
  roomId?: RoomId;
  status: 'accessible' | 'classified' | 'unmapped' | 'hidden';
  notes: string;
  gridCoords: { x: number; y: number; w: number; h: number };
}

export interface EasterEgg {
  id: string;
  title: string;
  trigger: string;
  rewardMessage: string;
  discovered: boolean;
}
