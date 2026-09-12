import { AnimalProfile, AnimalCategory } from '../types';

export const ANIMALS_DATABASE: Record<string, AnimalProfile> = {
  Fox: {
    name: 'Fox',
    category: 'Animal',
    emoji: '🦊',
    subtitle: 'Clever, observant & quick-witted',
    colorTheme: {
      primary: '#f97316', // orange-500
      secondary: '#ea580c',
      accent: '#fb923c',
      glow: 'rgba(249, 115, 22, 0.45)',
      border: 'border-orange-500/40',
      bgGradient: 'from-orange-950/70 via-stone-900/80 to-amber-950/40',
    },
    traits: ['Inquisitive eyes', 'Sharp, defined angles', 'Nimble expressiveness'],
    funFact: 'Foxes have remarkable hearing and whiskers on their legs to help navigate brush.',
  },
  Lion: {
    name: 'Lion',
    category: 'Animal',
    emoji: '🦁',
    subtitle: 'Regal, commanding & brave',
    colorTheme: {
      primary: '#eab308', // yellow-500
      secondary: '#ca8a04',
      accent: '#facc15',
      glow: 'rgba(234, 179, 8, 0.45)',
      border: 'border-yellow-500/40',
      bgGradient: 'from-amber-950/70 via-stone-900/80 to-yellow-950/40',
    },
    traits: ['Voluminous crown presence', 'Proud, grounded gaze', 'Warm radiant warmth'],
    funFact: 'A lion’s roar can be heard from up to 5 miles (8 kilometers) away.',
  },
  Panda: {
    name: 'Panda',
    category: 'Animal',
    emoji: '🐼',
    subtitle: 'Charming, gentle & zen',
    colorTheme: {
      primary: '#10b981', // emerald-500
      secondary: '#059669',
      accent: '#34d399',
      glow: 'rgba(16, 185, 129, 0.4)',
      border: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950/70 via-stone-900/80 to-teal-950/40',
    },
    traits: ['Gentle soft contours', 'Calm peaceful eyes', 'Endearing approachable aura'],
    funFact: 'Pandas spend about 12 hours every single day leisurely munching bamboo.',
  },
  Tiger: {
    name: 'Tiger',
    category: 'Animal',
    emoji: '🐯',
    subtitle: 'Magnetic, fierce & focused',
    colorTheme: {
      primary: '#f59e0b', // amber-500
      secondary: '#d97706',
      accent: '#fbbf24',
      glow: 'rgba(245, 158, 11, 0.45)',
      border: 'border-amber-500/40',
      bgGradient: 'from-amber-950/70 via-stone-900/80 to-orange-950/40',
    },
    traits: ['Piercing focused gaze', 'Distinctive natural charisma', 'Steely composure'],
    funFact: 'No two tigers have the exact same stripe pattern — each is completely unique.',
  },
  Owl: {
    name: 'Owl',
    category: 'Bird',
    emoji: '🦉',
    subtitle: 'Wise, perceptive & nocturnal',
    colorTheme: {
      primary: '#8b5cf6', // violet-500
      secondary: '#7c3aed',
      accent: '#a78bfa',
      glow: 'rgba(139, 92, 246, 0.45)',
      border: 'border-violet-500/40',
      bgGradient: 'from-purple-950/70 via-stone-900/80 to-indigo-950/40',
    },
    traits: ['Wide curious eyes', 'Intense contemplative focus', 'Serene silent elegance'],
    funFact: 'Owls can turn their heads up to 270 degrees without moving their bodies.',
  },
  Eagle: {
    name: 'Eagle',
    category: 'Bird',
    emoji: '🦅',
    subtitle: 'Visionary, noble & soaring',
    colorTheme: {
      primary: '#0ea5e9', // sky-500
      secondary: '#0284c7',
      accent: '#38bdf8',
      glow: 'rgba(14, 165, 233, 0.45)',
      border: 'border-sky-500/40',
      bgGradient: 'from-sky-950/70 via-stone-900/80 to-blue-950/40',
    },
    traits: ['Sharp visionary brow', 'Elevated commanding posture', 'Keen perceptive depth'],
    funFact: 'Eagles can spot prey from over two miles away while cruising high in the skies.',
  },
  Butterfly: {
    name: 'Butterfly',
    category: 'Insect',
    emoji: '🦋',
    subtitle: 'Graceful, vibrant & transformative',
    colorTheme: {
      primary: '#ec4899', // pink-500
      secondary: '#db2777',
      accent: '#f472b6',
      glow: 'rgba(236, 72, 153, 0.45)',
      border: 'border-pink-500/40',
      bgGradient: 'from-pink-950/70 via-stone-900/80 to-purple-950/40',
    },
    traits: ['Delicate luminous balance', 'Radiant colorful smile', 'Lighthearted breezy poise'],
    funFact: 'Butterflies taste things using sensor receptors located on their feet.',
  },
  Rabbit: {
    name: 'Rabbit',
    category: 'Animal',
    emoji: '🐰',
    subtitle: 'Alert, gentle & sprightly',
    colorTheme: {
      primary: '#f43f5e', // rose-500
      secondary: '#e11d48',
      accent: '#fb7185',
      glow: 'rgba(244, 63, 94, 0.45)',
      border: 'border-rose-500/40',
      bgGradient: 'from-rose-950/70 via-stone-900/80 to-pink-950/40',
    },
    traits: ['Bright alert eyes', 'Soft welcoming cheeks', 'Quick, sensitive expressions'],
    funFact: 'When rabbits are overjoyed, they perform a happy jump-twist called a binky.',
  },
  Monkey: {
    name: 'Monkey',
    category: 'Animal',
    emoji: '🐵',
    subtitle: 'Playful, curious & agile',
    colorTheme: {
      primary: '#10b981', // emerald-500
      secondary: '#059669',
      accent: '#6ee7b7',
      glow: 'rgba(16, 185, 129, 0.45)',
      border: 'border-emerald-500/40',
      bgGradient: 'from-teal-950/70 via-stone-900/80 to-emerald-950/40',
    },
    traits: ['Mischievous twinkling gaze', 'Dynamic expressive mouth', 'Curious inquisitive tilt'],
    funFact: 'Monkeys use distinct vocal alarms to warn friends of specific approaching animals.',
  },
  Frog: {
    name: 'Frog',
    category: 'Animal',
    emoji: '🐸',
    subtitle: 'Adaptable, lively & tranquil',
    colorTheme: {
      primary: '#22c55e', // green-500
      secondary: '#16a34a',
      accent: '#4ade80',
      glow: 'rgba(34, 197, 94, 0.45)',
      border: 'border-green-500/40',
      bgGradient: 'from-green-950/70 via-stone-900/80 to-lime-950/40',
    },
    traits: ['Wide luminous eyes', 'Calm contented smile', 'Adaptable grounded composure'],
    funFact: 'Some tree frogs can jump up to 50 times their own body length in a single bound.',
  },
  Koala: {
    name: 'Koala',
    category: 'Animal',
    emoji: '🐨',
    subtitle: 'Cozy, peaceful & relaxed',
    colorTheme: {
      primary: '#94a3b8', // slate-400
      secondary: '#64748b',
      accent: '#cbd5e1',
      glow: 'rgba(148, 163, 184, 0.45)',
      border: 'border-slate-400/40',
      bgGradient: 'from-slate-900/80 via-stone-900/80 to-zinc-900/80',
    },
    traits: ['Placid relaxed features', 'Soft rounded ear framing', 'Serene unhurried aura'],
    funFact: 'Koalas sleep up to 20 hours a day comfortably wedged in eucalyptus branches.',
  },
  Deer: {
    name: 'Deer',
    category: 'Animal',
    emoji: '🦌',
    subtitle: 'Graceful, gentle & intuitive',
    colorTheme: {
      primary: '#d97706', // amber-600
      secondary: '#b45309',
      accent: '#f59e0b',
      glow: 'rgba(217, 119, 6, 0.45)',
      border: 'border-amber-600/40',
      bgGradient: 'from-amber-950/70 via-stone-900/80 to-stone-950/40',
    },
    traits: ['Large soulful eyes', 'Graceful slender facial lines', 'Sensitive intuitive gaze'],
    funFact: 'Deer have 310-degree field of vision and can leap over obstacles up to 8 feet high.',
  },
  Wolf: {
    name: 'Wolf',
    category: 'Animal',
    emoji: '🐺',
    subtitle: 'Loyal, instinctual & charismatic',
    colorTheme: {
      primary: '#6366f1', // indigo-500
      secondary: '#4f46e5',
      accent: '#818cf8',
      glow: 'rgba(99, 102, 241, 0.45)',
      border: 'border-indigo-500/40',
      bgGradient: 'from-indigo-950/70 via-stone-900/80 to-slate-950/40',
    },
    traits: ['Steadfast focused intensity', 'Sculpted strong jawline', 'Loyal pack-leader poise'],
    funFact: 'Wolves develop complex relationships and howl to rally pack members and greet friends.',
  },
  Cat: {
    name: 'Cat',
    category: 'Animal',
    emoji: '🐱',
    subtitle: 'Independent, sleek & observant',
    colorTheme: {
      primary: '#a855f7', // purple-500
      secondary: '#9333ea',
      accent: '#c084fc',
      glow: 'rgba(168, 85, 247, 0.45)',
      border: 'border-purple-500/40',
      bgGradient: 'from-purple-950/70 via-stone-900/80 to-fuchsia-950/40',
    },
    traits: ['Almond-shaped watchful eyes', 'Poised chin tilt', 'Effortless cool confidence'],
    funFact: 'A cat can rotate each of its ears 180 degrees independently with 32 ear muscles.',
  },
  Dog: {
    name: 'Dog',
    category: 'Animal',
    emoji: '🐶',
    subtitle: 'Warm-hearted, joyful & loyal',
    colorTheme: {
      primary: '#06b6d4', // cyan-500
      secondary: '#0891b2',
      accent: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.45)',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950/70 via-stone-900/80 to-blue-950/40',
    },
    traits: ['Warm beaming smile', 'Open friendly gaze', 'Inviting spirited energy'],
    funFact: 'A dog’s sense of smell is roughly 10,000 to 100,000 times more acute than humans.',
  },
  Parrot: {
    name: 'Parrot',
    category: 'Bird',
    emoji: '🦜',
    subtitle: 'Expressive, witty & colorful',
    colorTheme: {
      primary: '#14b8a6', // teal-500
      secondary: '#0d9488',
      accent: '#2dd4bf',
      glow: 'rgba(20, 184, 166, 0.45)',
      border: 'border-teal-500/40',
      bgGradient: 'from-teal-950/70 via-emerald-950/60 to-cyan-950/40',
    },
    traits: ['Sparkling articulate gaze', 'Vibrant spirited smile', 'Outgoing engaging presence'],
    funFact: 'Some parrots can live over 60 years and comprehend human vocal rhythm and cadence.',
  },
  Peacock: {
    name: 'Peacock',
    category: 'Bird',
    emoji: '🦚',
    subtitle: 'Dazzling, artistic & confident',
    colorTheme: {
      primary: '#0284c7', // sky-600
      secondary: '#0369a1',
      accent: '#38bdf8',
      glow: 'rgba(2, 132, 199, 0.45)',
      border: 'border-sky-500/40',
      bgGradient: 'from-blue-950/70 via-teal-950/60 to-emerald-950/40',
    },
    traits: ['Striking symmetrical grace', 'Poised proud posture', 'Radiant captivating flair'],
    funFact: 'Peacock tail feathers shimmer through microscopic crystal-like structural coloring.',
  },
  Turtle: {
    name: 'Turtle',
    category: 'Animal',
    emoji: '🐢',
    subtitle: 'Patience, endurance & grounded',
    colorTheme: {
      primary: '#65a30d', // lime-600
      secondary: '#4d7c0f',
      accent: '#84cc16',
      glow: 'rgba(101, 163, 13, 0.45)',
      border: 'border-lime-600/40',
      bgGradient: 'from-lime-950/70 via-stone-900/80 to-emerald-950/40',
    },
    traits: ['Calm unhurried expression', 'Grounded enduring eyes', 'Gentle patient composure'],
    funFact: 'Turtles have walked the Earth for more than 200 million years — before dinosaurs!',
  },
  Bee: {
    name: 'Bee',
    category: 'Insect',
    emoji: '🐝',
    subtitle: 'Industrious, cheerful & community-minded',
    colorTheme: {
      primary: '#eab308', // yellow-500
      secondary: '#ca8a04',
      accent: '#fde047',
      glow: 'rgba(234, 179, 8, 0.45)',
      border: 'border-yellow-500/40',
      bgGradient: 'from-yellow-950/70 via-stone-900/80 to-amber-950/40',
    },
    traits: ['Bright cheerful aura', 'Focused purposeful gaze', 'Bustling upbeat smile'],
    funFact: 'Honey bees communicate rich floral coordinates through an intricate "waggle dance".',
  },
  Lizard: {
    name: 'Lizard',
    category: 'Animal',
    emoji: '🦎',
    subtitle: 'Quick, adaptive & sun-loving',
    colorTheme: {
      primary: '#10b981', // emerald-500
      secondary: '#059669',
      accent: '#34d399',
      glow: 'rgba(16, 185, 129, 0.45)',
      border: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950/70 via-stone-900/80 to-teal-950/40',
    },
    traits: ['Curious head angle', 'Attentive side gaze', 'Cool calm adaptability'],
    funFact: 'Many lizards can regenerate their tails when escaping tricky wildlife situations.',
  },
  Cheetah: {
    name: 'Cheetah',
    category: 'Animal',
    emoji: '🐆',
    subtitle: 'Swift, focused & aerodynamic',
    colorTheme: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#fbbf24',
      glow: 'rgba(245, 158, 11, 0.45)',
      border: 'border-amber-500/40',
      bgGradient: 'from-amber-950/70 via-stone-900/80 to-yellow-950/40',
    },
    traits: ['Sharp tear-line focus', 'High cheekbone sweep', 'Athletic energetic posture'],
    funFact: 'Cheetahs accelerate faster than most sports cars, reaching 60 mph in 3 seconds.',
  },
  Otter: {
    name: 'Otter',
    category: 'Animal',
    emoji: '🦦',
    subtitle: 'Playful, endearing & social',
    colorTheme: {
      primary: '#38bdf8',
      secondary: '#0284c7',
      accent: '#7dd3fc',
      glow: 'rgba(56, 189, 248, 0.45)',
      border: 'border-sky-400/40',
      bgGradient: 'from-cyan-950/70 via-stone-900/80 to-sky-950/40',
    },
    traits: ['Playful crinkled smile', 'Warm friendly cheeks', 'Inquisitive bubbly energy'],
    funFact: 'Sea otters hold hands while resting so they don’t drift away on ocean currents.',
  },
  Chameleon: {
    name: 'Chameleon',
    category: 'Animal',
    emoji: '🦎',
    subtitle: 'Kaleidoscopic, subtle & observant',
    colorTheme: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.45)',
      border: 'border-cyan-500/40',
      bgGradient: 'from-cyan-950/70 via-teal-950/60 to-purple-950/40',
    },
    traits: ['Multi-perspective gaze', 'Dynamic expressive shifts', 'Uniquely subtle composure'],
    funFact: 'Chameleons can rotate their eyes completely independently in two directions at once.',
  },
  Falcon: {
    name: 'Falcon',
    category: 'Bird',
    emoji: '🦅',
    subtitle: 'Precise, intense & aerodynamic',
    colorTheme: {
      primary: '#8b5cf6',
      secondary: '#6d28d9',
      accent: '#c4b5fd',
      glow: 'rgba(139, 92, 246, 0.45)',
      border: 'border-violet-500/40',
      bgGradient: 'from-violet-950/70 via-stone-900/80 to-slate-950/40',
    },
    traits: ['Steely sharp gaze', 'Sculpted aerodynamic brow', 'Poised instant readiness'],
    funFact: 'Peregrine falcons reach diving speeds over 240 mph (386 km/h) — the fastest animal on Earth.',
  },
  Dragonfly: {
    name: 'Dragonfly',
    category: 'Insect',
    emoji: '🪰',
    subtitle: 'Agile, iridescent & luminous',
    colorTheme: {
      primary: '#06b6d4',
      secondary: '#0284c7',
      accent: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.45)',
      border: 'border-cyan-500/40',
      bgGradient: 'from-teal-950/70 via-cyan-950/70 to-indigo-950/40',
    },
    traits: ['Wide iridescent gaze', 'Light balanced symmetry', 'Swift sparkling presence'],
    funFact: 'Dragonflies can fly backwards, hover for over a minute, and flap wings independently.',
  },
};

