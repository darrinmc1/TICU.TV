export interface Genre {
  name: string
  icon: string
  color: string
}

export interface StoryCard {
  id: string
  status: "voting" | "new" | "in-progress" | "complete"
  timeLeft?: string
  timeAgo?: string
  rating?: number
  title: string
  genre: string
  chapter: string | number
  votes: number
  description: string
  borderColor: string
  gradientColor: string
  iconColor: string
}

export interface Character {
  id: string
  name: string
  story: string
  genre: string
  role: string
  description: string
  emoji: string
  borderColor: string
  gradientColor: string
  textColor: string
  isCompleted?: boolean
}

export interface MerchItem {
  id: string
  name: string
  collection: string
  price: string
  emoji: string
  borderColor: string
  gradientColor: string
  textColor: string
}

export const GENRES: Genre[] = [
  { name: "Fantasy", icon: "🗡️", color: "from-purple-600 to-pink-600" },
  { name: "Sci-Fi", icon: "🚀", color: "from-blue-600 to-cyan-600" },
  { name: "Horror", icon: "👻", color: "from-red-600 to-orange-600" },
  { name: "Romance", icon: "💕", color: "from-pink-600 to-rose-600" },
  { name: "Mystery", icon: "🔍", color: "from-indigo-600 to-purple-600" },
  { name: "Thriller", icon: "⚡", color: "from-yellow-600 to-red-600" },
  { name: "Western", icon: "🤠", color: "from-amber-600 to-orange-600" },
  { name: "Historical", icon: "📜", color: "from-stone-600 to-amber-600" },
  { name: "Comedy", icon: "😂", color: "from-green-600 to-teal-600" },
  { name: "Adventure", icon: "🗺️", color: "from-emerald-600 to-green-600" },
  { name: "Dystopian", icon: "🏚️", color: "from-gray-600 to-slate-600" },
  { name: "Supernatural", icon: "✨", color: "from-violet-600 to-purple-600" },
]

export const STORY_CARDS: StoryCard[] = [
  {
    id: "dragons-gambit",
    status: "voting",
    timeLeft: "2d 14h left",
    title: "The Dragon's Gambit",
    genre: "Fantasy",
    chapter: "Chapter 12",
    votes: 12847,
    description: "The party stands before the ancient dragon's lair. Will they negotiate, fight, or find another path?",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    gradientColor: "from-purple-600 to-pink-600",
    iconColor: "text-purple-400",
  },
  {
    id: "mars-colony",
    status: "new",
    timeAgo: "2h ago",
    title: "Mars Colony Crisis",
    genre: "Sci-Fi",
    chapter: "Chapter 1",
    votes: 8234,
    description: "A mysterious signal from Mars threatens the colony. Your choices will determine humanity's fate.",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    gradientColor: "from-blue-600 to-cyan-600",
    iconColor: "text-blue-400",
  },
  {
    id: "love-paris",
    status: "in-progress",
    timeAgo: "1d ago",
    title: "Love in Paris",
    genre: "Romance",
    chapter: "Chapter 8",
    votes: 15432,
    description: "Two strangers meet in the City of Light. Will fate bring them together or tear them apart?",
    borderColor: "border-pink-500/30 hover:border-pink-500/60",
    gradientColor: "from-pink-600 to-rose-600",
    iconColor: "text-pink-400",
  },
  {
    id: "haunted-manor",
    status: "complete",
    rating: 4.8,
    title: "The Haunted Manor",
    genre: "Horror",
    chapter: "12 Chapters",
    votes: 23891,
    description: "A complete horror saga where your votes determined every terrifying twist and turn.",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    gradientColor: "from-green-600 to-emerald-600",
    iconColor: "text-green-400",
  },
  {
    id: "showdown-sunset",
    status: "voting",
    timeLeft: "8h left",
    title: "Showdown at Sunset",
    genre: "Western",
    chapter: "Chapter 5",
    votes: 6543,
    description: "The sheriff faces the outlaw gang. Will justice prevail or will chaos reign in the frontier town?",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    gradientColor: "from-red-600 to-orange-600",
    iconColor: "text-red-400",
  },
  {
    id: "missing-heiress",
    status: "new",
    timeAgo: "5h ago",
    title: "The Missing Heiress",
    genre: "Mystery",
    chapter: "Chapter 1",
    votes: 4123,
    description: "A wealthy heiress vanishes. Follow the clues and vote on which suspects to investigate.",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
    gradientColor: "from-indigo-600 to-purple-600",
    iconColor: "text-indigo-400",
  },
]

