import type { EasterEgg } from '../types/museum';

export const INITIAL_EASTER_EGGS: EasterEgg[] = [
  {
    id: 'egg-shrug-spam',
    title: 'Punctuation Overload',
    trigger: 'Clicked 🤷‍♀️ specimen repeatedly',
    rewardMessage: '🤷‍♀️ frequency exceeding recommended safety parameters. System accepting reality.',
    discovered: false,
  },
  {
    id: 'egg-told-you',
    title: 'Retrospective Inevitability',
    trigger: 'Attempted to dispute "I Told U So" archive',
    rewardMessage: 'ARCHIVE ACCESS DENIED: You already know she was right. Case closed.',
    discovered: false,
  },
  {
    id: 'egg-staff-door',
    title: 'Staff Only Intrusion',
    trigger: 'Inspected "Do Not Enter" security hatch',
    rewardMessage: 'SECURITY LOG: You were specifically told not to enter. Typical visitor behavior.',
    discovered: false,
  },
  {
    id: 'egg-badge',
    title: 'Employee ID Scan',
    trigger: 'Discovered Curatorial Security Badge',
    rewardMessage: 'CURATOR CREDENTIAL: Sonal — Senior Architect / Storyteller / Professional Lore Generator.',
    discovered: false,
  },
  {
    id: 'egg-tactical-2v1',
    title: 'Tactical Asymmetry Confirmed',
    trigger: 'Examined Eunoia Technopolis records',
    rewardMessage: 'TACTICAL DISADVANTAGE CONFIRMED: Harleen vs (Tharishaa + Sonal) is mathematically unfair.',
    discovered: false,
  },
  {
    id: 'egg-gmd-infinite',
    title: 'The Infinite Isometric Grid',
    trigger: 'Activated GMD drafting compass since Class 9',
    rewardMessage: 'GEOMETRIC RECOGNITION: All triangles eventually converge into an origami swan.',
    discovered: false,
  },
];
