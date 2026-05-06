// Shared data and types for the [storyId] route group.
//
// This file lives alongside page.tsx but Next's router ignores files
// whose names start with an underscore — so it can export anything
// without tripping Next's strict page-file export validator.
//
// page.tsx and characters/page.tsx both import from here, so the
// fallback STORIES table is declared once and the CharacterData /
// StoryDetailData types stay in sync between the two routes.

import type { ActOption } from "./story-voting"

export type CharacterData = {
  name: string
  role: string
  emoji: string
  gradient: string
  bio: string
  image?: string
}

export type StoryDetailData = {
  title: string
  genre: string
  genreEmoji: string
  chapter: string
  status: "voting" | "new" | "in-progress" | "complete"
  votes: number
  synopsis: string
  opening: string
  heroImage?: string
  hook: string
  coverGradient: string
  accentTextClass: string
  ringClass: string
  characters: CharacterData[]
  actOptions: ActOption[]
}

export const STORIES: Record<string, StoryDetailData> = {
  "dragons-gambit": {
    title: "The Dragon's Gambit",
    genre: "Fantasy",
    genreEmoji: "🗡️",
    chapter: "Chapter 1: Ember at Dawn",
    status: "voting",
    votes: 12847,
    heroImage: "/images/stories/dragons-last-breath/chapter-1/establishing.png",
    synopsis:
      "In the shadow of the Ashveil Mountains, the young knight Serana Valeblade and her companions have just crossed into territory where the kingdom's laws no longer hold. Word of a dragon sighting has drawn them east—a creature not seen in three generations, whose awakening has already emptied villages and shut down every trade route through the pass. Chapter One opens at dawn, at the foot of a ruined watchtower that marks the edge of everything safe.",
    opening:
      "At first light, smoke coils over the mountain pass as Serana and her companions arrive at a ruined watchtower that should have been empty. Claw marks cut through stone, and a single golden scale catches the morning sun.",
    hook: "Somewhere below the ruins, a dragon waits—and the first choice could change the fate of the kingdom.",
    coverGradient: "from-purple-600 to-pink-600",
    accentTextClass: "text-purple-400",
    ringClass: "ring-purple-400",
    characters: [
      {
        name: "Serana Valeblade",
        role: "Knight & Paladin",
        emoji: "🗡️",
        gradient: "from-purple-600 to-pink-600",
        bio: "Born into a minor noble house that lost everything to a dragon attack twenty years ago, Serana devoted her life to protecting others through faith and combat. Her unwavering moral code is both her greatest strength and her most dangerous limitation—she refuses to win through deception, even when the odds demand it.",
        image: "/images/characters/serana.png",
      },
      {
        name: "Kael Thornwood",
        role: "Shadow Scout & Rogue",
        emoji: "🗡️",
        gradient: "from-slate-600 to-slate-800",
        bio: "A former thief from the capital who reinvented himself as a wilderness tracker after a heist gone wrong left his crew dead. Kael sees every situation as a puzzle with a solution involving shadows and quick exits. He has no love for heroics but has stayed with Serana's party for reasons even he doesn't fully understand.",
      },
      {
        name: "Elder Mirach",
        role: "Archmage & Chronicler",
        emoji: "📜",
        gradient: "from-violet-600 to-indigo-600",
        bio: "The oldest living scholar of dragon lore, Mirach spent sixty years cataloguing the ancient pacts between humanity and dragonkind. He believes the dragon is not acting without reason—something has disturbed the old covenant—and his counsel is priceless, even if his creaking knees slow the party down.",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "The Emissary's Oath",
        description:
          "Serana enters the lair alone under a white banner, hoping the dragon's ancient code of honour still holds. A successful negotiation could forge a peace pact that protects the kingdom for generations.",
        risk: "If the dragon has abandoned the old codes, Serana enters alone with no escape.",
      },
      {
        id: "b",
        title: "The Binding Seal",
        description:
          "Elder Mirach reveals a fragment of the Dragon-Binding Ritual hidden in his notes—but completing it requires a detour to the Temple of Ember, three days east. The seal would give the party real leverage.",
        risk: "The dragon may destroy the kingdom before they return.",
      },
      {
        id: "c",
        title: "Nightfall Strike",
        description:
          "Kael has scouted a hidden passage beneath the watchtower. A coordinated assault before dawn—using surprise and Mirach's shielding spells—could end the threat before it can escalate.",
        risk: "A failed assault leaves no second chances.",
      },
    ],
  },

  "mars-colony": {
    title: "Mars Colony Crisis",
    genre: "Sci-Fi",
    genreEmoji: "🚀",
    chapter: "Chapter 1",
    status: "new",
    votes: 8234,
    heroImage: "/images/stories/mars-colony/chapter-1/establishing.png",
    synopsis:
      "Ares-9 is humanity's most ambitious achievement—a self-sustaining colony of 4,000 settlers on Mars. It is also, as of 3:47 a.m. local time, under siege by an unknown signal that is rewriting life support algorithms and corrupting navigation databases. Commander Aria Chen has minutes to decide the colony's first move.",
    opening:
      "Beneath the domes of Ares-9, warning lights flash as an unknown transmission interrupts every channel at once. Commander Aria Chen is called to command while oxygen reserves tick down and panic spreads.",
    hook: "The signal is not human—and your first decision will determine who survives the next hour.",
    coverGradient: "from-blue-600 to-cyan-600",
    accentTextClass: "text-blue-400",
    ringClass: "ring-blue-400",
    characters: [
      {
        name: "Commander Aria Chen",
        role: "Colony Commander",
        emoji: "🚀",
        gradient: "from-blue-600 to-cyan-600",
        bio: "A second-generation astronaut who earned command of Ares-9 through fifteen years of crisis management on orbital stations. Aria thinks in systems: every problem has inputs, outputs, and failure modes. Her methodical calm inspires loyalty, though some colonists whisper that her calm runs a little too deep.",
      },
      {
        name: "Dr. Finn Osei",
        role: "Chief Engineer",
        emoji: "🔧",
        gradient: "from-slate-600 to-blue-700",
        bio: "The man who single-handedly rebuilt Ares-9's oxygen recycler after the 2042 dust storm, Finn knows every pipe, wire, and failsafe in the colony by heart. His running commentary on the countdown to critical failure is both invaluable and terrifying.",
        image: "/images/characters/rael.png",
      },
      {
        name: "Navigator Yui Tanaka",
        role: "Communications Officer",
        emoji: "📡",
        gradient: "from-cyan-600 to-teal-600",
        bio: "A prodigy who graduated from the Mars Mission Corps at nineteen, Yui is the first to notice the signal follows a mathematical structure seen in theoretical xenolinguistics papers. She believes this is deliberate first contact—and that she is the only one who can translate it in time.",
        image: "/images/characters/zhao.png",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "Open Channel",
        description:
          "Broadcast a structured reply using Yui's xenolinguistic framework, revealing the colony's presence but potentially initiating dialogue with whatever sent the signal.",
        risk: "If the signal is adversarial, responding confirms humanity's exact location and capabilities.",
      },
      {
        id: "b",
        title: "Dome Lockdown",
        description:
          "Seal all domes, cut external transmissions, and dedicate Finn's full engineering team to purging the signal from colony systems before it reaches critical infrastructure.",
        risk: "Going dark may accelerate whatever process the signal has already started inside the systems.",
      },
      {
        id: "c",
        title: "Deploy the Ghost Probe",
        description:
          "Launch an unmanned reconnaissance probe to triangulate the signal's origin point—gather data without exposing the colony to direct interaction.",
        risk: "The probe takes three hours to reach signal range; a lot can change inside the colony by then.",
      },
    ],
  },

  "love-paris": {
    title: "Love in Paris",
    genre: "Romance",
    genreEmoji: "💕",
    chapter: "Chapter 1: Rain on Rue de Rivoli",
    status: "voting",
    votes: 15432,
    heroImage: "/images/stories/love-paris/chapter-1/establishing.png",
    synopsis:
      "Juliet Moreau has just arrived in Paris—she left her marketing career behind to paint, a decision her family calls reckless and her heart calls survival. She has a small apartment in Montmartre, paint-stained hands, and a life she is still learning the shape of. Her very first evening alone in the city, ducking into a bookshop to escape the rain, she reaches for a worn novel on the shelf—and her hand meets another.",
    opening:
      "On a rain-slick evening in Paris, Juliet Moreau ducks into a little bookshop just before closing. Across the room, a stranger reaches for the same worn novel, and both hands freeze on the cover.",
    hook: "One conversation in this tiny shop may begin a love story neither of them expected.",
    coverGradient: "from-pink-600 to-rose-600",
    accentTextClass: "text-pink-400",
    ringClass: "ring-pink-400",
    characters: [
      {
        name: "Juliet Moreau",
        role: "Painter & Protagonist",
        emoji: "🎨",
        gradient: "from-pink-600 to-rose-500",
        bio: "Thirty-two, originally from Bordeaux, the daughter of practical engineers who never understood her brush. Juliet is funny and self-aware but carries a deep fear of choosing the safe path again. She came to Paris to be brave—she's not always sure what brave looks like.",
      },
      {
        name: "Luc Beaumont",
        role: "Architect",
        emoji: "📐",
        gradient: "from-rose-600 to-pink-700",
        bio: "A Parisian by birth who spent five years in Tokyo restoring traditional buildings and returned with a theory that the most beautiful architecture is what people almost don't notice. Luc is quiet in a way that means he is listening, not absent. He reached for that book because he's been searching for the original-cover edition since he was twelve.",
        image: "/images/characters/luc.png",
      },
      {
        name: "Céline Dupont",
        role: "Best Friend & Gallery Manager",
        emoji: "🥂",
        gradient: "from-violet-600 to-pink-500",
        bio: "Juliet's closest friend in Paris and the most practical romantic she's ever met. Céline has strong opinions on love, timing, and the exact right moment to act. She runs the gallery where Juliet's first Parisian show is scheduled for next month—her advice comes with both emotional investment and ulterior motive.",
        image: "/images/characters/celine.png",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "The Coffee Invitation",
        description:
          "Juliet takes a breath, sets the book on the table between them, and invites the stranger for café au lait across the street—direct, warm, and a little terrifying.",
        risk: "He could say no. Rejection on her very first Paris evening would be a hard way to begin.",
      },
      {
        id: "b",
        title: "The Hidden Note",
        description:
          "She writes her name and number on a receipt tucked into the back cover of the book, leaves it on the shelf, and slips into the Paris rain—letting fate take it from there.",
        risk: "He might never open that page. Or he might remember this night forever.",
      },
      {
        id: "c",
        title: "A Graceful Exit",
        description:
          "She smiles, sets the book down, and leaves—trusting that if this is a real story, the city of Paris has other plans for the two of them.",
        risk: "Paris is a city of near-misses. This could easily be one of them.",
      },
    ],
  },

  "haunted-manor": {
    title: "The Haunted Manor",
    genre: "Horror",
    genreEmoji: "👻",
    chapter: "Chapter 1: The East Wing",
    status: "complete",
    votes: 23891,
    heroImage: "/images/stories/haunted-manor/chapter-1/establishing.png",
    synopsis:
      "Blackthorn Manor has stood empty for thirty-seven years, sealed after a single night in 1987 that no official record explains fully. Dr. Eleanor Blackwood has just arrived—the first person granted permission to enter since the iron gates were locked. Her equipment fills the boot of a hired car. Her theory is that the paranormal is a science problem. Chapter One begins the moment she steps through the gate and hears, very clearly, the sound of a clock ticking in a house with no electricity.",
    opening:
      "Dr. Eleanor Blackwood steps through the iron gates of Blackthorn Manor as thunder rolls above the hills. Portraits watch from dark corridors, and every clock in the house has stopped at 3:17.",
    hook: "The manor is awake—and the first door she opens may not let her leave.",
    coverGradient: "from-green-600 to-emerald-600",
    accentTextClass: "text-green-400",
    ringClass: "ring-green-400",
    characters: [
      {
        name: "Dr. Eleanor Blackwood",
        role: "Paranormal Investigator",
        emoji: "👻",
        gradient: "from-red-700 to-orange-700",
        bio: "A clinical psychologist and founding member of the Institute for Unexplained Phenomena, Eleanor entered Blackthorn Manor armed with thermal cameras, a rational mind, and a theory that hauntings are the product of infrasound and electrical interference. She was wrong. She knows that now.",
        image: "/images/characters/eleanor.png",
      },
      {
        name: "Thomas Vrell",
        role: "Ancient Caretaker",
        emoji: "🕯️",
        gradient: "from-stone-700 to-slate-700",
        bio: "Eighty-one years old and the only person who agreed to stay at Blackthorn during the incident of 1987, Thomas has been tending to the manor and its secrets ever since. He knows more than he tells, and everything he does tell turns out to be exactly true—and not at all comforting.",
        image: "/images/characters/thomas_vrell.png",
      },
      {
        name: "Lady Ashford",
        role: "The Manor's Spirit",
        emoji: "✨",
        gradient: "from-slate-700 to-violet-800",
        bio: "She was the last Ashford to live in the manor—a woman known for her sharp intelligence and a collection of rare plants. The night she died, every clock in the house stopped at 3:17. She has been in the east wing ever since, waiting for something that never arrived—until Eleanor opened that door.",
        image: "/images/characters/lady_ashford.png",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "Into the East Wing",
        description:
          "Eleanor ignores Thomas's warning and pushes through the sealed door, stepping into rooms untouched since the night Lady Ashford died. The temperature drops eight degrees the moment she crosses the threshold.",
        risk: "",
        votePercent: 41,
      },
      {
        id: "b",
        title: "The Clock Confession",
        description:
          "Question Thomas about why every clock stopped at 3:17, pressing until he reveals what he saw the night of the incident—a confession that changes everything about what really happened.",
        risk: "",
        votePercent: 35,
      },
      {
        id: "c",
        title: "The Midnight Séance",
        description:
          "Eleanor sets up her instruments in the drawing room and attempts direct communication with the presence inside Blackthorn Manor—inviting contact on its own terms.",
        risk: "",
        votePercent: 24,
      },
    ],
  },

  "showdown-sunset": {
    title: "Showdown at Sunset",
    genre: "Western",
    genreEmoji: "🤠",
    chapter: "Chapter 1: Dust and Oaths",
    status: "voting",
    votes: 6543,
    heroImage: "/images/stories/showdown-sunset/chapter-1/establishing.png",
    synopsis:
      "Red Mesa has known three years of peace—the Holloway gang was driven out and scattered north after the last confrontation. That peace ends today. The noon train carries news that the gang has reformed, that Bart Holloway is back, and that they are riding south. Sheriff Jake Morgan has until sunset to decide how he faces what is coming. He has three deputies, one town, and eleven years of reputation about to face the test they were always building toward.",
    opening:
      "The noon train brings bad news to Red Mesa: the outlaw gang has returned, and Sheriff Jake Morgan has one night to gather allies before the town is overrun.",
    hook: "By sundown, the town will stand together—or fall one street at a time.",
    coverGradient: "from-red-600 to-orange-600",
    accentTextClass: "text-red-400",
    ringClass: "ring-red-400",
    characters: [
      {
        name: 'Sheriff Jake "Iron" Morgan',
        role: "Lawman & Protagonist",
        emoji: "🤠",
        gradient: "from-amber-600 to-orange-600",
        bio: "Fifty-two years old, bad knee, excellent aim. Jake has turned down three marshal positions and a congressional pardon offer because he believes the law means something when kept in one place, by one person, who doesn't leave. He has three deputies, one of whom he trusts completely.",
      },
      {
        name: "Rosa Vega",
        role: "Saloon Owner",
        emoji: "🥃",
        gradient: "from-amber-700 to-red-700",
        bio: "The most informed person in Red Mesa, Rosa has been feeding, serving, and listening to every type of man this frontier produces for twenty years. She has no loyalty to the law or to the Holloways—only to her establishment and the community it sustains. She will back whoever she believes will still be standing at dawn.",
        image: "/images/characters/rosa.png",
      },
      {
        name: 'Bart "Blaze" Holloway',
        role: "Outlaw Leader",
        emoji: "💀",
        gradient: "from-red-700 to-slate-700",
        bio: "Once a cattle rancher who lost his land to a bank error Jake couldn't reverse, Bart's grievance started legal and became something darker over three years of exile. He commands twelve men whose loyalty is purchased and absolute, and he has planned this return for longer than anyone in Red Mesa realises.",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "Ride to Redemption Ridge",
        description:
          "Before nightfall, Jake rides to find Hector Vanes—the retired gunslinger whom the Holloway crew genuinely fears. But Hector walked away from violence for a reason, and he may not come back.",
        risk: "If Hector refuses, Jake loses time and rides back alone into something he can't win.",
      },
      {
        id: "b",
        title: "The Deal with Rosa",
        description:
          "Rosa knows where the gang is making camp and what Bart really wants. A quiet conversation over whiskey and the right promise might divide the gang before the first shot is fired.",
        risk: "Rosa's information has a price, and her loyalties can shift with the wind.",
      },
      {
        id: "c",
        title: "Canyon Ambush",
        description:
          "Jake's scout has identified a choke point at Redrock Canyon where the gang must ride single-file. Setting an ambush there—with terrain advantage and darkness—might end this without a main-street confrontation.",
        risk: "If the ambush fails, the gang rides in angrier and better informed about Jake's tactics.",
      },
    ],
  },

  "missing-heiress": {
    title: "The Missing Heiress",
    genre: "Mystery",
    genreEmoji: "🔍",
    chapter: "Chapter 1",
    status: "new",
    votes: 4123,
    heroImage: "/images/stories/missing-heiress/chapter-1/establishing.png",
    synopsis:
      "Isabella Hartwell vanished from her penthouse at the top of the Whitmore Building at exactly 12:03 a.m. The suite was locked from the inside. The security system was disabled for precisely four minutes. The guest list from the evening's private dinner—eleven people—has produced eleven different accounts of what happened and when. Detective Marcus Vale has until morning to find something solid before the media arrives and the trail goes cold.",
    opening:
      "At 12:03 a.m., the heiress vanishes from a locked penthouse with no signs of struggle. Detective Marcus Vale arrives to find a single glove on the balcony and a guest list full of liars.",
    hook: "Every clue points in a different direction—and your first lead will set the entire investigation in motion.",
    coverGradient: "from-indigo-600 to-purple-600",
    accentTextClass: "text-indigo-400",
    ringClass: "ring-indigo-400",
    characters: [
      {
        name: "Detective Marcus Vale",
        role: "Lead Detective",
        emoji: "🔍",
        gradient: "from-indigo-600 to-purple-600",
        bio: "Fifteen years on the force, the last six in major crimes. Marcus solves puzzles by finding the one thing that doesn't fit and pulling until everything else unravels. He has been wrong twice in his career; both times he knew it before the verdict. He does not yet know if this will be the third.",
      },
      {
        name: "Vivienne Hartwell",
        role: "The Heiress's Cousin",
        emoji: "💼",
        gradient: "from-slate-600 to-indigo-700",
        bio: "Isabella's only living relative and the sole heir to the Hartwell estate if Isabella is declared dead or legally incapacitated. Vivienne is composed, cooperative, and has a documented alibi. She also left the dinner party six minutes earlier than she claims—a discrepancy no one has mentioned to her yet.",
        image: "/images/characters/vivienne.png",
      },
      {
        name: "Pierre Lavalle",
        role: "Night Concierge",
        emoji: "🗝️",
        gradient: "from-stone-600 to-indigo-600",
        bio: "Fifteen years at the Whitmore, Pierre has seen enough to know when someone is lying and when staying quiet is safer. He was at his desk between 11:45 p.m. and 12:10 a.m.—the precise window during which something happened—and his written statement covers that time with suspicious precision.",
        image: "/images/characters/pierre.png",
      },
    ],
    actOptions: [
      {
        id: "a",
        title: "Shadow Vivienne",
        description:
          "Track the cousin's movements for the next twenty-four hours. Her alibi is paper-thin and her inheritance motive is the oldest story in the book.",
        risk: "Fixating on Vivienne could let the real trail go cold if she turns out to be clean.",
      },
      {
        id: "b",
        title: "Crack the Safe",
        description:
          "The penthouse safe was accessed at 11:47 p.m.—sixteen minutes before Isabella vanished. Whatever was inside isn't there anymore. Identifying what was taken changes the entire shape of the case.",
        risk: "Examining the safe requires a court order Marcus doesn't have yet.",
      },
      {
        id: "c",
        title: "The Concierge's Account",
        description:
          "Pierre's statement is too clean. Pressing him—carefully, in private, with the right kind of pressure—might surface the one detail that changes everything.",
        risk: "Pierre is connected to the building's ownership group. Pressure him wrong and the case gets buried above Marcus's pay grade.",
      },
    ],
  },
}