export const CHARACTERS: Character[] = [
  {
    id: "serana",
    name: "Serana Valeblade",
    story: "The Dragon's Gambit",
    genre: "Fantasy",
    role: "Paladin",
    description: "A noble knight whose faith guides her blade through the darkest challenges.",
    emoji: "🗡️",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    gradientColor: "from-purple-600 to-pink-600",
    textColor: "text-purple-400",
  },
  {
    id: "aria",
    name: "Commander Aria Chen",
    story: "Mars Colony Crisis",
    genre: "Sci-Fi",
    role: "Leader",
    description: "A brilliant commander facing impossible choices to save humanity's first colony.",
    emoji: "🚀",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    gradientColor: "from-blue-600 to-cyan-600",
    textColor: "text-blue-400",
  },
  {
    id: "juliet",
    name: "Juliet Moreau",
    story: "Love in Paris",
    genre: "Romance",
    role: "Artist",
    description: "A passionate artist searching for love and meaning in the City of Light.",
    emoji: "💕",
    borderColor: "border-pink-500/30 hover:border-pink-500/60",
    gradientColor: "from-pink-600 to-rose-600",
    textColor: "text-pink-400",
  },
  {
    id: "eleanor",
    name: "Dr. Eleanor Blackwood",
    story: "The Haunted Manor",
    genre: "Horror",
    role: "Paranormal Investigator",
    description: "A skeptical scientist confronting supernatural forces beyond comprehension.",
    emoji: "👻",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    gradientColor: "from-red-600 to-orange-600",
    textColor: "text-red-400",
    isCompleted: true,
  },
  {
    id: "jake",
    name: "Sheriff Jake \"Iron\" Morgan",
    story: "Showdown at Sunset",
    genre: "Western",
    role: "Lawman",
    description: "A legendary sheriff facing his greatest challenge in the lawless frontier.",
    emoji: "🤠",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    gradientColor: "from-amber-600 to-orange-600",
    textColor: "text-amber-400",
  },
  {
    id: "marcus",
    name: "Detective Marcus Vale",
    story: "The Missing Heiress",
    genre: "Mystery",
    role: "Detective",
    description: "A brilliant detective unraveling a web of secrets and lies.",
    emoji: "🔍",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
    gradientColor: "from-indigo-600 to-purple-600",
    textColor: "text-indigo-400",
  },
]

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: "serana-blade",
    name: "Serana's Blade Replica",
    collection: "The Dragon's Gambit Collection",
    price: "$149.99",
    emoji: "🗡️",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    gradientColor: "from-purple-600/20 to-pink-600/20",
    textColor: "text-purple-400",
  },
  {
    id: "mars-poster",
    name: "Mars Colony Poster Set",
    collection: "Mars Colony Crisis Collection",
    price: "$29.99",
    emoji: "🚀",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    gradientColor: "from-blue-600/20 to-cyan-600/20",
    textColor: "text-blue-400",
  },
  {
    id: "paris-novel",
    name: "Paris Romance Novel",
    collection: "Love in Paris Collection",
    price: "$19.99",
    emoji: "💕",
    borderColor: "border-pink-500/30 hover:border-pink-500/60",
    gradientColor: "from-pink-600/20 to-rose-600/20",
    textColor: "text-pink-400",
  },
  {
    id: "manor-game",
    name: "Haunted Manor Board Game",
    collection: "The Haunted Manor Collection",
    price: "$59.99",
    emoji: "👻",
    borderColor: "border-red-500/30 hover:border-red-500/60",
    gradientColor: "from-red-600/20 to-orange-600/20",
    textColor: "text-red-400",
  },
  {
    id: "sheriff-badge",
    name: "Sheriff's Badge Replica",
    collection: "Showdown at Sunset Collection",
    price: "$39.99",
    emoji: "🤠",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    gradientColor: "from-amber-600/20 to-orange-600/20",
    textColor: "text-amber-400",
  },
  {
    id: "detective-files",
    name: "Detective's Case Files",
    collection: "The Missing Heiress Collection",
    price: "$24.99",
    emoji: "🔍",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/60",
    gradientColor: "from-indigo-600/20 to-purple-600/20",
    textColor: "text-indigo-400",
  },
]