export function getAnimalProfile(name: string, categorySuggestion?: AnimalCategory): AnimalProfile {
  // Direct match
  const cleanName = name.trim();
  if (ANIMALS_DATABASE[cleanName]) {
    return ANIMALS_DATABASE[cleanName];
  }

  // Case-insensitive / substring match
  const lower = cleanName.toLowerCase();
  for (const key of Object.keys(ANIMALS_DATABASE)) {
    if (key.toLowerCase() === lower || lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return ANIMALS_DATABASE[key];
    }
  }

  // Map synonyms/close matches
  if (lower.includes('hound') || lower.includes('pup') || lower.includes('canine')) return ANIMALS_DATABASE['Dog'];
  if (lower.includes('kitten') || lower.includes('feline')) return ANIMALS_DATABASE['Cat'];
  if (lower.includes('hare') || lower.includes('bunny')) return ANIMALS_DATABASE['Rabbit'];
  if (lower.includes('panther') || lower.includes('leopard') || lower.includes('jaguar')) return ANIMALS_DATABASE['Tiger'];
  if (lower.includes('chimp') || lower.includes('ape')) return ANIMALS_DATABASE['Monkey'];
  if (lower.includes('hawk') || lower.includes('osprey')) return ANIMALS_DATABASE['Falcon'];
  if (lower.includes('toad')) return ANIMALS_DATABASE['Frog'];
  if (lower.includes('wasp') || lower.includes('hornet')) return ANIMALS_DATABASE['Bee'];
  if (lower.includes('moth')) return ANIMALS_DATABASE['Butterfly'];
  if (lower.includes('gecko') || lower.includes('iguana')) return ANIMALS_DATABASE['Lizard'];
  if (lower.includes('stag') || lower.includes('doe') || lower.includes('elk')) return ANIMALS_DATABASE['Deer'];

  // Dynamic fallback for any unique creature Gemini chooses
  const cat: AnimalCategory = categorySuggestion || 'Animal';
  return {
    name: cleanName,
    category: cat,
    emoji: cat === 'Bird' ? '🪶' : cat === 'Insect' ? '✨' : '🐾',
    subtitle: 'Mysterious, unique & untamed',
    colorTheme: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      glow: 'rgba(16, 185, 129, 0.45)',
      border: 'border-emerald-500/40',
      bgGradient: 'from-emerald-950/70 via-stone-900/80 to-teal-950/40',
    },
    traits: ['Expressive features', 'Wild spirited individuality', 'Distinctive visual harmony'],
    funFact: 'The animal kingdom contains over 8.7 million distinct species across the globe!',
  };
}
