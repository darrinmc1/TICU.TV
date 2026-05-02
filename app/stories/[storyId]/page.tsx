import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import StoryVoting from "./story-voting"
import type { ActOption } from "./story-voting"
import { getSerialStory } from "@/lib/serial-stories"
import type { SerialStory } from "@/lib/serial-stories"

export type CharacterData = {
  name: string
  role: string
  emoji: string
  gradient: string
  bio: string
  image?: string
}

type StoryDetailData = {
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

const STORIES: Record<string, StoryDetailData> = {
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
      },
      {
        name: "Navigator Yui Tanaka",
        role: "Communications Officer",
        emoji: "📡",
        gradient: "from-cyan-600 to-teal-600",
        bio: "A prodigy who graduated from the Mars Mission Corps at nineteen, Yui is the first to notice the signal follows a mathematical structure seen in theoretical xenolinguistics papers. She believes this is deliberate first contact—and that she is the only one who can translate it in time.",
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
      },
      {
        name: "Céline Dupont",
        role: "Best Friend & Gallery Manager",
        emoji: "🥂",
        gradient: "from-violet-600 to-pink-500",
        bio: "Juliet's closest friend in Paris and the most practical romantic she's ever met. Céline has strong opinions on love, timing, and the exact right moment to act. She runs the gallery where Juliet's first Parisian show is scheduled for next month—her advice comes with both emotional investment and ulterior motive.",
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
      },
      {
        name: "Thomas Vrell",
        role: "Ancient Caretaker",
        emoji: "🕯️",
        gradient: "from-stone-700 to-slate-700",
        bio: "Eighty-one years old and the only person who agreed to stay at Blackthorn during the incident of 1987, Thomas has been tending to the manor and its secrets ever since. He knows more than he tells, and everything he does tell turns out to be exactly true—and not at all comforting.",
      },
      {
        name: "Lady Ashford",
        role: "The Manor's Spirit",
        emoji: "✨",
        gradient: "from-slate-700 to-violet-800",
        bio: "She was the last Ashford to live in the manor—a woman known for her sharp intelligence and a collection of rare plants. The night she died, every clock in the house stopped at 3:17. She has been in the east wing ever since, waiting for something that never arrived—until Eleanor opened that door.",
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
      },
      {
        name: "Pierre Lavalle",
        role: "Night Concierge",
        emoji: "🗝️",
        gradient: "from-stone-600 to-indigo-600",
        bio: "Fifteen years at the Whitmore, Pierre has seen enough to know when someone is lying and when staying quiet is safer. He was at his desk between 11:45 p.m. and 12:10 a.m.—the precise window during which something happened—and his written statement covers that time with suspicious precision.",
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

// ─── Character Card ───────────────────────────────────────────────────────────
function CharacterCard({ character }: { character: any }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
      <div className="mb-4 flex justify-center">
        {character.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.image}
            alt={character.name}
            className="h-28 w-28 rounded-full object-cover border-2 border-white/20 shadow-lg"
          />
        ) : (
          <div
            className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${character.gradient} shadow-lg`}
          >
            <span className="text-5xl select-none" role="img" aria-label={character.role}>
              {character.emoji}
            </span>
          </div>
        )}
      </div>
      <div className="mb-1 text-center text-xs font-semibold uppercase tracking-wider text-white/40">
        {character.role}
      </div>
      <h3 className="mb-3 text-center text-lg font-bold text-white">{character.name}</h3>
      <p className="text-sm leading-relaxed text-white/70">{character.bio}</p>
    </div>
  )
}

function SerialStoryHub({ story }: { story: SerialStory }) {
  const latestChapter = story.chapters[story.chapters.length - 1]
  const publishedChapters = story.chapters.filter((chapter) => chapter.status !== "draft")

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative min-h-[500px] overflow-hidden bg-slate-950 pb-16 pt-24 flex items-end">
        {/* Cinematic Hero Background */}
        {story.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover object-[center_25%] opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>
        )}
        
        {!story.heroImage && (
          <>
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.coverGradient} opacity-10`}
            />
            <div
              className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${story.coverGradient} opacity-20 blur-3xl`}
            />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl w-full px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to Stories
          </Link>

          <div className="text-left md:max-w-3xl">
            {!story.heroImage && (
              <div
                className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${story.coverGradient} shadow-2xl`}
              >
                <span className="text-6xl select-none" role="img" aria-label={story.genre}>
                  {story.genreEmoji}
                </span>
              </div>
            )}

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                Voting Open
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {story.genre}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {publishedChapters.length} published chapter{publishedChapters.length === 1 ? "" : "s"}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">{story.title}</h1>
            <blockquote
              className={`max-w-2xl border-l-4 border-current pl-5 text-left text-lg italic leading-relaxed ${story.accentTextClass} drop-shadow-lg`}
            >
              {story.hook}
            </blockquote>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-14">
        <section>
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              href={`/stories/${story.id}/chapters/${story.chapters[0].slug}`}
              className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
            >
              Start at Chapter 1
            </Link>
            <Link
              href={`/stories/${story.id}/chapters/${latestChapter.slug}`}
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read Latest Chapter
            </Link>
            <Link
              href={`/stories/${story.id}/characters`}
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Character Gallery
            </Link>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white">Story Overview</h2>
          <p className="text-base leading-relaxed text-white/80">{story.synopsis}</p>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Chapter Index</h2>
              <p className="text-sm text-white/50">
                Readers can start from the beginning or jump to the latest published chapter.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {publishedChapters.map((chapter) => {
              const isLatest = chapter.slug === latestChapter.slug

              return (
                <Link
                  key={chapter.slug}
                  href={`/stories/${story.id}/chapters/${chapter.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-white/20 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isLatest ? "border border-green-500/30 bg-green-500/20 text-green-400" : "border border-white/20 text-white/60"}`}>
                      {isLatest ? "Latest Chapter" : chapter.label}
                    </span>
                    <span className="text-xs text-white/40">
                      {chapter.sections.filter((section) => section.isPublished).length} acts published
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{chapter.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65">{chapter.shortDescription}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">Main Characters</h2>
          <p className="mb-6 text-sm text-white/50">These profiles stay visible at the story level so late-arriving readers can catch up quickly.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {story.characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
type PageProps = { params: Promise<{ storyId: string }> }

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params
  const serialStory = getSerialStory(storyId)

  if (serialStory) {
    return <SerialStoryHub story={serialStory} />
  }

  const story = STORIES[storyId]
  if (!story) notFound()

  const statusConfig = {
    voting: { label: "Voting Open", badge: "bg-green-500/20 text-green-400 border border-green-500/30" },
    new: { label: "New", badge: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
    "in-progress": {
      label: "In Progress",
      badge: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    },
    complete: { label: "Complete", badge: "bg-white/10 text-white/60 border border-white/20" },
  }
  const { label: statusLabel, badge: statusBadge } = statusConfig[story.status]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[500px] overflow-hidden bg-slate-950 pb-16 pt-24 flex items-end">
        {/* Cinematic Hero Background */}
        {story.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={story.heroImage}
              alt={story.title}
              fill
              className="object-cover object-[center_25%] opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/20" />
          </div>
        )}

        {!story.heroImage && (
          <>
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${story.coverGradient} opacity-10`}
            />
            <div
              className={`pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${story.coverGradient} opacity-20 blur-3xl`}
            />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-5xl w-full px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to Stories
          </Link>

          <div className="text-left md:max-w-3xl">
            {/* Cover icon */}
            {!story.heroImage && (
              <div
                className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${story.coverGradient} shadow-2xl`}
              >
                <span className="text-6xl select-none" role="img" aria-label={story.genre}>
                  {story.genreEmoji}
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge}`}>
                {statusLabel}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {story.genre}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                {story.chapter}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">{story.title}</h1>

            <blockquote
              className={`max-w-2xl border-l-4 border-current pl-5 text-left text-lg italic leading-relaxed ${story.accentTextClass} drop-shadow-lg`}
            >
              {story.hook}
            </blockquote>
          </div>
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-14">
        {/* Synopsis */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Story Synopsis</h2>
          <p className="mb-5 text-base leading-relaxed text-white/80">{story.synopsis}</p>
          <blockquote className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <p className="text-base italic leading-relaxed text-white/70">{story.opening}</p>
          </blockquote>
        </section>

        {/* Characters */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">Meet the Characters</h2>
          <p className="mb-6 text-sm text-white/50">The key figures shaping this story&apos;s fate.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {story.characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </section>

        {/* Voting */}
        <section>
          <h2 className="mb-2 text-2xl font-bold text-white">
            {story.status === "complete" ? "How It Was Decided" : "What Happens Next?"}
          </h2>
          <p className="mb-6 text-sm text-white/50">
            {story.status === "complete"
              ? "Here's how readers voted at this pivotal chapter."
              : "Choose the path for this chapter. Your vote shapes the story."}
          </p>
          <StoryVoting
            storyId={storyId}
            chapterSlug={story.chapter.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
            actOptions={story.actOptions}
            isComplete={story.status === "complete"}
            accentTextClass={story.accentTextClass}
            gradientClass={story.coverGradient}
            ringClass={story.ringClass}
          />
        </section>

        {/* Footer CTAs */}
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <Link
            href={`/stories/${storyId}/characters`}
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Character Gallery
          </Link>
          <Link
            href="/vote"
            className={`inline-flex items-center rounded-md bg-gradient-to-r ${story.coverGradient} px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
          >
            View All Story Votes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
