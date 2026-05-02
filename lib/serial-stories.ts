export type VoteOption = {
    id: string
    title: string
    description: string
    risk?: string
    votePercent?: number
}

export type StorySection = {
    id: string
    title: string
    summary: string
    isPublished: boolean
    imageSrc?: string
    imageCaption?: string
    imageRevealAfterParagraph?: number
}

export type StoryChapter = {
    slug: string
    chapterNumber: number
    title: string
    label: string
    shortDescription: string
    opening: string
    status: "published" | "voting" | "draft"
    sections: StorySection[]
    voteQuestion?: string
    votePrompt?: string
    voteOptions?: VoteOption[]
    winningOptionId?: string
}

export type StoryCharacterProfile = {
    name: string
    role: string
    emoji: string
    gradient: string
    bio: string
    image?: string
}

export type SerialStory = {
    id: string
    title: string
    genre: string
    genreEmoji: string
    heroImage?: string
    status: "voting" | "new" | "in-progress" | "complete"
    votes: number
    synopsis: string
    hook: string
    coverGradient: string
    accentTextClass: string
    ringClass: string
    characters: StoryCharacterProfile[]
    chapters: StoryChapter[]
}

export const SERIAL_STORIES: Record<string, SerialStory> = {
    "dragons-last-breath": {
        id: "dragons-last-breath",
        title: "The Dragon's Last Breath",
        genre: "Fantasy",
        genreEmoji: "🔥",
        heroImage: "/images/stories/dragons-last-breath/chapter-1/establishing.png",
        status: "in-progress",
        votes: 9312,
        synopsis:
            "Caelin has spent the last three days drifting out of Ashford with no war to fight, no sworn lord to serve, and no clear reason to keep riding east. That changes when he sees smoke over Thornwick. What begins as a knight's instinct to help survivors becomes something larger: a dying dragon, a scale that binds itself to his flesh, and the first signs that an ancient balance known as the Concord is failing. This story is built chapter by chapter, with each chapter preserved so new readers can start at the beginning and current readers can jump straight to the latest turning point.",
        hook:
            "A village burns, a dragon dies, and a knight who had almost forgotten his purpose becomes the bearer of something the world should never have lost.",
        coverGradient: "from-orange-500 to-red-600",
        accentTextClass: "text-orange-300",
        ringClass: "ring-orange-400",
        characters: [
            {
                name: "Caelin",
                role: "Hedge-Knight",
                emoji: "⚔️",
                gradient: "from-amber-500 to-orange-600",
                bio: "A capable but unanchored knight traveling through peacetime with too much skill and too little purpose. Caelin is good at stepping into danger before he has time to think better of it, which is exactly how he ends up at Thornwick when the sky turns black with smoke.",
            },
            {
                name: "Vharisax",
                role: "Dying Dragon",
                emoji: "🐉",
                gradient: "from-red-600 to-rose-700",
                bio: "Ancient, immense, and fading by the time Caelin finds her in the crater. Vharisax is one of the Nine, a guardian bound to the world's balance through forgotten laws. Her last act is not destruction, but choice: she entrusts her scale and her warning to a man she has only just met.",
            },
            {
                name: "Vex",
                role: "Seeker with Her Mother's Notes",
                emoji: "🗡️",
                gradient: "from-violet-600 to-fuchsia-600",
                bio: "Quick-voiced, sharp-eyed, and carrying a bundle of notes that point toward Thornwick and the crater beyond it. Vex has been following clues left by her mother for years, and every answer seems to lead deeper into the same old draconic mystery.",
            },
            {
                name: "Thornik",
                role: "Dwarven Engineer",
                emoji: "🔨",
                gradient: "from-stone-500 to-amber-700",
                bio: "A practical dwarf with soot on his gloves and dragon-forge obsession in his bloodline. Thornik came hunting the truth behind his grandfather's journals and is far more interested in impossible mechanisms than in prophecy, until the two turn out to be the same thing.",
            },
            {
                name: "Serana",
                role: "Warden of Silver-Gold Light",
                emoji: "✨",
                gradient: "from-yellow-400 to-amber-500",
                bio: "She arrives at the edge of the fight with wardlight blazing and turns a desperate skirmish into survival. Serana clearly knows more about the spreading shadow than she is ready to explain, which makes her both vital and difficult to trust.",
                image: "/images/characters/serana.png",
            },
        ],
        chapters: [
            {
                slug: "chapter-1-dawns-reckoning",
                chapterNumber: 1,
                title: "Dawn's Reckoning",
                label: "Chapter 1",
                shortDescription:
                    "Caelin reaches ruined Thornwick, descends into the crater, survives an impossible dragon-bonding, and forms a reluctant party around the first visible sign of the Concord's collapse.",
                opening:
                    "Three days out of Ashford, Caelin has little to guide him except the road and the stale habit of staying in motion. Then he sees smoke. By the time he reaches Thornwick, dawn has broken over a village that looks as though something vast and furious tore the heart out of it during the night.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Dawn's Reckoning",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-1/act-1-thornwick-dawn.jpg",
                        imageCaption: "Thornwick at first light",
                        summary: `He'd been three days out of Ashford when he smelled the smoke—the wrong kind, not hearth-fire or forge-smoke but the flat, mineral bite of stone that had changed its mind about being stone. He'd been heading nowhere in particular, the way a man does when the war is over and the shape of peacetime hasn't settled yet. A hedge-knight's work: a missing horse here, a disputed boundary there. Small things. Useful things. Things that didn't ask him to be more than he was.
Then the smoke.
Thornwick still smoked when Caelin rode in at first light.
Ash muffled the cobbles, the horse's hooves swallowed by the soft texture and depth of the soot-packed street. Melted stone and hot glass mingling with the acrid bite of charred timber. Houses hadn't burned so much as slumped: wooden beams turned translucent, doorframes sagging into glossy curves, window mullions weeping clear droplets that froze mid-fall. Even the lane stones had softened and set again, their surfaces ridged like cooled lava.
He'd seen dragonfire before—in the war, villages reduced to char and ash in minutes. But this was different. This fire hadn't consumed. It had transformed.
A cry—thin, desperate, trapped—cut through the silence.
He ran.
At the end of the south lane, a cottage had folded in on itself like a paper lantern crushed by an invisible fist. "Hold on!" Caelin called, dropping to his knees in the debris. "Where are you?"
"Here," a small voice gasped, barely audible through the rubble. "It's hot—please—"
He found her beneath a collapsed roof beam: maybe eight years old, freckled face streaked with soot, pinned by timber that still shimmered with residual heat. Her eyes were wide with terror, tracking the glow in the wood above her.
"You're going to be all right," he said, setting his palm against the scorching beam.
He called the flame the way he always had—shaping heat to eat along the grain, to reduce wood to ash and set her free. But the magic answered differently this time. The beam didn't char or crumble. It softened. Fibers gave way beneath his touch, going glassy and viscous, sloughing under his hand in a slow, honey-thick peel. He drew the beam aside in a translucent sheet; the instant it left contact with his skin, it hardened with a sharp crack and shattered.
The girl stared up at him with wonder and fear in equal measure.
He stared at his own hand.
"Fire shouldn't do this," he murmured, more to himself than to her.
He gathered the child up in his arms, feeling how she trembled against him. "What's your name?"
"Mira."
"I'm Caelin. Close your eyes now. The air's bad out here."
Outside, where the square's wind provided some relief from the smoke, she curled into his travel cloak like it was the only safe thing left in the world. Her lips trembled as she tried to form words.
"Mama said to hide," she whispered finally. "But the red lady saw me anyway. She spoke to me."
"The dragon?" Caelin asked, though something in his chest already knew the answer.
Mira nodded, her small fingers clutching his cloak tighter. "She said she was looking for the ember-born. She said she was sorry but she had to know." The child's voice dropped to barely audible. "Then she sang something. A rhyme. Over and over while the fire came. I... I remember it."
Before he could respond, Elder Gareth emerged from the smoke—one cheek blistered raw, his beard singed away on that side, but his eyes still steady with the kind of strength that comes from bearing witness to catastrophe.
"You saved one," the old man rasped, his voice thick with smoke and grief. "The gods bless you for it."
"She wasn't hunting," Mira whispered against Caelin's shoulder. "She kept saying she was sorry. That she had to find someone."
Gareth nodded grimly. "Dragons kill clean when they feed—quick, then gone. This was deliberate. Methodical. She melted the shrine down to its foundation stones but left the granary untouched. Destroyed the inn but spared the healer's cottage." His eyes met Caelin's. "She was testing. Calling out in the old tongue, waiting for something to answer."
Something prickled along Caelin's forearms, a readiness sharpening his awareness. He'd spent years studying fragments of Draconic in dusty libraries, and his dreams had carried sounds and syllables that weren't his own. Now the anticipation felt physical, like standing on the edge of a precipice, waiting for the moment gravity takes hold.
Mira tugged at his sleeve with surprising insistence. "The rhyme. Do you want to hear it?"
"Please," Caelin said, though the answer was already pressing against his ribs like a held breath.
The child swallowed hard and recited in a thin, earnest voice:
Nine the arts and nine the lights,
Nine the souls to set them right;
Keep the chain and guard the frame—
Wake not the Tenth that has no name.
The words settled into him like keys finding locks, fitting into spaces he hadn't known were waiting to be filled.
Gareth pointed beyond the mill with a hand that trembled slightly. "Her trail ends past the hedgerow. The ground there is..." He struggled for words. "The earth has turned to glass. Black glass, like obsidian. There's a crater, and at the center..." He shook his head. "You should see it yourself."
"I'll go," Caelin said, because any other response felt like turning away from something that had been calling him for years.
He didn't look back at Mira. He was afraid if he did he would stay, and staying felt like the wrong kind of cowardice.`,
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Binding",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-1/act-2-vharisax-binding.jpg",
                        imageCaption: "Vharisax in the obsidian crater",
                        summary: "Caelin left Mira in the elder's care and followed the path of scorched hedge and melted stone. The destruction formed a clear line—deliberate, purposeful—leading away from the village center toward the fields beyond.\nMira's rhyme clung to him like smoke. Each word seemed to settle behind his ribs, waiting for something that hadn't yet awoken.\nWhere the hedgerow ended, the earth had transformed entirely.\nA shallow crater yawned before him, perhaps fifty feet across. Its floor and walls were black glass—pure obsidian that caught the morning light and threw it back in dark rainbows. Crystalline spires jutted up from the rim like the fingers of a buried giant reaching for sky. Steam rose in lazy spirals, carrying the sharp mineral scent of transformed stone.\nAt the center lay the dragon.\nShe was vast beyond mortal scale, easily the size of Gareth's barn. Her hide had dulled from coal-red to ash-crimson, fissured along her flanks where internal heat still glowed like forge embers struggling against the dark. Each breath came as a failing rasp, wet and rattling. Her wings lay crumpled and torn, one bent at an angle that made Caelin wince. But her eyes—old gold, ancient as mountains—still held purpose.\nCaelin slid down the crater's inner slope. The glass sang beneath his boots, a low crystalline hum that resonated in his chest.\nThe dragon's eye tracked his descent and fixed on him.\nHer voice arrived not as sound but as meaning pressing directly into his mind—old Draconic rendered crystalline and clear, as if a fog he hadn't known was there had suddenly lifted.\n\"At last,\" she said, and relief colored the words. \"The bloodline answers.\"\nHe went to one knee, instinct deeper than thought. \"Why did you do this? All those people—\"\n\"I had no choice.\" came the answer, heavy with genuine regret. \"I am dying. I felt it three days ago—the rot in my heart, the fire going cold. And I carry something that cannot die with me. Something that must pass to one who can bear it.\" Her eye closed briefly. \"I searched the nearby villages. Called out in the old tongue. Used fire to test who might answer, who might have the gift to work flame differently than others.\"\n\"You killed them to test them?\" Horror and anger warred in his chest.\n\"I tested the fire,\" she corrected, and there was no defensiveness in it—only weary fact. \"Most would have burned. Only one with dragon-blood could have shaped what I wrought. Only the ember-born could have turned transformation back to wood, glass back to timber.\" Her eye opened and fixed on him again. \"You saved the child. You proved what you are.\"\nThe truth of it settled cold in his stomach. She'd been searching for him. And people had died in that search.\n\"What are you?\" he asked, voice rough.\n\"Vharisax, last guardian of the First Concord. And my time ends.\" She shifted slightly, and the movement cost her. \"But the compact must continue. The Nine must be found. The Seal must remain closed.\"\n\"The rhyme,\" Caelin said. \"The child remembered it. Nine the arts—\"\n\"Nine that weave the world,\" Vharisax said. Images flooded his mind—dragons and dwarves forging side by side, a name carved above a gate in a script older than any living tongue, nine pedestals blazing with power, and beneath them something vast and chained, pressing against its bonds. The weight of it left Caelin gasping.\nCaelin's breath had gone shallow. He didn't know when that had happened.\n\"The Nine maintain balance,\" Vharisax continued. \"Each school of magic bound into physical form, each requiring a bearer to claim it, to become it. When all nine are claimed and the bearers stand together, the Seal remains closed. But if the Nine are scattered, lost, or broken...\" Her breathing hitched. \"The Tenth stirs. And if it wakes fully, the world drowns in entropy made conscious.\"\n\"Why me?\" The question came out smaller than he intended.\n\"You carry the old blood. Faint, yes—diluted through generations—but present. You can bond with what I give you. You can survive it.\" Her foreclaw trembled as she lifted it. \"And you have no choice. I am dying now. If I do not pass this on, it dies with me. The compact breaks. The chain weakens.\"\nNestled against talon and scale lay a plate of obsidian-red, roughly the length of his thumb, hexagonal edges still carrying forge-heat. It pulsed with inner light—ember-motes drifting in its translucent depths.\nNot a shed scale. An offering.\n\"This is the key,\" Vharisax said. \"Take it. Bind yourself. Follow the path I will leave you. Find the First Sanctum and claim what waits there—the Dragon's Ember, first of the Nine, forged for Evocation itself.\" Her eye held his. \"And then find the others who must bear the rest. You cannot do this alone.\"\nHis hand hovered above the scale, every instinct screaming that this was a threshold he couldn't uncross. \"What will it do to me?\"\n\"It will mark you. Visibly. Permanently.\" No false comfort. \"It will guide you toward what must be found. It will punish deception and reward truth. It will hurt, especially at first.\" Her tone softened slightly. \"And it will make you exactly what you already are—only more so. The magic you've always carried will awaken fully. You will understand the old tongue. You will see the paths others cannot.\"\n\"And if I refuse?\"\n\"Then I die carrying this burden. The compact weakens. The Seal cracks a little more. And in a generation, perhaps two, something that should never breathe air will taste sky.\" She held his gaze. \"I do not offer you glory, ember-born. I offer you necessity.\"\nThe weight of her certainty pressed against him. The crater, the transformed village, the child's terrified eyes—all of it leading to this moment.\nCaelin closed his fingers around the scale.\nHeat surged up his arm—hot glass seeking its shape, reality rewriting itself cell by cell. For a moment the world went white, then cleared, he looked down at his right forearm.\nA thumb-length, hexagonal plate lay flush with his skin just below the elbow—dark as translucent obsidian, smooth as glass, with ember-motes drifting lazily in its depths like captured stars. The edges were perfect, geometric, inlaid so seamlessly with his flesh that he couldn't tell where the scale ended and his skin began.\nFrom its six edges, hair-fine black filaments spread like delicate root systems, threading beneath his skin in branching patterns. They ran toward his elbow, toward his wrist, mapping themselves along nerve pathways with dark precision. He could feel them settling, finding their places, becoming part of his body's geography.\nHe flexed his fingers. The embedded plate flexed with him, the filaments shifting beneath his skin like living tattoo.\n\"There,\" Vharisax said, and satisfaction colored her fading voice. \"The bond is struck. You are marked. You are chosen.\"\n\"It will answer you,\" she continued, each word coming slower. \"And it will correct you. When you speak falsehood, it will sting. When you hesitate before necessity, it will push. When you attempt to flee your purpose...\" A thread of dark humor. \"It will drag you back to the path.\"\n\"I understand,\" he said.\nThe embedded plate snapped white-hot—a needle of searing light that lanced through every nerve in his arm. He gasped, biting back a cry, and the glow subsided to steady ember.\n\"Truth,\" Vharisax said, approval warming the word. \"Already you learn. Never lie to the scale, ember-born. It knows you better than you know yourself.\"\nHe cradled his arm, feeling the residual heat pulse beneath his skin. \"What do I do now?\"\n\"Follow the flame-path I will leave. It leads to the Emberpeaks, to the First Sanctum. There you will find the Dragon's Ember—the first of the Nine Relics, the anchor of Evocation itself. Claim it. Bond with it fully.\" Her breathing grew more labored. \"Then seek the others. The bearers are out there, scattered, most unaware of what they're meant to become. You must find them. Gather them. Before the Seal breaks entirely.\"\n\"And the Tenth?\" he asked. \"What's truly buried there?\"\n\"Old,\" she whispered. \"A bargain made in the world's first age. Power that should never have been. The Nine were forged to keep it sleeping.\" Her voice dropped to bare thread. \"If you hear it calling—and you will, if you draw too close—do not answer. Do not try to wake it. Not yet. Perhaps not ever.\"\nHer chest rose once more, held, and fell for the final time. The glow along her fissured flanks dimmed—and then, instead of darkness, it brightened.\nNot the orange of living fire. Something older. Deeper. The light moved through her scales the way flame moves through paper held to a candle—catching at the edges first, the great plates along her spine curling inward as they ignited, translucent and amber before dissolving to nothing. The transformation swept forward from her tail to her throat in a slow, inevitable tide. Scale by scale, ridge by ridge, the body that had carried a thousand years of memory began to come apart—not violently, not with heat or sound, but with the quiet authority of something that had decided it was finished.\nCaelin couldn't move. Couldn't look away.\nVharisax burned like a letter burning—edges first, then the body of the thing, each piece glowing brilliant before it released. Her wings went last, the great membranes thinning to lace, to light, to nothing. Where she had lain, the crater floor held only the ghost of her outline in glass.\nAnd then the embers came for him.\nThey rose in a slow column—ten thousand motes of ash and amber light, drifting upward as if gravity had briefly lost interest in them. They turned in the air above the crater, unhurried, and Caelin understood with bone-deep certainty that they were not random. They were choosing.\nThe column tilted. Descended.\nThey settled on the scale.\nOne by one, and then in streams, and then all at once—every mote of what had been Vharisax finding its way to the obsidian plate in his forearm, sinking into the translucent surface and becoming part of the ember-motes already drifting there. The scale flared so bright he had to turn his face away. Heat moved through the filaments like a second bonding—not painful this time, but immense. The weight of it. The age of it. A thousand years of flight and memory and purpose flowing into six inches of hexagonal obsidian set in a man's arm.\nWhen the last ember settled, the crater was empty.\nThe scale dimmed to its steady coal-glow. The filaments cooled. Caelin stood in the glass-smooth hollow where a dragon had died, and breathed, and tried to understand what he was carrying now.\nFrom the crater's rim, the flame-path stretched away toward distant mountains—fine as a thread of silk, bright as a road paved with light. It hadn't been there a moment ago. Or perhaps it had always been there, and something in him had finally learned to see it.\nFootsteps crunched on glass behind him.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Unlikely Alliance",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-1/act-3-vex-alliance.jpg",
                        imageCaption: "Vex at the crater rim",
                        summary: "\"Well,\" a voice observed, dry as desert wind. \"That looks profoundly uncomfortable.\"\nCaelin spun, hand instinctively moving to the sword at his hip.\nA woman leaned against the glass ridge, arms crossed, assessing him with the calm focus of a predator deciding if he was a threat or opportunity. Twin daggers rested at her hips, their hilts worn smooth with use. Her travel cloak was torn and stained with ash, and one eye was green while the other shone gold, catching the light like a cat's.\nHer expression suggested she found the entire situation darkly amusing.\n\"Virella Sunshadow,\" she said, not moving from her perch. \"Though people who haven't tried to murder me yet generally call me Vex.\"\n\"How long have you been there?\" Caelin asked, still catching his breath from the bonding.\n\"Long enough.\" She pushed off from the stone and slid down the glass slope with practiced ease, boots finding purchase where he would have slipped. \"Long enough to watch a dragon die passing something to a stranger. Long enough to see that very permanent addition to your arm.\" Her mismatched gaze dropped to the embedded scale, studying it with professional interest. \"Interesting accessory. Not exactly subtle.\"\nCaelin instinctively tried to cover it with his other hand, then stopped. What was the point? The scale was flush with his skin, inlaid like jewelry he could never remove. \"You shouldn't be here. This is—\"\n\"Dangerous? Obviously.\" Vex stopped a few feet away, close enough to talk comfortably, far enough to react if he proved hostile. \"But I've been tracking something dangerous for months now, so the ambiance feels appropriate.\"\n\"Tracking what?\"\n\"Answers.\" She pulled a water-stained journal from inside her cloak and held it up briefly before tucking it away again. \"My mother was a scholar. Obsessed with old alliances, ancient pacts, something she called 'fire-kept covenants.' She died six months ago in the Emberpeaks, and all I have left are her research notes and more questions than sense.\"\nVex gestured at the dragon's crystalline corpse. \"Her last journal entry mentioned rumors of a dragon searching for something. That was three weeks before she disappeared. So when I heard about a dragon burning villages in a very specific pattern—not raiding, not feeding, but searching—I followed the trail.\" Her eyes met his. \"And here I find not treasure, but you. With that.\" A nod at his arm.\nThe scale pulsed warm against his skin, but didn't sting. Whatever else Vex might be hiding, she was being honest about her motivations.\n\"Your mother was looking for the same thing the dragon gave me,\" Caelin said slowly.\n\"Was she?\" Vex's tone sharpened with interest. \"And what exactly did that dying dragon give you, besides permanent body modification?\"\nHe hesitated. The scale warmed in warning—truth or pain, choose. \"A burden. A purpose. A path to follow.\"\n\"How poetically vague.\" But her eyes tracked to something behind him, and her expression shifted. \"What are you staring at?\"\nCaelin glanced back at the flame-thread stretching toward the mountains, then returned his attention to her. \"You can't see it?\"\n\"See what?\" Vex followed his gaze, squinting at empty air above the crater's rim. \"All I'm getting is heat shimmer and the worst headache I've had in months. Which, given my lifestyle, is saying something.\"\n\"There's a path. Fire, but not fire. Leading into the Emberpeaks.\" He flexed his marked arm, feeling the scale pulse in time with the distant thread. \"The dragon said only those marked could see it.\"\n\"Of course she did.\" Vex rubbed her temples. \"Let me guess—this invisible magic road leads straight into the mountains where my mother vanished. Where the last three caravans disappeared without a trace. Where absolutely nothing good has been heard from in half a year.\"\n\"Probably.\"\n\"Perfect.\" She let her hands drop and fixed him with an evaluating look. \"New arrangement, then. You need someone watching your back while you follow your glowing destiny path. I need someone who can actually see where we're going and potentially lead me to what my mother died seeking.\"\n\"We?\" Caelin raised an eyebrow.\n\"You walk in front,\" Vex said with the practicality of someone who'd survived on the margins, \"drawing every monster's attention with that beacon in your arm. I follow behind, keeping us both alive with my actually useful skills like not getting eaten. Meanwhile, we both get closer to our answers.\"\n\"That's your pitch? I'm bait?\"\n\"Mutually beneficial bait.\" Her mouth quirked. \"Look, you're going into those mountains whether I come or not—I can see it in your face. That scale's already made the choice for you. And I'm going regardless of whether you want company, because my mother's last camp was somewhere in those peaks and I'm not leaving until I know what happened to her.\"\nShe crossed her arms. \"So we can stumble into whatever's waiting separately and probably both die, or we can watch each other's backs and maybe one of us survives long enough to accomplish something. Your choice, ember-boy.\"\nThe nickname irritated him, but the logic was sound. And the scale wasn't stinging—she meant what she said.\n\"You said your mother called them 'fire-kept covenants,'\" Caelin said. \"Did her notes mention anything about Nine? Or about something sealed?\"\nVex's expression sharpened. \"The Ninefold Concord. She had that phrase written everywhere in her later journals—underlined, circled, with question marks. She thought it was some kind of alliance between dragons and... someone else. Dwarves, maybe. From before the kingdoms.\" Her mismatched eyes narrowed. \"Why?\"\n\"Because the dragon spoke of Nine relics. Nine bearers. And something called the Tenth that has to stay sleeping.\" The words felt too big, too important for the smoking crater and morning light. \"Your mother was looking for the same thing I've just been bound to find.\"\nFor a long moment, Vex was silent, her expression cycling through several emotions before settling on grim determination. \"Then I'm definitely coming with you. If the thing that killed my mother is connected to whatever's in your arm, I want to be there when we find it.\"\n\"It might not have been a thing that killed her,\" Caelin said quietly. \"The mountains are dangerous even without ancient conspiracies.\"\n\"Maybe.\" Vex's hand drifted to one of her daggers, a habitual gesture that spoke of comfort rather than threat. \"But she was too good to die to something ordinary. Too careful. If something in those peaks took her, I need to know what. And I need to know if it's still there.\"\nThe scale pulsed steady and warm. No sting. Truth spoken plainly.\n\"We leave as soon as I can gather supplies from what's left of the village,\" Caelin said. \"The path leads east toward the Emberpeaks. The dragon said there's a sanctum there—the First Sanctum, she called it. That's where we're going.\"\n\"We.\" Vex's mouth twitched into something almost like a smile. \"Look at that. Partnership established through mutual desperation and probable doom. My favorite kind.\"\n\"I should warn you,\" Caelin added, looking down at the scale embedded in his arm, watching the ember-motes drift in its translucent depths. \"This thing has rules. It punishes lies. Forces truth. I'm not entirely in control of what I might say anymore.\"\n\"Good,\" Vex said, surprising him. \"Lies get people killed. I'd rather travel with someone who can't lie than someone I have to constantly second-guess.\" She glanced at the dragon's body, her expression softening slightly. \"Besides, after watching what just happened—whatever that was—I think we're past the point where normal rules apply.\"\nThey stood in the crater's heart, the morning sun climbing higher, burning away the last of the smoke. The flame-path stretched toward distant peaks, visible only to Caelin's marked sight. The scale pulsed its steady rhythm against his skin.\n\"We should go,\" Vex said. \"Whatever was drawn by the dragon's fire might still be nearby. And I'd rather not explain to the villagers why I was watching from the shadows while their savior got magically branded.\"\n\"Fair point.\" Caelin took one last look at Vharisax—already transforming into monument, into legend, into the glass-frozen history of this place. \"Thank you,\" he said quietly, not entirely sure if he meant it for the burden or the purpose or simply for answering the question his entire life had been circling.\nThe dragon didn't answer. She'd said everything she needed to.\nThey climbed the crater's slope together, glass singing its low crystalline note beneath their boots. At the rim, Caelin paused, looking toward Thornwick's smoke and then toward the Emberpeaks' distant blue silhouette.\nBehind them, the dragon lay in her crater of transformed earth.\nAhead, the flame-path beckoned with patient, inexorable pull.\nAnd on his arm, the scale kept its steady count of heartbeats, marking time until destiny could no longer be delayed.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: The Path Forward",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-1/act-4-path-forward.jpg",
                        imageCaption: "Caelin and Vex leaving Thornwick",
                        summary: "They returned to Thornwick as the sun climbed toward noon, walking through streets that would never be the same. The transformation was everywhere—glass-smooth walls that had been wood, crystalline puddles where water had boiled and frozen in the same instant, cobblestones fused into organic curves that caught light like gems.\nPeople stared as they passed. Not at Vex—she drew glances, certainly, with her mismatched eyes and road-worn bearing—but at Caelin. At his arm.\nHe'd rolled up his sleeve without thinking, too hot from the climb out of the crater. Now the embedded scale was visible to anyone who looked: that thumb-length hex of dark obsidian inlaid flush with his skin, the hair-fine filaments threading away from its edges like black veins beneath the surface. The ember-motes drifted lazily in the scale's depths, visible even in daylight.\n\"They're afraid,\" Vex murmured beside him.\n\"I saved a child,\" Caelin said, but even to his own ears it sounded hollow.\n\"You did. And then you went to meet a dragon and came back changed.\" She kept her voice low, conversational. \"People fear what they don't understand. And that—\" a subtle gesture at his arm \"—they definitely don't understand.\"\nThe scale pulsed warm. No sting. She was right, as usual.\nThey found Elder Gareth in the village square, directing a handful of survivors as they loaded a wagon with salvaged supplies. He looked up as they approached, his gaze going immediately to Caelin's exposed forearm.\nThe old man's eyes widened, then narrowed with something that might have been recognition.\n\"So,\" Gareth said quietly, straightening with effort. \"She marked you.\"\n\"You know what this is?\" Caelin asked, surprise and relief mixing in equal measure.\n\"I'm old enough to remember stories my grandmother told. Stories her grandmother told her.\" Gareth stepped closer, studying the scale without touching. \"The dragon-marked. The ember-born. The old songs spoke of them—those who carried fire in their blood and could be chosen as bearers for something greater.\" His voice dropped. \"I didn't think I'd live to see it proven true.\"\n\"The dragon—Vharisax—she said I have to find something. Nine somethings. Relics, she called them. And gather others who can bear them.\" The words tumbled out faster than intended. \"She said if I don't, something sealed beneath the mountains will wake. Something that shouldn't.\"\nGareth was quiet for a long moment, his weathered face unreadable. Then he nodded slowly. \"Then you'll go. You don't have a choice, do you?\"\nCaelin looked down at the scale. \"No. I really don't.\"\n\"The mark won't let you,\" Gareth said with certainty. \"It'll pull you toward what needs doing. Push you when you hesitate. Drag you if you try to run.\" He met Caelin's eyes. \"My grandmother said the dragon-marked were blessed and cursed in equal measure. The blessing: purpose absolute. The curse: no peace until that purpose is fulfilled.\"\n\"That's about right,\" Vex muttered.\nGareth turned his attention to her, assessing. \"And you are?\"\n\"Someone following him because he's following something I need to find.\" Vex's honesty was almost aggressive. \"My mother died in those mountains looking for whatever he's bound to seek. I'm going to find out why.\"\nThe elder nodded as if this made perfect sense. \"Then you'll watch his back while he watches the path. Good. He'll need someone practical.\" He turned back to Caelin. \"When do you leave?\"\n\"Today,\" Caelin said, though he hadn't consciously decided. The scale warmed in agreement. \"The path leads to the Emberpeaks. The sooner we follow it, the sooner...\" He trailed off, unsure how to finish.\n\"The sooner you can rest,\" Gareth finished for him. \"If you ever can.\" He clasped Caelin's shoulder with surprising strength. \"You saved my granddaughter. That's a debt Thornwick won't forget. If you need supplies, take them. If you need silver, we have a little. If you need a blessing—\" his voice roughened \"—you have mine. Go with purpose. Return with answers.\"\n\"I'll try,\" Caelin managed.\n\"Don't try. Do.\" Gareth's grip tightened. \"The dragon chose you for a reason. Trust that, when everything else fails.\"\nA small voice called out: \"Caelin!\"\nMira broke away from a group of children and ran toward them, her soot-stained dress flapping. She skidded to a stop in front of him, eyes wide and bright.\n\"You're leaving,\" she said. Not a question.\n\"I have to.\"\n\"Because of what the red lady gave you.\" Her gaze dropped to his arm, to the scale embedded there. She reached out one small hand, hesitated, then gently touched the obsidian surface with one fingertip.\nThe scale pulsed beneath her touch—a single bright flare of light that made the ember-motes swirl faster. Mira gasped but didn't pull away.\n\"It's warm,\" she whispered. \"Like a heartbeat.\"\n\"It is, in a way,\" Caelin said, his throat tight.\nMira pulled her hand back and looked up at him with an intensity that seemed too old for her age. \"The rhyme. The one the dragon sang. You're going to find what it talks about, aren't you? The Nine?\"\n\"Yes.\"\n\"Will you come back?\"\nThe question hit harder than expected. The scale stayed steady—it would let him answer honestly either way. \"I don't know,\" he said. \"The path is long. What I'm looking for is dangerous. But if I can...\" He stopped, tried again. \"I'll try.\"\nThe scale stung—sharp and bright. He winced.\nMira's eyes widened. \"It hurt you. Why did it hurt you?\"\n\"Because I wasn't being truthful enough.\" He knelt so they were eye-level. \"Let me try again. I don't know if I'll come back. What I'm doing might take years. It might take me to places I can't return from. But—\" and this he knew was true, felt it bone-deep \"—if I succeed, if I find what I'm meant to find, then places like Thornwick will be safer. Dragons won't come searching. Villages won't burn. Children won't lose their mothers.\"\nThe scale stayed warm. No sting. Truth accepted.\nMira nodded solemnly, then surprised him by wrapping her arms around his neck in a fierce hug. \"Then you have to succeed,\" she whispered against his shoulder. \"You have to.\"\n\"I will,\" he said, and hoped it wasn't a lie.\nWhen she pulled back, she was crying, but her chin was set with determination. \"I'll remember the rhyme. Every word. And when you come back, I'll say it to you again so you know I kept it safe.\"\n\"I'd like that.\"\nGareth gently called Mira back, and she went reluctantly, looking over her shoulder until she disappeared into the group of children being loaded onto the wagon.\n\"They're evacuating to Millbrook,\" Gareth said. \"The village council there owes us a debt from the grain shortages five years back. We'll rebuild. Someday.\" He looked around at the glass-transformed ruins. \"Or we'll build something new. Either way, we'll survive.\"\n\"I'm sorry,\" Caelin said. \"If I'd come sooner—\"\n\"You came when you could. You saved who you could.\" The elder's voice was firm. \"That's all anyone can ask. The rest is on the dragon, and she's answered for it.\"\nVex touched Caelin's arm—the unmarked one. \"We should go. Afternoon's burning, and I'd rather be in the foothills before dark. Less chance of running into whatever might be drawn by the dragon's death.\"\nShe was right. The scale pulsed agreement.\nCaelin looked around at Thornwick one last time—at the survivors, the transformed buildings, the smoke still rising from deeper ruins. He'd arrived at dawn to find catastrophe. He was leaving at midday carrying a burden he barely understood.\nBut the flame-path stretched before him, bright and insistent and impossible to ignore.\n\"Take this,\" Gareth said, pressing a small pouch into Caelin's hand. It clinked with coin. \"Not much, but enough to get you through the next few towns. And this—\" He pulled a folded piece of cloth from his pocket, opened it to reveal a simple silver pendant on a leather cord. \"My wife's. She'd want you to have it. For luck.\"\n\"I can't—\"\n\"You can, and you will.\" Gareth closed Caelin's fingers around it. \"Honor her memory by surviving whatever's ahead.\"\nCaelin nodded, unable to speak past the tightness in his throat.\nThey gathered what little they needed—dried meat, water skins, a spare cloak for Vex—and walked to the eastern edge of the village where the flame-path led. The thread of fire stretched across the fields toward where the land began its climb into the foothills.\nOnly Caelin could see it, but he felt its pull like a physical thing now, stronger with each passing moment. The scale pulsed in rhythm with it, urging him forward.\n\"So we just... walk toward the mountains?\" Vex asked. \"Following something only you can see?\"\n\"That's the plan.\"\n\"Terrible plan.\" But she adjusted her pack and checked her daggers. \"I've followed worse.\"\nThey set out together, leaving Thornwick's smoke behind. The flame-path stretched before them like a thread connecting present to uncertain future. Caelin kept his marked arm exposed—there was no point hiding it, and the scale seemed to pulse brighter when covered, as if objecting to concealment.\nAs they walked, the embedded scale kept time with his heartbeat, a steady rhythm that was both foreign and intimate. The filaments beneath his skin had settled into their patterns, no longer feeling like invasion but like something that had always been there, waiting.\nThe Emberpeaks grew larger on the horizon, their slopes darkening from blue to grey as afternoon light shifted. Somewhere in those mountains waited the First Sanctum. Somewhere ahead lay the Dragon's Ember, first of the Nine Relics.\nAnd somewhere beyond that—beyond the paths and purposes and ancient pacts—waited the thing that must never wake.\nBut that was future's problem. Present's problem was putting one foot in front of the other, following a path of fire only he could see, trusting a scale embedded in his flesh to guide him true.\n\"So,\" Vex said after they'd walked in silence for a while, \"what happens when we actually reach this sanctum? Do you have a plan?\"\n\"Find the relic. Don't die. Probably in that order.\"\n\"That's not a plan. That's barely even hope.\"\nThe scale pulsed warm. No sting. It was the truth.\n\"It's what I have,\" Caelin said.\n\"Then I guess it'll have to be enough.\" Vex squinted toward the mountains. \"Though for the record, I still can't see anything except regular mountains and impending doom.\"\n\"The doom's definitely there.\"\n\"Fantastic.\" But there was something almost like humor in her voice. \"At least we're doomed together. That's practically a friendship.\"\nDespite everything—the weight of the mark, the magnitude of the task, the uncertainty of what lay ahead—Caelin found himself almost smiling.\nThe flame-path stretched onward. The scale pulsed steady. The mountains waited.\nAnd somewhere in the distance, something ancient stirred in its sleep, feeling the first link of the chain being forged anew.",
                        isPublished: true,
                    },
                ],
                voteQuestion: "Who should Caelin trust first as the flame-path begins?",
                votePrompt:
                    "This first vote determines who gets the clearest early connection to Caelin in Chapter 2. Future chapter votes can shift to yes-or-no decisions, survival choices, or branching action beats.",
                voteOptions: [
                    {
                        id: "vex",
                        title: "Trust Vex's Notes",
                        description:
                            "Let Vex lead the first stretch of the journey using her mother's notes, even if it means following information Caelin cannot verify yet.",
                        risk:
                            "If the notes are incomplete or manipulated, the group could walk directly into whatever killed Vharisax.",
                    },
                    {
                        id: "thornik",
                        title: "Rely on Thornik's Journals",
                        description:
                            "Put Thornik's dragon-forge knowledge first and investigate the mechanical side of the binding, the scale, and the script before trusting prophecy.",
                        risk:
                            "The answers might come too slowly if the shadow is moving faster than their understanding.",
                    },
                    {
                        id: "serana",
                        title: "Follow Serana's Wardlight",
                        description:
                            "Accept that Serana knows more than she is saying and let her set the pace while the others catch up to the danger.",
                        risk:
                            "Trusting the least transparent person in the group may bind Caelin to a cause he does not yet understand.",
                    },
                ],
                winningOptionId: "serana",
            },
            {
                slug: "chapter-2-gathering-shadows",
                chapterNumber: 2,
                title: "Gathering Shadows",
                label: "Chapter 2",
                shortDescription:
                    "Three days after Vharisax's death, Caelin wakes changed, returns to the crater with Vex, and meets Thornik as the first larger signs of the Concord's awakening begin to gather around them.",
                opening:
                    "The fever breaks three days after the dragon's death, but the bond does not loosen. Caelin rises altered, Thornwick still smolders, and the road toward the Emberpeaks is interrupted by a new arrival carrying instruments, grief, and answers that may be even worse than the questions.",
                status: "voting",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Three Days Later",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-2/act-1-three-days-later.jpg",
                        imageCaption: "Caelin returns to the crater as the bond settles in",
                        imageRevealAfterParagraph: 8,
                        summary: "Three days had passed since the dragon's death, and Thornwick still hadn't stopped smoking.\nCaelin had spent most of that time in fever dreams, his body fighting the scale’s invasion while his mind spiraled through visions he couldn’t hold. Even asleep, pain was his pulse—the scale burned, a low ember ache that never cooled. The bonding hadn’t been clean; it rewrote him from the inside out. He’d burned so hot that Vex packed him in snow from shaded hollows just to stop him smoking.\nBy the third morning, the fever broke.\nThe scale settled to its baseline: a thumb-length, hex-edged plate lying flush in his skin, translucent obsidian with ember-motes drifting inside, pulsing steady. The filaments had spread—not just toward wrist and elbow now, but creeping past the joint. Dark threads visible beneath skin that would never look quite normal again.\nHe flexed his fingers, testing. The embedded plate flexed with him. The filaments shifted like roots seeking deeper soil.\n\"You look less on fire today,\" Vex said from the doorway of the half-collapsed inn where they’d taken shelter. Her eyes didn’t match—one gold-hazel, one storm-grey—the only inheritance from a mother who’d spent her life studying magic she wasn’t supposed to touch. \"Improvement or just denial?\". She held a clay cup that steamed in the morning chill.\n\"A little.\" The truth came easier after three days of the scale punishing every half-lie his fever-addled mind had tried. \"Different now. Less like fire, more like... weight.\"\n\"The veins are spreading.\" Not a question. She'd been watching the progression, cataloging it with the same attention she gave potential threats and profitable opportunities.\nHe tugged his sleeve down. The cloth caught on the plate's raised edge—a small, stupid reminder he would never hide it for long. \nHe’d tested it that morning out of stubbornness—wrapped it, braced it, even tried steel.: linen wrappings had smoldered after an hour, and the leather bracer from the inn's abandoned supplies had conducted heat until it burned his skin, leaving blisters that still throbbed. Metal was worse—the scale had flared white-hot the moment steel touched it, as if offended by the attempt at concealment.\n\"Right,\" Vex said, watching the sleeve ride back up. \"Not ominous at all.\"\nShe handed him the cup—broth made from dried vegetables and questionable meat, but hot and real. \"Drink. You need to eat actual food today or you'll collapse halfway to wherever that magic compass in your arm wants to drag us.\"\nHe sipped. It tasted like survival—not good, but good enough. \"You stayed.\"\"You didn’t have to,\" he said, surprised how small his voice sounded.\n\"Investment protection.\" She settled against the opposite wall, her own cup cradled in scarred hands. \"Spent three days keeping you alive, forcing water down your throat when you tried to bite me, and listening to you speak fluent Draconic in your sleep—which was deeply unsettling, by the way. Would be wasteful to let you die now.\"\nThe scale stayed warm. No sting. Close enough to truth—she had stayed for practical reasons, even if other reasons were growing beneath the surface.\n\"The dreams,\" he said. \"What did I say?\"\n\"Nothing I could understand. But you said it with authority.\" Her mismatched eyes studied him. \"And that thing—\" a gesture at his arm \"—lit up the whole room every time you started. Like sleeping next to a forge that randomly decided to perform a light show.\"\nHe'd noticed. The scale answered emotion as much as magic: hesitation brought the white-hot sting; fever dreams brought the full prismatic display. He was learning to school his thoughts, to keep them surface-level and practical, to not think too deeply about what he'd become.\nThe scale warmed slightly. It knew what he was doing.\n\"We should go back,\" Caelin said, pushing to his feet. His legs protested but held. \"To the crater. I need to see it with clear eyes.\"\n\"Already scouted it twice.\" But Vex stood as well, checking her daggers from habit. \"Nothing's changed. Dragon's still dead and crystallized. Path still leads to the mountains. Village still looks like someone melted it into modern art.\"\n\"I need to see it anyway.\"\nShe shrugged. \"Your funeral. Or mine, probably, since I'm following you.\"\nThey left the inn as morning light turned the transformed village into something almost beautiful. Glass-smooth walls caught sun and threw rainbows. Crystalline puddles reflected sky in fractured mirrors. Even the destruction had an elegance to it—the way catastrophe sometimes does, when you're far enough away from the dying.\nPeople watched them pass. Fewer than before—half the survivors had already left for Millbrook, unable to stay in a place that wore its trauma like decoration. Those who remained were the stubborn or the broken, the ones with nowhere else to go or reasons to stay that outweighed sense.\nA woman carrying a child saw Caelin's exposed forearm and made a warding sign.\nAn old man simply stared, mouth working soundlessly.\n\"They're afraid,\" Vex murmured.\n\"I saved a child here.\"\n\"You did. Then you went to meet a dragon and came back changed.\" She kept her voice low. \"People fear what they don't understand. That—\" a subtle gesture \"—they definitely don't understand.\"\nThe scale pulsed warm. She was right, as usual.\nThey followed the path of scorched hedge and melted stone toward the crater. The destruction formed a clear line—deliberate, purposeful—leading away from the village center. Morning mist clung to the hollows, making the landscape seem unreal, halfway between memory and present.\nWhere the hedgerow ended, the crater waited.\nShe was gone. Not crystallised, not preserved—gone entirely. The glass floor held only the ghost of her outline, a perfect dragon-shaped shadow scorched into the obsidian where ten thousand years of history had finally settled and gone dark. The ember-motes in Caelin’s scale drifted a little faster as he slid down the slope. He wondered if they knew.\n\"What are you looking for?\" Vex called from the rim.\n\"I don’t know.\" He crossed to the centre and crouched at the outline’s edge. The glass was warm here—just faintly, the last of it. His marked arm pulsed once in recognition, amber light catching nothing.\n\"Thank you,\" he said quietly, not sure if it was gratitude or accusation. Maybe both.\nThe glass didn’t answer.\nFootsteps crunched above—not Vex, different rhythm. Caelin turned, hand moving instinctively toward the sword he'd left at the inn.\nA figure crested the crater's rim from the north side—short, broad, trailing a small cloud of steam and the unmistakable tick-tick-whirr of clockwork in motion. Even at a distance, the mechanical clicking carried across the glass-smooth bowl with crystal clarity.\n\"That's either the world's loudest thief,\" Vex called down, daggers already in hand, \"or a very confused tinker.\"\nThe figure resolved as it descended: a dwarf, copper beard braided with gear-charms that glinted in the light, goggles pushed up on a wild-browed forehead revealing keen eyes beneath. A pack that seemed more metal than leather rode his shoulders, bristling with tools and devices and things that hummed. He stopped twenty feet away, tilted his head at Caelin like a bird examining something shiny, and beamed with the particular joy of someone proving themselves right after a long argument.\n\"Aha!\" The dwarf's voice carried genuine delight. \"Knew the readings couldn't be wrong. Well, they're usually wrong, but not about this. Never about this.\"\nHe unslung a brass contraption from his shoulder—a brass contraption of spinning dials and trembling needles that twisted light in uneasy patterns. He pointed it at Caelin.\nThe device screamed.\nNot metaphorically—literally shrieked, a high metallic wail that sent birds scattering from the crater's rim and made Caelin's teeth ache.\nThe dwarf slapped it. The screaming became sparking. He slapped it again. Silence, except for an ominous ticking that suggested the device was either thinking or plotting revenge.\n\"Brilliant,\" he told the device with genuine affection. Then, to them: \"Thornik Bramblebrew. Artificer, engineer, and occasional brewer of exploding ale—though that last bit's more accident than intention. You're the Ember-born, unless my instruments are lying. Which they don't, except when they do, but not about dragon-marks. Never about dragon-marks.\"\nThornik's eyes went wide behind his pushed-up goggles. \"By my beard.\" His voice dropped to something like reverence. \"It recognized my kit.\"\nHe took a step closer, goggles sliding down over his eyes with a mechanical snick. The lenses whirred, adjusting, magnifying. \"May I? Grandfather wrote about this—well, he wrote in blood, technically, which was dramatic even for him—but if the resonance patterns match what he described, if the harmonic frequencies align, if the—\"\nVex shifted between them—not blocking entirely, but making her presence felt. \"Maybe ask before reaching for things embedded in people's arms. Novel concept, I know.\"\nThornik held up both hands, device still humming. \"Fair, fair. Wouldn't want to interfere with an active bonding anyway. Could cause sympathetic feedback loops.\" He paused, considering. \"Or explosions. Fifty-fifty odds, really, and explosions are only fun when they're intentional.\"\n\"Comforting,\" Caelin said, instinctively covering the scale with his other hand. It pulsed warmer, as if objecting to being hidden even by his own flesh.\n\"What brings an artificer to a burned village?\" Vex asked, still wary, still positioned to strike if needed.\n\"Same thing that brought him, I'd wager.\" Thornik's enthusiasm dimmed slightly, replaced by something heavier—old grief wearing new clothes. \"The dreams. My whole clan's been having them for months. Forges waking in the deep places where we sealed them. Constructs stirring in halls we'd forgotten. The old songs starting up again in chambers we'd filled with stone and regret.\"\nHe gestured at the dragon's crystalline corpse, at the transformed crater, at the morning light making art of catastrophe. \"Then three nights ago—the exact night she died—every piece of sensing equipment in Deepstone Hold went mad at once. Every dial spinning. Every alarm screaming. Every blessed instrument pointing here, at this spot, saying 'something fundamental just changed.'\"\nThornik pulled a water-stained journal from his coat—leather gone soft with age and handling, pages brittle at the edges, stained with substances that might have been blood or oil or tears. \"My grandfather died believing himself a fool for chasing legends. Spent his last gold on an expedition into the Emberpeaks, came back empty-handed and broken-spirited. Wrote in this—in his own blood, mind you, because apparently sanity's optional in our family—about hearing old songs, about seeing the pedestals of the Nine, about...\"\nHe trailed off, shook his head, but his hands clutched the journal like it might escape. \"About warnings. Prices paid. Choices that haunt. He died thinking he'd failed. That he'd missed something vital. That he'd doomed us all by not understanding fast enough.\"\nThe dwarf's eyes met Caelin's, and the weight there aged him. \"Point is, if he was right about any of it—if even one page of his mad rambling was true—then everything changes. The old alliances weren't myths. The Concord wasn't legend. And whatever's waking now...\" He glanced at the scale in Caelin's arm. \"It's already started.\"\nThe scale flared hot for just a moment—not pain, but insistence. Share it. Tell him. The dragon had said to find others, to gather bearers. This dwarf had come seeking the same truth. His grandfather had died chasing it.\nCaelin hated that the scale was probably right.\n\"The dragon spoke of nine relics,\" he said, the words feeling too large for the smoking crater and morning light. \"Forged in concordance. Nine bearers to claim them. And something beneath stone—something called the Seal—that has to stay sleeping.\"\nThornik's face cycled through several emotions in rapid succession: shock, vindication, terror, and finally settling on manic determination. \"The Concord of Nine. Gods and ancestors and all the stone beneath, he was right.\"\nHe opened the journal with trembling hands, pages crackling. \"Grandfather wrote about it. The great alliance—dragons and dwarves forging together, nine artifacts to maintain the balance, one for each school of magic. But there were warnings too. About prices. About sacrifices. About—\" his voice dropped \"—about what happens if the balance breaks.\"\n\"What happens?\" Vex asked, climbing down into the crater now, curiosity overriding caution.\nThornik looked up from the journal, and his expression was bleak. \"He didn't write it. Just left blank pages with one phrase: 'May none live to learn the answer.'\"\nSilence stretched between them, broken only by the soft ticking of Thornik's devices and the distant sound of Thornwick's survivors going about the grim business of salvage and departure.\nThe scale pulsed steady in Caelin's arm—counting heartbeats, marking time, waiting for whatever came next.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Artificer's Burden",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-2/act-2-artificer-burden.jpg",
                        imageCaption: "Thornik and the weight of ancient knowledge",
                        imageRevealAfterParagraph: 6,
                        summary: "Thornik did not stop talking for the next ten minutes, which turned out to be useful because panic had no room to settle while his words kept moving. He spread his grandfather's journal on a flat seam of obsidian and weighed the corners with brass calibration weights from his kit. The pages were brittle, ink feathered where blood had thinned, but the symbols were clear enough to follow: nine circles around one barred gate, runic notations in old dwarven shorthand, and margin notes that looked less like scholarship and more like a man arguing with his own fear.\nVex crouched beside him, one knee on the glass, dagger still in hand out of habit rather than threat. Caelin stood over both of them, scale warm and pulsing, feeling each mention of the Concord tighten something behind his ribs. Every time Thornik reached a line that matched what Vharisax had said, the scale brightened as if in agreement.\n\"He mapped a route,\" Thornik said, tapping the journal with a soot-blackened finger. \"Not to the center of the Emberpeaks like everyone assumes. To a lower shelf valley on the western side. Called it the First Approach. Said the main gates were sealed, but the auxiliary intake tunnels might still answer old forge-key frequencies.\"\n\"In words I can understand?\" Vex asked.\n\"There's a side door,\" Thornik said, then frowned. \"A very dangerous side door. Probably trapped. Definitely unstable. Potentially haunted by ancient defensive constructs with poor social skills.\"\nCaelin almost smiled, then didn't. \"And this side door leads to the First Sanctum?\"\n\"If Grandfather wasn't delirious, yes.\" Thornik closed the book gently. \"If he was delirious, we still have your glowing arm-road and a village full of people who watched a dragon choose you. So either way, we are unfortunately in this together.\"\nThey returned to Thornwick by noon, and the village square had changed from mourning to motion. Wagons were lined in rows, survivors sorting what they could carry from what they had to abandon. Elder Gareth was directing teams with the rough authority of someone too tired to perform grief in public. When he saw Thornik, his expression tightened, then eased when the dwarf introduced himself and offered practical help before prophecy.\nBy afternoon, Thornik had converted the ruined smithy into a temporary workshop. He set resonance rods in the old quenching trough, drew an improvised star-map across a split worktable, and tuned a palm-sized compass engine until it hummed in harmonics that made the scale on Caelin's arm answer in a low ember throb. Vex watched everything, committing routes and tool placements to memory the way other people memorized prayers.\n\"There are three truths,\" Thornik said as evening fell and the first ward-lamps were lit. \"One: the corruption is spreading faster than the clans predicted. Two: the relic in your arm is active, which means others may be waking too. Three: if we walk into the peaks blind, we die in a place no one will find.\"\n\"So we don't walk blind,\" Caelin said.\n\"No,\" Vex answered before Thornik could. \"We walk prepared. And we decide what we protect first when this gets worse. Because it will.\"\nThe scale pulsed once, hard and bright, and all three of them looked toward the mountains at the same time.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Forge in the Deep",
                        imageSrc: "/images/stories/dragons-last-breath/chapter-2/act-3-forge-deep.jpg",
                        imageCaption: "The awakening of Dwarven halls",
                        imageRevealAfterParagraph: 7,
                        summary: "They left Thornwick before sunrise in a column of three, with a fourth rhythm hidden in the dark: the pulse of the scale counting the distance between decisions. Caelin rode first because he alone could see the flame-thread, Vex ranged wide and silent along the ridgelines, and Thornik muttered to his instruments like they were stubborn cousins whose cooperation could not be trusted but was still mandatory.\nThe foothills opened into basalt shelves by midday. Wind carried iron and old ash. Every few miles they found signs that did not belong to weather or wolves: claw-marks burned into stone without soot, circles of fused glass where campfires had never been, and once, a line of dwarf-runes carved recently over much older runes as if someone had returned to a warning and tried to sharpen it.\nBy dusk they reached a narrow pass where the mountain swallowed sound. Thornik raised a caution hand and knelt beside a blackened marker-stone half buried in scree. He brushed away dust and revealed a symbol of hammer-and-scale split down the center. \"Deepstone warning sigil,\" he said. \"Means don't proceed unless you're prepared to lose what you brought. In clan law, that includes certainty.\"\nThey proceeded anyway.\nThe pass emptied into an underground vestibule vast enough to hold a cathedral. Columns of obsidian-veined granite climbed into darkness. Bronze channels ran along the floor in branching geometric lines, dead for centuries and now faintly warm beneath Caelin's boots. At the far wall stood nine recesses, each shaped for something that was no longer there.\nThen the forge woke.\nNot with flame at first, but with resonance: a deep metallic note that rolled through the chamber and climbed in pitch until the hair on Vex's arms lifted. Thornik's compass engine spun wildly, then snapped to a heading straight at the central dais. The scale in Caelin's arm burned bright enough to cast hard shadows.\nConstructs emerged from the alcoves as if the stone itself exhaled them - three dwarven ward-frames of black iron and rune glass, taller than men, eyes lit by thin white slits. They did not attack at once. They scanned. Assessed. One spoke in a voice like grinding chain: \"Bearer count insufficient. Concord state unstable. Challenge protocol engaged.\"\n\"That sounded unfriendly,\" Vex said, already moving.\nThe first strike split the air where Caelin had stood. He answered on instinct, drawing heat through the scale and releasing it as a controlled arc that sheared an iron arm at the joint. Thornik hurled a magnetic spike that pinned another construct's knee to the floor. Vex used the opening to climb the third frame and drive a blade into the seam beneath its helm.\nWhen the last construct fell, the forge-note changed. Lower. Approving, almost. The bronze channels ignited in lines of ember light and converged on the central dais where an old dwarven script flared across stone: NINE MUST STAND OR NONE SHALL HOLD.\nThornik stared at the words, face pale under soot. \"Grandfather wasn't wrong.\"\n\"No,\" Caelin said, breathing hard. \"He was early.\"\nOutside, beyond the mountain mouth, they could see torch-lines moving on distant ridges - too many, too organized, and heading toward the same valleys the refugees would need to cross. Vex looked from the lights to the dais and then to Caelin's arm. \"We can't do all of it at once,\" she said. \"So what we do first is going to define who survives long enough for there to be a second choice.\"\nThe scale pulsed like a struck bell. Somewhere deeper in the mountain, something answered.",
                        isPublished: true,
                    },
                ],
                voteQuestion: "At the Emberpeaks threshold, what should the party prioritize first?",
                votePrompt:
                    "Your vote shapes Chapter 3. Choose the strategy that should lead the group's first major move in the mountains.",
                voteOptions: [
                    {
                        id: "secure-refugee-route",
                        title: "Secure the Millbrook Refugee Route",
                        description:
                            "Detour to patrol and fortify the southern evacuation corridor so shadow-thralls cannot cut down the fleeing survivors.",
                        risk: "Higher immediate civilian safety, but gives the Seal's forces more time to entrench deeper in the Emberpeaks.",
                        votePercent: 34,
                    },
                    {
                        id: "hunt-the-shadow-source",
                        title: "Track the Shadow Source Immediately",
                        description:
                            "Follow Thornik's strongest readings now and strike the corruption's nearest anchor before it can spawn another coordinated assault.",
                        risk: "Fastest offensive move, but leaves villages exposed if the attack fails or splits the team.",
                        votePercent: 28,
                    },
                    {
                        id: "find-first-concord-relic",
                        title: "Locate the First Concord Relic",
                        description:
                            "Use Caelin's flame-path and Serana's guidance to prioritize claiming a relic before confronting the broader threat.",
                        risk: "Builds long-term power for the Nine, but requires entering unknown ruins with limited intel and supplies.",
                        votePercent: 38,
                    },
                ],
            },
            {
                slug: "chapter-3-natures-messenger",
                chapterNumber: 3,
                title: "Nature's Messenger",
                label: "Chapter 3",
                shortDescription:
                    "The party enters the ancient forest where corruption has begun to twist the living world. Elowen, a druid bearing vine-ink tattoos, joins their cause as shadow-touched creatures close in.",
                opening:
                    "Beyond the Emberpeaks' foothills, the forest waits—changed. Trees bleed sap the wrong color, animals flee in the wrong direction, and something in the canopy watches with patience that predates the woods themselves.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: The Forest's Pain",
                        summary: "The party enters a corrupted forest where nature itself is suffering from the Concord's unraveling.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: Shadow at the Fire",
                        summary: "Darkness gathers as the group makes camp, and a new ally reveals herself from the wounded woods.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Descent into Shadow",
                        summary: "The corruption's source draws them deeper, and the cost of confronting it becomes terrifyingly clear.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-4-bonds-and-burdens",
                chapterNumber: 4,
                title: "Bonds and Burdens",
                label: "Chapter 4",
                shortDescription:
                    "The climb into the high peaks tests every alliance. Old wounds surface, the scale demands truth, and a corrupted ambush forces the group to fight as one—or fracture.",
                opening:
                    "They leave the last trees at dawn and enter the stone country where the air thins, the wind bites clean, and every burden—physical and otherwise—makes itself known with each step upward.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Morning Departure",
                        summary: "The party begins the mountain ascent, testing bonds forged in crisis.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: Nyxara at the Choke Point",
                        summary: "A mysterious figure blocks their path, and her presence raises more questions than answers.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Speak True or Speak Not at All",
                        summary: "The scale enforces honesty at the worst possible moment, and buried tensions erupt.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: The Day's Climb and the Corrupted",
                        summary: "Shadow-touched creatures attack on the exposed slopes, testing the group's coordination.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: The Hollow Road",
                        summary: "An ancient dwarven path offers shelter but carries its own dangers in the deep stone.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: The Long Night",
                        summary: "Watches are set, secrets are shared, and the mountain breathes around them as they rest.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-5-the-undervault",
                chapterNumber: 5,
                title: "The Undervault",
                label: "Chapter 5",
                shortDescription:
                    "Deep beneath the peaks, the party discovers the Undervault—a dwarven ruin where the Concord's ancient defenses still stir. Corruption runs thick, and the path forward demands sacrifice.",
                opening:
                    "The mountain smells of hot stone and a kiln that has just shut its mouth. Something moves in the dark below, and the instruments say it knows exactly where they are.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: The Corrupted",
                        summary: "Shadow-thralls ambush the party in the deep tunnels, forcing a desperate fight.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Vote",
                        summary: "A critical decision splits the group on whether to press deeper or retreat.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: The Chasm Choir",
                        summary: "Strange harmonics echo from the deep, and the ruins begin to wake around them.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: Deep Hall",
                        summary: "They reach the ancient Deep Hall, where dwarven architecture still holds against the dark.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: The Long Ascent",
                        summary: "The climb out tests endurance as corruption pursues them upward through crumbling passages.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: The Summit's Shadow",
                        summary: "They emerge to find the surface changed, and what waits at the summit reshapes their mission.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-6-stone-that-breathes",
                chapterNumber: 6,
                title: "Stone That Breathes",
                label: "Chapter 6",
                shortDescription:
                    "The Deep Hall becomes a temporary refuge where the group rests, tests boundaries, and prepares for what lies beyond. But the mountain breathes around them, and the silence is not empty.",
                opening:
                    "The Deep Hall receives them without ceremony. Then the scale of it arrives—pillars like old oaks, an obsidian floor that holds torchlight and gives it back doubled, and a hum below hearing that says this place was here long before them.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Holding Pattern",
                        summary: "The group settles into the Deep Hall, taking stock of wounds and resources.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: Testing the Edges",
                        summary: "They explore the Hall's passages and discover its ancient defenses still function.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Plans & Friction",
                        summary: "Strategy discussions reveal competing priorities and unresolved tensions.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: First Watch",
                        summary: "Night watches bring quiet revelations, and something in the deep presses against the wards.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: Second Watch",
                        summary: "The deeper hours bring unsettling encounters and hard truths spoken in darkness.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: Dawn",
                        summary: "Morning arrives with decisions made, and the group prepares to leave the Hall behind.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-7-the-fractured-sanctum",
                chapterNumber: 7,
                title: "The Fractured Sanctum",
                label: "Chapter 7",
                shortDescription:
                    "The party reaches the First Sanctum only to find it shattered and besieged. A gauntlet of ancient traps and corrupted guardians forces them into a desperate split, and the mountain itself begins to collapse.",
                opening:
                    "Dawn bleeds into the Deep Hall as the lichen shifts from bruise-blue to silver-green. With the light comes the low sound—felt first in teeth, then in boot-soles, then up through the ribs. The mountain is no longer waiting.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Surrounded",
                        summary: "The enemy has ringed the entrances, and the group must choose their ground.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Gauntlet",
                        summary: "A brutal running fight through collapsing corridors and reawakened traps.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: The Collapse",
                        summary: "The Sanctum fractures, splitting the party and sealing paths behind them.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: Below — The Forge Caldera",
                        summary: "Caelin and Nyxara descend into the volcanic heart where the first relic waits.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: Above — The Vent Shaft Route",
                        summary: "Serana, Vex, Thornik, and Durgan fight upward through crumbling shafts.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: Parallel Paths",
                        summary: "Both groups race toward survival as the mountain threatens to bury them all.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-8-down-from-the-peaks",
                chapterNumber: 8,
                title: "Down from the Peaks",
                label: "Chapter 8",
                shortDescription:
                    "Battered and changed, the survivors descend from the mountains toward Millbrook. The world below has not stood still—refugees crowd the gates, and the shadow's reach extends further than anyone feared.",
                opening:
                    "The ridge gives way to foothills, and foothills to the flatlands where Millbrook sits behind its old stone walls. They come down from the peaks carrying wounds, a relic, and the knowledge that what they've done is not enough.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: After the Ridge",
                        summary: "The party descends, taking stock of losses and what the mountain cost them.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The East Gate of Millbrook",
                        summary: "They reach civilization to find it strained to breaking under the weight of refugees.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Streets and Rooms",
                        summary: "Millbrook's politics, fear, and desperation become obstacles as dangerous as any monster.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: Fractures and Small Mercies",
                        summary: "Old alliances crack and new ones form in the pressure of the gathering crisis.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: Night Watch",
                        summary: "The town sleeps uneasily while shadows test its defenses.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: Morning Orders",
                        summary: "Dawn brings decisions that will shape the defense—or the retreat.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-9-the-siege",
                chapterNumber: 9,
                title: "The Siege",
                label: "Chapter 9",
                shortDescription:
                    "The shadow-host arrives at Millbrook's walls. What follows is a siege told in bells and blood, where every bearer is tested and the line between holding and breaking is measured in heartbeats.",
                opening:
                    "First bell rings before dawn. The walls of Millbrook have stood for two hundred years. Today they learn whether that is long enough.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: First Bell",
                        summary: "The siege begins as the shadow-host appears on the horizon.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: First Clash",
                        summary: "The first wave hits the walls, and the defenders discover what they're truly facing.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Second Bell",
                        summary: "The assault escalates as the enemy adapts and the walls begin to crack.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: Vale's Stand",
                        summary: "A critical section of the defense holds by the thinnest of margins.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: Turn and Break",
                        summary: "The tide turns—but the cost of victory may be too high to bear.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: Ashes",
                        summary: "The siege ends, and what remains must be counted, mourned, and rebuilt.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-10-partings",
                chapterNumber: 10,
                title: "Partings",
                label: "Chapter 10",
                shortDescription:
                    "The siege is over, but the group cannot stay whole. One by one, paths diverge as each bearer faces what the road ahead demands of them personally.",
                opening:
                    "Nyxara was already awake when the light arrived; warlocks don't court daylight -- they wait it out.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Nyxara",
                        summary: "The warlock takes stock of what the siege cost her, and makes her farewell.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Group Hears",
                        summary: "The remaining party learns who is leaving and what it means for the road ahead.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Thornik's Choice",
                        summary: "The dwarf faces the hardest decision: the road north, or the duty that calls him home.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: Serana's Road",
                        summary: "The paladin's path diverges, and her farewell carries the weight of things unsaid.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: The Mile-Stone",
                        summary: "At the crossroads, the final goodbyes are spoken and the smaller party forms.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: The Smaller Party",
                        summary: "Four walk north where nine once stood, and the silence has a different shape.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "chapter-11-road-to-the-plateau",
                chapterNumber: 11,
                title: "Road to the Plateau",
                label: "Chapter 11",
                shortDescription:
                    "With Millbrook behind them, the smaller party takes to the road. The landscape changes, bounty posters appear, and the creatures of the wild grow stranger with every mile toward the plateau.",
                opening:
                    "They slipped out at first light, when Millbrook's smoke was still thin and blue and the streets were quiet except for scavenging crows.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Leaving Walls",
                        summary: "The party departs Millbrook into post-siege country, carrying new weight and fewer numbers.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: Post-Siege Country",
                        summary: "The road shows the marks of what passed through, and a bounty poster changes the stakes.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: The Hedge and the Hounds",
                        summary: "Shadow-creatures hunt them across open country, forcing a running fight.",
                        isPublished: true,
                    },
                    {
                        id: "act-4",
                        title: "Act IV: The Charcoal Clamp",
                        summary: "A ruined charcoal-burner's camp offers shelter and an unexpected encounter.",
                        isPublished: true,
                    },
                    {
                        id: "act-5",
                        title: "Act V: The Waystone",
                        summary: "An ancient waystone marks the boundary between the known world and what lies beyond.",
                        isPublished: true,
                    },
                    {
                        id: "act-6",
                        title: "Act VI: The Aurora",
                        summary: "The sky changes as they approach the plateau, and what waits ahead becomes visible at last.",
                        isPublished: true,
                    },
                ],
            },
            {
                slug: "epilogue",
                chapterNumber: 12,
                title: "Epilogue",
                label: "Epilogue",
                shortDescription:
                    "Three threads remain after the dust settles: a survivor in the dark, the deep things stirring beneath Depthspire, and a road north where the counting continues. Book Two begins at the gate.",
                opening:
                    "The slab fell. What came after was dark and cold and the kind of silence that exists deep inside stone.",
                status: "published",
                sections: [
                    {
                        id: "act-1",
                        title: "Part I: The Fall",
                        summary: "A survivor wakes in the dark beneath the mountain, broken but alive.",
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Part II: The Deep Stirs",
                        summary: "Below Depthspire, the ancient wards are failing, and what they contain grows restless.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Part III: The Road North",
                        summary: "The party walks toward the plateau. The scale pulls north. The counting continues.",
                        isPublished: true,
                    },
                ],
            },
        ],
    },
    "love-paris": {
        id: "love-paris",
        title: "Love in Paris",
        genre: "Romance",
        genreEmoji: "💕",
        heroImage: "/images/stories/love-paris/chapter-1/establishing.png",
        status: "voting",
        votes: 15432,
        synopsis:
            "Juliet Moreau has spent the last three years painting in the wrong city. She takes a fellowship in Paris meaning to prove something—to herself, mostly—and spends her first evening getting caught in the rain and ducking into a bookshop on the Rue de Bièvre. She reaches for the only copy of a dog-eared Rimbaud collection on the shelf. So does someone else. What happens next is not a love story yet. It is, at first, just an argument about a book. But arguments in small bookshops in the rain have a way of becoming more than they intend to be.",
        hook: "A rainy bookshop, one last copy, two hands reaching at the same moment—and neither willing to let go first.",
        coverGradient: "from-pink-500 to-rose-600",
        accentTextClass: "text-pink-300",
        ringClass: "ring-pink-400",
        characters: [
            {
                name: "Juliet Moreau",
                role: "Artist on Fellowship",
                emoji: "🎨",
                gradient: "from-pink-500 to-rose-600",
                bio: "Juliet is twenty-eight, half-French by inheritance and entirely American by upbringing, which means she speaks the language well enough to argue in it and badly enough to lose. She paints large, difficult canvases that critics call 'promising' and she calls 'not finished yet.' The Paris fellowship is her third attempt at a new start and she is trying, this time, not to need it to save her.",
                image: "/images/characters/juliet.png",
            },
            {
                name: "Étienne Marchetti",
                role: "Architect with a Secret",
                emoji: "📐",
                gradient: "from-slate-600 to-blue-700",
                bio: "Étienne restores old buildings for a living and collects first editions as a hobby he treats more seriously than the living. He is careful, precise, and slightly infuriating in conversation—the kind of man who knows exactly what he thinks but takes his time saying it, which Juliet immediately finds either appealing or maddening depending on the hour.",
            },
            {
                name: "Céline Dufour",
                role: "Juliet's Best Friend",
                emoji: "☕",
                gradient: "from-amber-500 to-orange-600",
                bio: "Céline has lived in Paris her whole life and has the particular Parisian gift of making everything look effortless, including friendship. She invited Juliet for the fellowship, is aggressively on her side, and has already decided Étienne is interesting based entirely on secondhand information and instinct.",
            },
            {
                name: "Henri Beaumont",
                role: "The Bookseller",
                emoji: "📚",
                gradient: "from-stone-500 to-amber-700",
                bio: "Henri has run Librairie du Pont for thirty-one years. He has watched a great many people fall in love in his shop, which he considers a secondary service he provides at no extra charge. He does not intervene in these matters. He does, occasionally, offer tea.",
            },
        ],
        chapters: [
            {
                slug: "chapter-1-the-first-page",
                chapterNumber: 1,
                title: "The First Page",
                label: "Chapter 1",
                shortDescription:
                    "Juliet's first evening in Paris ends in a small bookshop in the rain, a disputed Rimbaud collection, and a conversation that runs thirty minutes longer than either person intends.",
                opening:
                    "She had been in Paris for six hours when the rain started, and in the bookshop for ten minutes when she reached for the book at the exact same moment he did.",
                status: "voting",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: The Bookshop",
                        imageSrc: "/images/stories/love-paris/chapter-1/act-1-bookshop.jpg",
                        imageCaption: "Librairie du Pont, Rue de Bièvre",
                        imageRevealAfterParagraph: 7,
                        summary: `She had been in Paris for six hours when the rain started.
Juliet had managed the flight, the Métro, the apartment key that stuck on the third floor landing, and the realization that the fellowship stipend would cover food or art supplies but not both if she wasn't careful. She had not managed the rain. It came down in that particular Parisian way—not dramatic, just continuous, the city settling into wet the way it settles into everything: thoroughly, without apology, as though it had always been this way and expected you to adjust.
She ducked into the first doorway she found.
The sign above read Librairie du Pont in faded gilt letters. The bell above the door made a sound like something considering whether to bother. Inside, the shop smelled of old paper and lamp oil and something that might have been coffee, and it was the kind of narrow that only worked because everything had been arranged by someone who understood that the point of a bookshop is not to be convenient but to be inescapable.
Juliet stood in the doorway dripping onto the mat and thought: yes, fine, this will do.
She wandered deeper. The shop had no discernible system—poetry shelved beside cartography, two shelves of medical texts backing up against what appeared to be an entire wall of travel writing organized by the emotional state the author was in when they wrote it, judging from the handwritten labels. There was a cat asleep on a stack of atlases. There was a small man at the back behind a glass case who didn't look up.
Juliet had not come in looking for anything specific. She had come in because of the rain.
And then she saw the Rimbaud.
It was on the third shelf from the top of a section labeled, in the same handwriting, POETRY: THE USEFUL KIND. Une Saison en Enfer, a 1960 Gallimard edition with a cover she recognized from a photograph in her mother's apartment, which meant it was the translation her mother had quoted at her throughout her entire childhood, which meant it was in some deeply irrational way the only copy of this book that mattered.
Juliet reached for it.
Her hand met another hand already on the spine.
She looked up.
The man was tall, dark-haired, somewhere in his mid-thirties, and wearing the expression of someone who had been certain, until this exact moment, that they were the only person in the world interested in this particular book in this particular edition.
"Pardon," he said, not moving his hand.
"It's fine," Juliet said, also not moving her hand.
They looked at each other. The rain continued outside. The cat on the atlases shifted and went back to sleep.
"I was here first," he said, in French, with a calm certainty that suggested he was used to being right about things.
"Your hand was here first," Juliet said, in French that was definitely better than it had been in college, "but I saw it first. From across the room. I was walking toward it."
A slight pause. "That is not how ownership works."
"It's not about ownership. It's about intent."
Something shifted in his expression—not quite amusement, but adjacent to it. "Intent."
"I intended to buy this book when I was seven years old," Juliet said, which was true in a roundabout way she didn't particularly want to explain. "I'm finally in Paris. It's the only copy. Intent counts."
"I have been looking for this edition for four years," he said. His French was Parisian—clean and slightly cool, the French of someone who did not have to try at it. "I come to this shop every month. I check this shelf specifically."
"Then you've had four years and three hundred and sixty-five opportunities and you didn't buy it any of those times. That's on you."
He looked at her for a long moment. The small man at the back had still not looked up, but something about the angle of his head suggested he was listening.
"You're American," the man said.
"Half-French," Juliet said, which was true and also slightly defensive and she knew it was slightly defensive and said it anyway.
"But you grew up in America."
"What does that have to do with Rimbaud?"
"Nothing," he said. "I was making an observation." He hadn't moved his hand. Neither had she. The spine of the book was between their fingers like a small contested border. "You have a fellowship."
Juliet blinked. "How do you know that?"
"The bag." A slight gesture at her tote, which had the fellowship's logo on it because she had been too tired this morning to use any of her other bags. "I know the program. They place artists in the sixth arrondissement. The apartment above the bakery on Rue Mouffetard, or the one on—"
"Rue Mouffetard," she said.
"The key sticks on the third floor."
"You live there?"
"Two years ago. Different apartment." He finally—finally—looked away from her to look at the book. "The copy you want is a first printing, 1873. It has water damage on the last sixteen pages. There is a second copy of the 1960 Gallimard on the shelf above the cartography section, which is where it got misshelved six months ago and Henri never moved it back because he believes books find their own homes."
Juliet stared at him.
He looked at her with an expression that was not quite a smile but was doing its best.
"You're serious," she said.
"I showed Henri the water damage last November. He discounted it forty percent."
She let go of the spine. He did too, at exactly the same moment, which meant neither of them had actually bought it in the end.
"The one above cartography," she said.
"Turn left at the atlases, up three shelves."
She found it. 1960 Gallimard, same cover, no water damage. She brought it back to the front, where the small man—Henri, apparently—rang it up without having apparently moved at all. The man with the contested Rimbaud was still standing at the shelf when she passed.
"Thank you," she said.
"De rien," he said, which is French for 'it's nothing' and is often French for the opposite.
She pushed out into the rain, which had gentled slightly, and stood on the pavement holding her book in both hands. She had been in Paris for six hours and forty minutes. She had a fellowship, a key that stuck, and a copy of the most important book of her mother's youth.
She had also, without entirely meaning to, left her umbrella inside.
She went back in to get it.
Henri pointed at the poetry section without looking up. The man was still there. He turned when she came back in.
"I forgot my umbrella," Juliet said.
"It's on the shelf between Baudelaire and Prévert," he said. "It seemed at home there."
She retrieved it. She stood there for a moment holding both the book and the umbrella and listening to the rain.
"I'm Juliet," she said.
"Étienne," he said.
"Is the coffee still on?" She was not entirely sure why she said it. "The shop smells like coffee."
Henri, from the back: "There is always coffee."
Étienne's expression did something complicated and then settled into something simpler. "There is a table in the back," he said. "Henri charges for the coffee but not for the chair."`,
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Long Way Home",
                        imageSrc: "/images/stories/love-paris/chapter-1/act-2-walk-seine.jpg",
                        imageCaption: "Along the Seine after the rain",
                        imageRevealAfterParagraph: 5,
                        summary: "The coffee was terrible and perfect in the way coffee becomes when conversation makes quality irrelevant. Henri placed two chipped cups on a small wooden table at the back and left them there without commentary, which both Juliet and Étienne understood as a form of blessing.\nFor the first twenty minutes they talked about books as a shield. Editions, translations, who had misread whom and for how long. Étienne was precise and occasionally smug, Juliet was quick and occasionally reckless, and somewhere between the second disagreement and the third laugh they stopped speaking like strangers trying not to admit they were interested.\nHe told her he restored facades and stairwells in old buildings no one noticed until they started to fail. She told him she painted large canvases no one noticed unless they were already looking for disappointment or promise. He asked to see her work with an earnestness so direct it almost felt rude. She answered by describing a series she had abandoned in New York because each painting had looked like an apology she did not owe anyone.\nOutside, rain thinned to mist. Inside, Henri pretended to inventory postcards while listening badly from twelve feet away. Twice he interrupted only to correct a date and once to announce that anyone discussing Rimbaud this loudly should pay for a second cup.\nWhen they finally stood to leave, it was fully dark and the street reflected every lamp like a second city turned upside down. Étienne offered to walk her back to Rue Mouffetard. Juliet nearly said no out of habit, then heard herself say yes before habit could win.\nThey walked the long way without naming that it was the long way. Along the Seine first, then through narrower streets where restaurant windows breathed light onto wet cobblestone. They did not touch. They kept a careful distance that felt deliberate enough to count as another kind of contact.\nAt the corner by her bakery, they stopped beneath an awning dripping rhythmically into a gutter. Étienne put his hands in his coat pockets as if to make sure they stayed there. Juliet held her umbrella closed because opening it would have meant ending the moment.\n\"I am in this neighborhood most Thursdays,\" he said.\n\"That sounds almost like scheduling,\" she answered.\n\"It sounds like architecture,\" he said, and she laughed.\nThe key did stick on the third floor, exactly where he said it would. By the time Juliet got inside she was smiling for reasons she refused to audit. She set the Gallimard copy on the table, changed into dry clothes, and found that the city no longer felt like a test she had to pass. It felt, briefly, like a conversation already in progress.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: What the City Costs",
                        imageSrc: "/images/stories/love-paris/chapter-1/act-3-city-night.jpg",
                        imageCaption: "Paris at night, first week",
                        imageRevealAfterParagraph: 6,
                        summary: "Morning turned tenderness into logistics. The fellowship orientation was less orientation than administrative gauntlet - signatures, badge photos, studio rules written by people who had never painted at midnight. Juliet smiled through all of it and thought about coffee she had not expected to matter.\nBy afternoon she stood in her assigned studio, a high-ceilinged room with one cracked skylight and a wall that had been painted over so many times it looked like a sediment record of indecision. She unpacked brushes, stretched linen, and waited for inspiration that did not arrive on command. What did arrive was rent math, currency conversion, and the message from her New York gallery asking whether she was \"finding her voice in Europe yet.\"\nShe wasn't. Not yet. She was finding transit lines and grocery prices and the precise emotional temperature of a city that could feel romantic and indifferent in the same block.\nThat evening Céline came by with wine, opinions, and exactly the amount of mockery required to keep Juliet honest. She listened to the entire bookshop story without interrupting once, which was suspicious in itself. \"So,\" she said finally, \"are we calling this chance, fate, or weaponized French literature?\"\n\"A conversation,\" Juliet said.\n\"Good. Then keep having it.\"\nLater, alone, Juliet opened the Gallimard on the kitchen table. Rain had returned in soft intervals against the window. She found herself writing a phone number on a scrap of receipt paper, then crossing it out, then writing it again on cleaner paper. Ridiculous, she thought. Also possible.\nAcross the city, in an apartment above a restoration site, Étienne sat with the water-damaged 1873 copy and read the last warped pages by desk lamp. He paused twice to stare at the margin where someone had penciled a note decades ago in a hand he did not recognize: recommencer autrement. Begin again, differently.\nBy midnight neither of them had decided what to do next, only that they wanted next to exist. And in Paris, that was often how stories began - not with certainty, but with willingness.",
                        isPublished: true,
                    },
                ],
                voteQuestion: "The coffee lasts two hours. How does Juliet leave things with Étienne?",
                votePrompt:
                    "This vote shapes Juliet's approach going into Chapter 2 and how Étienne interprets her interest. Choose the ending beat that feels right.",
                voteOptions: [
                    {
                        id: "exchange-numbers",
                        title: "She gives him her number",
                        description:
                            "Before Juliet leaves the bookshop, she writes her number on the inside cover of the Gallimard edition and slides it across the table. Bold, a little absurd, exactly the kind of thing she normally talks herself out of.",
                        risk: "If he doesn't call, she has to live with having tried. If he does, she has to figure out what she meant by it.",
                        votePercent: 44,
                    },
                    {
                        id: "just-goodbye",
                        title: "She says goodbye and nothing else",
                        description:
                            "Juliet finishes her coffee, thanks Henri, and walks out into the cleared evening without leaving a way to continue. What happens next is up to chance—or the small size of a city neighborhood.",
                        risk: "Paris is smaller than it looks. But smaller doesn't mean inevitable.",
                        votePercent: 22,
                    },
                    {
                        id: "ask-the-book",
                        title: "She asks to see the damaged copy",
                        description:
                            "On her way out, Juliet asks Étienne what he's going to do with the water-damaged Rimbaud now. It's an excuse to keep talking, and they both know it. Whether that matters is the next question.",
                        risk: "The conversation continues, which means the complication continues—but so does the possibility.",
                        votePercent: 34,
                    },
                ],
            },
        ],
    },
    "showdown-sunset": {
        id: "showdown-sunset",
        title: "Showdown at Sunset",
        genre: "Western",
        genreEmoji: "🤠",
        heroImage: "/images/stories/showdown-sunset/chapter-1/establishing.png",
        status: "voting",
        votes: 6543,
        synopsis:
            "Sheriff Jake Morgan has kept Red Mesa quiet for three years by being the kind of man trouble doesn't look for twice. That changes on a Tuesday in October when Deputy Rosa Vega rides in hard with word that the Holloway gang—eleven riders, two of them wanted in three territories—cleared out of Tucson and are heading north. Estimated arrival: sunset. Jake has most of a day, a two-man department, and a town that has been quiet long enough to forget what the alternative looks like. What he decides in the next eight hours will define what kind of lawman he is and what kind of town Red Mesa wants to be.",
        hook: "The Holloway gang burned the last town they visited. Eleven riders, one sheriff, and eight hours to decide whether Red Mesa fights or folds.",
        coverGradient: "from-amber-500 to-red-600",
        accentTextClass: "text-amber-300",
        ringClass: "ring-amber-400",
        characters: [
            {
                name: "Sheriff Jake \"Iron\" Morgan",
                role: "Town Sheriff",
                emoji: "⭐",
                gradient: "from-amber-600 to-orange-700",
                bio: "Jake earned the 'Iron' twenty years ago in a story he never tells to the same way twice, which suggests either the truth is worse than any version or better than all of them. He is fifty-one, still fast, and tired in the way a man gets tired when he's been right about things for long enough that he stopped enjoying it. He came to Red Mesa to wind down. The town, apparently, didn't get that message.",
                image: "/images/characters/jake.png",
            },
            {
                name: "Deputy Rosa Vega",
                role: "Deputy Sheriff",
                emoji: "🔫",
                gradient: "from-rose-600 to-red-700",
                bio: "Rosa is twenty-six and has been deputy for eighteen months, which is long enough to know that Jake's instincts are good and short enough to still argue about why. She's the faster rider, the better shot at distance, and the one who went to Tucson to verify the rumor when Jake said it was probably nothing. She was right. He was wrong. She has not made a large production of this.",
            },
            {
                name: "Eli Bransen",
                role: "Barkeep and Sometime Informant",
                emoji: "🍺",
                gradient: "from-stone-500 to-amber-700",
                bio: "Eli has been running the Long Rail saloon for eleven years and has a practiced gift for knowing things without being asked and saying them without being pushed. He served the Holloway gang once, in a different town, in a different life. He doesn't talk about that. He does, occasionally, talk around it.",
            },
            {
                name: "Old Man Holloway",
                role: "Gang Patriarch",
                emoji: "💀",
                gradient: "from-gray-600 to-slate-700",
                bio: "Cornelius Holloway is sixty-three and runs his outfit the way he runs everything—with the patient certainty of a man who has outlived everyone who ever tried to stop him. He is not, technically, the most dangerous member of his own gang. He is, however, the one who decides when to leave and what to leave behind.",
            },
        ],
        chapters: [
            {
                slug: "chapter-1-last-light",
                chapterNumber: 1,
                title: "Last Light in Red Mesa",
                label: "Chapter 1",
                shortDescription:
                    "Deputy Vega rides in from Tucson with verified intelligence: the Holloway gang is moving north. Jake has until sunset to decide how Red Mesa responds.",
                opening:
                    "Deputy Rosa Vega rode into Red Mesa at half past nine in the morning, and the way she came in—straight hard, no slowing through the edge of town—told Jake before she even pulled up that whatever she'd found in Tucson wasn't rumors anymore.",
                status: "voting",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Word Reaches Town",
                        imageSrc: "/images/stories/showdown-sunset/chapter-1/act-1-word-arrives.jpg",
                        imageCaption: "Deputy Vega rides hard into Red Mesa",
                        imageRevealAfterParagraph: 8,
                        summary: `Deputy Rosa Vega rode into Red Mesa at half past nine in the morning, and the way she came in told Jake everything before she'd said a word.
She didn't slow through the edge of town. Didn't tip her hat to Greta Malone sweeping her steps or nod to the Miller boys chasing a dog down the south side of Main. She came in straight and fast, dust rising behind her in a long pale curtain, and pulled up in front of the office so the horse was still heaving when she dropped from the saddle.
Jake set down his coffee.
"It's true," Rosa said. She was dusty from two days of riding and her voice had the flat particular quality of someone who had been hoping she was wrong the whole way home. "Eleven riders. Left Tucson Wednesday morning, heading north. Marshal Hennesey verified three of them himself—Cole Holloway, Decker Raines, a man they're calling Priest. Two outstanding warrants in the Arizona Territory. One in New Mexico."
"Old Man Holloway with them?"
"At the front. Hennesey said he looks good for sixty-three." She pulled the saddle off her horse without being asked and hauled it over the rail. "Estimated speed, they're looking at Red Mesa by sundown. Give or take an hour for stops." She met his eyes. "Jake. They burned Cartero."
He'd heard the rumor about Cartero. He'd sent her to find out if the rumor was the whole story.
"How bad?" he said.
"Two buildings left standing. The church and the livery." She was quiet for a moment. "Marshal didn't say why. I didn't ask." She pushed the office door open and went inside and Jake followed.
The office was small and orderly in the way Jake had always kept it—wanted posters filed and current, the rifle rack locked and full, the desk clear except for the logbook and the coffee he'd been drinking since six. Rosa sat down in the chair across from the desk and looked at the ceiling for a moment.
"What do we have?" she said.
"Two of us," Jake said.
"I mean in terms of—"
"I know what you mean." He sat down. Outside, through the window, Main Street was doing what Main Street did on a Tuesday morning: Alderman's was getting a flour delivery, the schoolbell had just rung, three horses stood at the Long Rail's rail even though Eli wouldn't be open for another hour. Normal. The way things had been normal for three years, which was long enough that most of the town had started to believe that was just how things were.
They weren't going to believe that by this evening.
"We have Hendricks," Jake said. "He's reliable if we tell him what to do." Sam Hendricks was sixty-four and had been a sheriff himself, years back, in a place that wasn't anymore. "Possibly the Garza brothers, if we ask, but they've got young children and I won't press men with young children."
"Eli knows them," Rosa said. She'd said it carefully. "The Holloways."
"Old history."
"Old history with eleven armed riders is still history." She leaned forward. "He might know what they want. If they have a specific reason for Red Mesa, or if it's—" She didn't finish the sentence. They both knew what the alternative was.
Jake looked out the window again. The flour delivery was done. Main Street was settling into its usual morning rhythm. In seven or eight hours, that was going to change.
"I need to think," he said.
"You've got about thirty minutes before people start noticing I rode in fast," Rosa said. "After that the whole town knows something's coming and we're managing a panic instead of a plan."
She was right. She usually was, about the practical things.
"Pull the shutters at the bank and wire Hennesey that we've received his information," Jake said, because those were the two things that needed doing regardless. "Then get Hendricks and tell him to stay close to the office. Low noise. We don't want the street clearing out before we've decided anything."
Rosa was already moving. She paused at the door. "What are we deciding?"
Jake looked at the street one more time. The schoolbell had stopped. Somewhere a dog was barking at something it probably couldn't catch.
"What kind of morning this town gets to remember," he said.`,
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: What the Town Knows",
                        imageSrc: "/images/stories/showdown-sunset/chapter-1/act-2-long-rail.jpg",
                        imageCaption: "The Long Rail saloon, mid-morning",
                        imageRevealAfterParagraph: 5,
                        summary: "By eleven, secrecy was no longer an option. Rumor travels in frontier towns the way fire travels in dry grass - low, quick, and always ahead of the person carrying the bucket. Jake chose the Long Rail as the place to steer it, because if people were going to panic he'd rather they do it where he could see their hands.\nEli Bransen polished the same glass for five full minutes while Jake explained what Rosa had confirmed. No speeches, no drama, just numbers: eleven riders, sunset arrival, Holloway at the front. The room went still in that particular way men go still when they start calculating distance to the nearest door.\n\"You know them,\" Jake said quietly to Eli once the first wave of questions had broken into side conversations.\nEli nodded once. \"I know how they arrive. Clean first, mean second. If they ask for a thing, it's because they think it already belongs to them.\"\n\"Do they want this town?\" Rosa asked.\n\"Maybe not the whole town,\" Eli said. \"Could be a person. Could be a ledger. Could be revenge with a familiar address. Holloway likes making examples where people can witness the lesson.\"\nBy noon, Red Mesa had split into three camps without naming them: those who wanted to run, those who wanted to fight, and those who wanted Jake to decide so they could blame him later if it failed. Jake accepted all three positions as normal civic behavior under stress.\nHe and Rosa moved street by street assigning practical tasks with military calm - water barrels filled and staged, shutters reinforced on the west side, schoolhouse emptied into church cellar, medical kits moved to the undertaker's back room where the light was good and the floor could be cleaned. Hendricks took roster and ammunition count.\nAt one-thirty, the telegraph from Hennesey came through in clipped code: HOLLOWAY SPLIT COLUMN NEAR DRY CREEK POSSIBLE FLANK RIDERS. Jake read it twice and folded it once. \"So we may be looking at eleven in front and whoever they're hiding behind a ridge,\" he said.\nRosa's jaw tightened. \"Still time to send families east.\"\n\"Do it,\" Jake said. \"And tell them to travel light and quiet. Dust clouds advertise.\"\nBy mid-afternoon, the town had the strained order of a stage set before curtain. People moved quickly but avoided looking west for too long. Every clock seemed louder than usual. Every horse in every hitch rail shifted as if feeling weather the humans could not yet read.\nIn his office Jake laid out three plans and hated all of them for different reasons. Each one saved someone and exposed someone else. Each one assumed courage would hold under first gunfire. Outside, the sun kept falling exactly on schedule.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: Before the Dust Rises",
                        imageSrc: "/images/stories/showdown-sunset/chapter-1/act-3-before-sunset.jpg",
                        imageCaption: "Red Mesa in the hours before the gang arrives",
                        imageRevealAfterParagraph: 6,
                        summary: "At four o'clock the wind turned and brought dust from the south road. Not riders yet. Just warning. Jake stood on the boardwalk outside the sheriff's office with Rosa and watched the horizon flatten under heat shimmer while the town pretended to continue being ordinary.\nChurch bells rang once to signal evacuation teams moving out. Children who had never been this quiet climbed into wagons with blankets and bread sacks. Mothers held composure like a physical object they could not afford to drop. Old men who had sworn they were too stiff to shoot found oil for old rifles anyway.\nJake walked Main one final time before commitment. Bank roofline - usable but exposed. Livery loft - excellent sightline, poor cover. Saloon balcony - best angle on the south approach, worst place if fire started. He marked positions in his head and refused to imagine names attached to each position.\nAt five-ten, Eli met him by the trough and handed over a folded paper torn from a liquor invoice. \"Memory came late,\" Eli said. \"Holloway's boy Cole used to ask about the old payroll route from railhead to assay office. Used to ask too many questions for a drunk.\"\nJake read the route note and looked at the bank. Then at the assay office. Then at the narrow cut between both where one rider could block two exits. \"So this might be robbery with theatrics.\"\n\"With Holloway it's always both,\" Eli answered.\nAt six, a scout posted on the south rise signaled with mirror flash. Two long, one short. Column sighted. Rosa repeated the signal with her hand because everyone in town deserved to see certainty, however unwelcome.\nThey had maybe forty minutes. Enough time to choose a strategy and no time left for regret. Jake gathered Rosa, Hendricks, and the six volunteers who had not backed out when names were asked for. He gave orders in a voice so even it made panic sound like logistics.\n\"Once we start this,\" he said, \"we do not improvise heroics. We do the job in front of us. If you lose your position, you fall back to church line. If I go down, Rosa commands. If she goes down, Hendricks commands. Town first, pride never.\"\nNo one argued.\nWhen the first rider finally appeared at the edge of the south road, silhouetted by low sun and trailing red dust, Red Mesa held its breath as one body. Behind him more shapes emerged, then more, then the full line of the Holloway gang unspooling toward town like a storm deciding where to break. Jake rested his hand on his holster and made the only decision left: how this night would begin.",
                        isPublished: true,
                    },
                ],
                voteQuestion: "How does Jake prepare Red Mesa for the Holloway gang's arrival?",
                votePrompt:
                    "Your vote determines the strategy that carries into Chapter 2 and shapes which characters take the front line when the dust comes.",
                voteOptions: [
                    {
                        id: "arm-the-town",
                        title: "Call a posse — arm the townspeople",
                        description:
                            "Jake calls an open meeting and asks for volunteers. Red Mesa defends itself as a community. Whoever stands up stands with the law.",
                        risk: "Civilians in gunfights are unpredictable. If Holloway sees a mob, he may burn the town first and ask questions never.",
                        votePercent: 38,
                    },
                    {
                        id: "ride-out-alone",
                        title: "Ride out to meet them before they reach town",
                        description:
                            "Jake takes Rosa and rides south to intercept the gang on the trail. Whatever happens, it happens away from Main Street and the people on it.",
                        risk: "Two lawmen against eleven riders in open country. No cover, no backup, no second chance if it goes wrong.",
                        votePercent: 29,
                    },
                    {
                        id: "set-the-trap",
                        title: "Prepare a trap and let them come to you",
                        description:
                            "Use the hours to position people in the buildings overlooking Main Street. Let Holloway ride into a town that looks quiet from the outside and isn't.",
                        risk: "Requires Holloway to ride in rather than burn from outside—and requires every person holding a position to hold it.",
                        votePercent: 33,
                    },
                ],
            },
        ],
    },
    "mars-colony": {
        id: "mars-colony",
        title: "Mars Colony Crisis",
        genre: "Sci-Fi",
        genreEmoji: "🚀",
        heroImage: "/images/stories/mars-colony/chapter-1/establishing.png",
        status: "voting",
        votes: 8234,
        synopsis:
            "Artemis Base has been operational for eleven years, which is long enough to feel permanent and not quite long enough to stop being surprising. Commander Aria Chen runs the colony with the particular efficiency of someone who has learned which problems need solving immediately and which need watching. At 0300 on a Tuesday, the Elysium drill team strikes something four hundred meters beneath the Martian surface that is not rock. Dr. Zhao's seismic array registers a pattern—structured, repeating, and entirely inconsistent with anything geological. The colony's communication systems have logged an anomaly at the same frequency every twenty-seven hours for the past six days. Nobody noticed until now. This is about to become Aria's problem in the oldest possible way: all at once.",
        hook: "Four hundred meters beneath the Martian surface, something is transmitting on a frequency that predates human radio. It has been doing this for six days.",
        coverGradient: "from-blue-500 to-cyan-600",
        accentTextClass: "text-cyan-300",
        ringClass: "ring-cyan-400",
        characters: [
            {
                name: "Commander Aria Chen",
                role: "Colony Commander",
                emoji: "⭐",
                gradient: "from-blue-500 to-cyan-600",
                bio: "Aria runs Artemis Base the way she runs everything: on the principle that most problems have a rational solution and the ones that don't are still better approached as if they do. She has been in command for four years, has managed a structural breach, two medical emergencies, and one very bad dust storm, and has never once in that time received a signal that didn't originate on Earth. She is about to revise that record.",
                image: "/images/characters/aria.png",
            },
            {
                name: "Dr. Rael Okonkwo",
                role: "Communications Specialist",
                emoji: "📡",
                gradient: "from-violet-600 to-indigo-700",
                bio: "Rael is the reason the colony's communication array works as well as it does, which he considers a mixed blessing given that he now has to figure out what it's receiving. He has the particular intensity of someone who has been waiting for something interesting to happen and is alarmed to discover how interesting it has gotten.",
            },
            {
                name: "Chief Martinez",
                role: "Security Chief",
                emoji: "🛡️",
                gradient: "from-red-600 to-orange-700",
                bio: "Martinez has spent nine years on Mars being prepared for problems that never arrived, which has either kept him sharp or made him paranoid—he considers both assessments fair. He has opinions about what should happen next and will not volunteer them unless asked, and possibly not then.",
            },
            {
                name: "Dr. Lian Zhao",
                role: "Geologist",
                emoji: "🪨",
                gradient: "from-stone-500 to-amber-700",
                bio: "Lian has been studying the Elysium stratum for three years and knows the Martian substrate the way she knows her own apartment: intimately, with a few surprises that turned out to be explainable and one that hasn't been yet. The drill returning a non-geological contact is, by her reckoning, either the most important discovery in human history or a calibration error. She is fairly certain it is not a calibration error.",
            },
        ],
        chapters: [
            {
                slug: "chapter-1-signal-from-the-deep",
                chapterNumber: 1,
                title: "Signal from the Deep",
                label: "Chapter 1",
                shortDescription:
                    "At 0300, the Elysium drill team strikes something that isn't rock. Dr. Zhao's seismic array logs a repeating structured pattern. Commander Chen is called to the drill pit and has until dawn to decide how the colony responds.",
                opening:
                    "The call came at 0300, which Aria Chen had always privately believed was the universe's preferred hour for everything that couldn't wait.",
                status: "voting",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: Contact",
                        imageSrc: "/images/stories/mars-colony/chapter-1/act-1-contact.jpg",
                        imageCaption: "The Elysium drill array at 0300",
                        imageRevealAfterParagraph: 7,
                        summary: `The call came at 0300, which Aria Chen had always privately believed was the universe's preferred hour for everything that couldn't wait.
"Commander." Dr. Zhao's voice in her ear was the precise tone of someone who was being very careful not to sound alarmed, which meant she was alarmed. "I need you at the drill array. Suit up. Don't call Martinez yet."
Aria was already out of her bunk. "What did you hit?"
"That's the thing." A pause. "We don't know."
The walk to the drilling array was seven minutes in a pressurized suit through the connector tunnel between Habitat 3 and the surface access bay. Aria had done it a hundred times for maintenance reviews, geological surveys, one equipment fire and one equipment fire drill that had been more stressful than the actual fire. She knew every scuff mark on the tunnel walls. She paid attention to them now the way she paid attention to all familiar things when something unfamiliar was happening—using the ordinary as an anchor.
The drill array occupied a pressurized bay on the colony's eastern edge, a squat hexagonal structure that housed the Elysium Depth Survey's primary bore and about four million dollars of seismic monitoring equipment that could, theoretically, hear a fault shift three hundred kilometers away. In practice it had spent most of three years confirming that the Elysium Plateau was geologically stable, which was useful for structural planning and not very exciting.
Dr. Zhao was standing at the primary readout station with the expression of a woman who had just been proven right about something she hadn't expected to be right about.
"We were running the standard overnight extension," she said without preamble. "Four hundred and twelve meters. Rotary bit, standard basalt progression. At approximately 0247, the bit stopped." She pulled up the drill log on the display wall. "Not resistance. Not density shift. Stopped. As if it hit something that didn't want to move."
Aria looked at the readout. The drill torque had spiked, maxed, and held for six seconds before the safety cutoff triggered. "Could be a metallic intrusion. Subsurface iron deposit—"
"Yes. Except." Zhao pulled up a second display—the seismic array's frequency analysis, which Aria had seen in normal operation a dozen times and which now looked like nothing she recognized. "The moment the bit stopped, the array registered a response." Zhao traced the wave pattern on the display with one finger. "Structured. Repeating. Not mechanical resonance from the drill—we cross-checked against every operational frequency the rig generates. This has a different source."
Aria looked at the pattern for a long moment. It ran in a series—short, long, short-short, long-long—that kept repeating with slight variations, like something cycling through states.
"How long does the cycle take?" she asked.
"Forty-one seconds. Then it repeats." Zhao hesitated. "Aria—Rael flagged something to me thirty minutes ago that I want you to see before we talk about what this is."
She pulled up the communications array logs—the passive monitoring system that tracked all incoming radio frequencies as a matter of standard procedure. Aria had looked at these logs exactly once, three years ago, during a communications audit.
There was a flag.
Not today. Not from the drill.
Six days ago.
"The comm array has been receiving a signal at this frequency," Zhao said, "every twenty-seven hours, at thirty-second intervals, for the past six days. Since before we started the current drill phase." She let that sit for a moment. "The monitoring software categorized it as background cosmic radiation within normal parameters. It ran the auto-classification and filed it. Nobody looked at it because nobody had a reason to look at it."
Aria looked at the frequency comparison. The signal from six days ago and the response from the drill array were not identical—but they were the same structure. The same pattern.
"Something under the surface received what the comm array was receiving," Aria said slowly.
"And replied," Zhao said. "Yes."
The drill bay was very quiet. Outside, through the reinforced window, she could see the Martian night—stars in a black sky without any of the atmospheric warmth that made Earth's night sky feel like a ceiling rather than a void. She had never found it lonely before. She was recalibrating.
"Who else knows?" she said.
"You, me, Rael. The two drill techs on shift, but I sent them to take a break in the canteen and logged it as a routine equipment hold." Zhao's expression was steady but her hands were clasped very tightly in front of her. "I know what this looks like, Aria."
"It looks like a possible equipment malfunction with an unusual resonance pattern."
"That's one interpretation, yes."
Aria looked at the read-out one more time. The pattern cycled through its forty-one seconds again: short, long, short-short, long-long. Patient as a clock.
"I need to think," she said.
It was 0327. Dawn on Mars was at 0611. She had roughly two and a half hours before the rest of the colony's day shift came online and someone noticed the drill array was on hold.
Two and a half hours to decide how to answer a question that humanity had been asking for a hundred years.`,
                        isPublished: true,
                    },
                    {
                        id: "act-2",
                        title: "Act II: The Decision Room",
                        imageSrc: "/images/stories/mars-colony/chapter-1/act-2-command-center.jpg",
                        imageCaption: "The colony command center before dawn",
                        imageRevealAfterParagraph: 5,
                        summary: "Aria moved the conversation to Command where decisions were made under better light and worse consequences. The room was quiet except for ventilation and the faint sync pulse from the colony net. Zhao brought raw seismic telemetry. Rael brought comm logs and two pages of annotations written so fast his handwriting collapsed into diagonals. Martinez arrived last, read the faces before the data, and sat without speaking.\nThey built three hypotheses in under twelve minutes: unknown natural resonance, buried pre-human artifact, hostile signal mimic. Martinez favored the third on principle. Zhao favored the second because geology had already ruled itself out. Rael favored \"we do not yet have enough variables to deserve preferences,\" then proceeded to explain why the signal's packet spacing implied intentionality.\n\"Could this be us?\" Aria asked. \"Historic hardware, old Soviet probe, obsolete relay artifact, anything human.\"\nRael shook his head. \"Frequency architecture doesn't map to any known terrestrial protocol family, and the recurrence interval predates this drill cycle. If it's human, it's a human design lineage we have no records for.\"\nMartinez leaned forward. \"If it can hear us, can it reach us?\"\nNo one answered immediately, which was answer enough.\nAria opened the operations board and split responsibilities with the efficiency of someone buying time in measured slices. Zhao: independent diagnostic chain plus borehole camera prep. Rael: controlled receive-only monitoring on isolated hardware with physical kill switch. Martinez: quiet readiness posture, no colony-wide alert unless threshold crossed.\n\"Threshold?\" he asked.\n\"Pattern change, pressure anomaly, or unauthorized systems handshake,\" Aria said. \"Any one triggers lockdown protocols and wake cycle override.\"\nBy 04:20 the first anomaly hit: the forty-one-second cycle shortened to thirty-nine for three consecutive loops, then returned. Rael replayed it three times to rule out instrument jitter. It held. Something below had adjusted.\n\"It noticed we were listening,\" Zhao said softly.\n\"Or it changed state for internal reasons,\" Aria answered, because certainty was expensive and they could not afford it yet.\nAt 05:03, a maintenance drone assigned to outer ring inspection stalled near the drill bay and sent a corruption flag before rebooting. Martinez requested armed oversight for all engineering crews. Aria approved it and watched his jaw tighten as if approval confirmed what he had hoped to avoid naming.\nDawn was an hour away. In forty-eight minutes the regular day shift would start asking ordinary questions that no longer had ordinary answers. Aria looked at the team around her - one scientist vibrating with terror and focus, one comms specialist halfway between awe and dread, one security chief already planning for casualties he still hoped not to count - and understood that whatever she chose next would become precedent for all of human presence on Mars.",
                        isPublished: true,
                    },
                    {
                        id: "act-3",
                        title: "Act III: What Dawn Brings",
                        imageSrc: "/images/stories/mars-colony/chapter-1/act-3-martian-dawn.jpg",
                        imageCaption: "Artemis Base at dawn, Elysium Plateau",
                        imageRevealAfterParagraph: 6,
                        summary: "Mars sunrise arrived as a thin copper line over the habitat ridge, turning the dust outside the viewport into drifting fire. Inside Command, nobody felt poetic about it. They had twenty minutes before shift change and one unresolved question that did not care about schedules.\nAria made the call no commander wants to make on partial data: controlled engagement under containment. Not a colony-wide announcement, not a full blackout - yet. A narrow operational corridor. Minimal personnel. Maximum recording. She signed the order and pushed it to three terminals so no one could later pretend they had misunderstood.\nRael configured a transmission buffer in case they chose to answer. Zhao prepared the micro-bore camera for insertion to 412 meters with thermal and chemical sampling live on split screens. Martinez posted two security teams at the drill bay and one at life-support control because every disaster manual begins with \"protect oxygen first.\"\nAt 05:57, they lowered the camera. For eighty-seven meters, basalt walls and tool scarring. At 311, mineral veining changed from random fractures to parallel channels too regular to dismiss. At 404, the camera lights reflected from a surface that was neither rock nor metal in any spectrum model the software recognized. It looked matte and dark until the signal cycled, and then geometric seams lit beneath it like constellations being remembered.\nThe comm array pinged at the exact moment the seams lit. Same core pattern. New suffix. Rael's voice went thin with concentration. \"It appended data. That's a handshake attempt or an index marker. Either way, it's interactive.\"\nIn Habitat 2, day shift alarms chimed and ordinary life began: breakfast queue, maintenance check-ins, school module wake cycle for the six children born on-station. The colony moved into morning while Command watched something wake beneath them.\nMartinez received a message from Engineering: two pressure doors in corridor C briefly desynced lock timing, then corrected. No breach. No cause. He looked at Aria and did not speak because he did not need to.\n\"We choose now,\" Aria said. \"Do we physically investigate first, do we transmit first, or do we lock everything down and spend the day proving this isn't what it looks like?\"\nNo one in the room mistook that for a rhetorical question. Outside, the sun climbed. Below, the pattern repeated - patient, precise, and waiting for an answer humanity had never rehearsed.",
                        isPublished: true,
                    },
                ],
                voteQuestion: "Commander Chen has until dawn. What is the colony's first move?",
                votePrompt:
                    "Your vote determines Chapter 2's opening situation. Choose the approach that Aria takes before the rest of the colony wakes up.",
                voteOptions: [
                    {
                        id: "send-survey-team",
                        title: "Send a survey team to the drill site",
                        description:
                            "Assemble a small team to investigate the contact point directly—drill cameras, sample extraction, seismic mapping of the immediate area. Gather data before making any decisions.",
                        risk: "If the contact responds to physical investigation differently than it responded to the drill, the team is in an unknown situation with limited resources.",
                        votePercent: 41,
                    },
                    {
                        id: "broadcast-response",
                        title: "Transmit a response signal",
                        description:
                            "Use Rael's comm array to broadcast on the same frequency, mirroring the pattern from below. If something is signaling, signal back. Establish contact before anyone decides what to do about it.",
                        risk: "Transmitting acknowledges that the colony has received and understood the signal. Whatever that implies about what comes next, it cannot be undone.",
                        votePercent: 35,
                    },
                    {
                        id: "lockdown-analysis",
                        title: "Lock down and run full diagnostics",
                        description:
                            "Secure the drill array, pull the signal data, and spend the pre-dawn hours verifying every possible equipment or natural explanation before treating this as something it might not be.",
                        risk: "The signal has been transmitting for six days. Whatever is waiting below has been waiting longer. But moving carefully now may prevent a much more serious mistake later.",
                        votePercent: 24,
                    },
                ],
            },
        ],
    },
    "missing-heiress": {
        id: "missing-heiress",
        title: "The Missing Heiress",
        genre: "Mystery",
        genreEmoji: "🔍",
        heroImage: "/images/stories/missing-heiress/chapter-1/establishing.png",
        status: "voting",
        votes: 4123,
        synopsis:
            "Isabella Hartwell vanished from her penthouse at the top of the Whitmore Building at 12:03 a.m. The suite was locked from the inside. The security system was blind for exactly four minutes. The guest list from her private dinner—eleven names—has produced eleven different accounts of where everyone was when the elevator chimed. Detective Marcus Vale has the first night to find something solid before the press cordon, the family lawyers, and the building's ownership group all arrive in the same morning. He has no body, no note, no struggle, and a single black silk glove on the balcony. He has, by his own count, until sunrise.",
        hook: "A locked penthouse, a four-minute blackout, eleven guests, and one glove. Detective Vale has until dawn before the case stops belonging to him.",
        coverGradient: "from-indigo-500 to-purple-700",
        accentTextClass: "text-indigo-300",
        ringClass: "ring-indigo-400",
        characters: [
            {
                name: "Detective Marcus Vale",
                role: "Lead Detective, Major Crimes",
                emoji: "🔍",
                gradient: "from-indigo-600 to-purple-700",
                bio: "Marcus has been a detective for fifteen years and a major-crimes detective for six. He solves cases by finding the one detail that does not fit and pulling it until everything else comes loose. He has been wrong twice in his career. Both times, he knew it before the verdict. He has not yet decided whether this will be the third.",
                image: "/images/characters/marcus.png",
            },
            {
                name: "Isabella Hartwell",
                role: "The Missing Heiress",
                emoji: "💎",
                gradient: "from-fuchsia-500 to-purple-700",
                bio: "Twenty-nine years old, sole heir to the Hartwell trust, and—according to everyone who knew her—the kind of person who never went anywhere without three people knowing exactly where she was going. She kept a ledger. She kept appointments. She kept a small private safe that was opened sixteen minutes before she disappeared. Marcus has not yet met her, only the shape she left behind.",
            },
            {
                name: "Vivienne Hartwell",
                role: "Cousin, Sole Surviving Relative",
                emoji: "💼",
                gradient: "from-slate-600 to-indigo-700",
                bio: "Vivienne is composed in the precise way that suggests she has been composed for hours before anyone arrived to test her. She is Isabella's only remaining family, the named alternate beneficiary of the Hartwell estate, and—by her own statement—was on the eighth-floor terrace at 12:03 a.m. The dinner staff log her leaving the eighth-floor terrace at 11:57. No one has corrected her about this yet.",
            },
            {
                name: "Pierre Lavalle",
                role: "Night Concierge, the Whitmore",
                emoji: "🗝️",
                gradient: "from-stone-600 to-indigo-600",
                bio: "Fifteen years at the Whitmore desk. Pierre has the particular skill of seeing without appearing to look, which has made him useful to a great many people who would not want to be observed. He was at his post between 11:45 and 12:10. His written statement covers that window with the precision of a man who has rehearsed it.",
            },
        ],
        chapters: [
            {
                slug: "chapter-1-the-locked-room",
                chapterNumber: 1,
                title: "The Locked Room",
                label: "Chapter 1",
                shortDescription:
                    "Detective Marcus Vale arrives at the Whitmore Building forty minutes after the call. The suite is sealed, the security feed is missing four minutes, and the only thing on the balcony is a single black silk glove. He has until dawn.",
                opening:
                    "Marcus Vale had been a homicide detective long enough to know that the calls that came at midnight were almost always the ones with bodies, and the calls that came at twelve forty-seven on a Tuesday almost never were. This one was the second kind, which usually meant it was about to be the first.",
                status: "voting",
                sections: [
                    {
                        id: "act-1",
                        title: "Act I: The Call from the Whitmore",
                        imageSrc: "/images/stories/missing-heiress/chapter-1/act-1-penthouse.jpg",
                        imageCaption: "The Whitmore penthouse, 12:47 a.m.",
                        imageRevealAfterParagraph: 7,
                        summary: `Marcus Vale had been a homicide detective long enough to know that the calls that came at midnight were almost always the ones with bodies, and the calls that came at twelve forty-seven on a Tuesday almost never were. This one was the second kind, which usually meant it was about to be the first.
"Vale." He took the call standing in his kitchen, the kettle still going. He turned the burner off without looking.
"It's Reyes. Whitmore Building. Top floor. We've got a missing person, but it's not a runaway and it's not a domestic. Captain wants you on it before the family lawyers wake up."
"How long has she been missing?"
"Forty-five minutes by the time I'm telling you. The concierge logged the elevator at 12:03 going up empty, came back down empty at 12:07. Suite was locked from the inside. Cousin opened the door with the family override at 12:31."
"Who's the family?"
A pause. "Hartwell."
Marcus poured the unboiled water down the sink. Hartwell was the kind of name that made cases stop being cases and start being problems. The kind that, by morning, had three lawyers, two PR firms, and one congressman attached to it.
"I'm leaving now," he said. "Don't let anyone touch the suite. Especially the cousin."
"The cousin's the one who called it in."
"Don't let her touch the suite."
He was on the FDR in eight minutes. The Whitmore Building rose out of the Upper East Side the way old money rises—without explanation, as if it had always been there and you were the one who needed to justify your presence. He pulled into the garage at 1:02. Reyes was waiting in the lobby with a face that was already trying to apologize for what Marcus was about to walk into.
"Forty-second floor," Reyes said. "Penthouse. The whole floor's hers. Was hers. Is hers. I don't know the right tense."
"Present tense until we find her or don't."
The elevator was the kind that didn't make sound. Marcus watched the floor numbers count up and thought about the four minutes between 12:03 and 12:07 when the elevator had gone somewhere with no one in it.
"Talk to me about the dinner party," he said.
"Eleven guests. All cleared the building by eleven thirty according to Pierre at the desk. The staff stayed until 11:50 to clean. By midnight she was alone in the suite, or so the system says. The cousin came back up at 12:28 saying she'd forgotten her phone. Used the family override at 12:31 when no one answered."
"Why'd she come back at twelve thirty?"
"That's exactly the question," Reyes said.
The doors opened onto a private vestibule, and then onto the suite itself. The Whitmore penthouse was the kind of apartment that had been photographed for magazines that nobody actually bought. Floor-to-ceiling glass on three sides. A view that put most of Manhattan beneath it. Furniture that looked uncomfortable on principle. The dinner table was still set for twelve—eleven place settings used, one untouched at the head.
Marcus stopped at the threshold and just looked.
A glass of red wine was sitting on the side table by the balcony door, half-finished. A book lay open on the chaise—Isabella's reading, presumably, from sometime after the guests had left. Her phone was on the kitchen island next to a glass of water. Her shoes were beside the entryway, not put away. Everything about the suite said she had been there ten minutes ago. Nothing about it said she had left.
"Where's the glove?" he asked.
Reyes pointed. "Balcony. Don't go out yet, the print team's still—"
"I know."
He looked anyway. The terrace door was ajar by perhaps three inches. The glove lay on the limestone tile six feet from the rail, palm up. Black silk. Long. Evening wear. A single fingerprint on the inner cuff that would belong, almost certainly, to Isabella Hartwell.
"Cousin's where?" Marcus asked.
"Library. Down the hall. Lawyer's already with her."
"Of course he is. Security feed?"
Reyes hesitated. "That's the other thing. Hallway camera, elevator camera, lobby camera—all three went down at 12:01. Came back up at 12:05. Four minutes of nothing on every system in the building's east column."
Marcus looked at him. "Just the east column?"
"Just the east column."
"That's not a malfunction."
"No, sir. It's not."
Marcus stood in the doorway of the penthouse and counted, the way he always counted at the start of a case—not the things that were there, but the things that should have been and weren't. No struggle. No body. No note. No forced entry. No clear exit. One glove, four missing minutes, eleven dinner guests, one cousin who came back for a phone she could have lived without until morning, and one safe—the safe, he knew now, that had been opened at 11:47, sixteen minutes before whatever happened.
He had until sunrise. After that, the case would belong to the family, the press, and the precinct above his pay grade.
"Get me a list," he said. "Every guest, when they arrived, when they left, who they sat next to, what they drank. I want Pierre at the desk in thirty minutes, and I want him separated from his union rep for the first ten. And get the cousin out of the library and into the kitchen. Libraries make people calm. I don't want her calm."
"Yes, sir."
Marcus stepped just inside the suite and stopped where the entry tile met the carpet, careful not to disturb anything yet. The half-glass of wine. The open book. The single shoe set neatly beside its mate. A woman who had been here. A door that was open by three inches. A glove on the terrace.
"Isabella," he said quietly, to nobody. "Where did you go."
The city below the Whitmore answered the way the city always did: with traffic and wind and the long indifferent hum of two million people who had no idea what had happened in the room above them, and no reason yet to care.
He had until dawn.`,
                        isPublished: true,
                    },
                ],
                voteQuestion: "Marcus has the first hour. Where does the investigation start?",
                votePrompt:
                    "This vote sets the opening direction of Chapter 2 and decides which suspect Marcus pressures first—before the family lawyers and the press cordon arrive at sunrise.",
                voteOptions: [
                    {
                        id: "press-the-cousin",
                        title: "Press Vivienne in the kitchen, now",
                        description:
                            "Vivienne came back at 12:28 for a phone she did not need. Her alibi is paper-thin and her motive is the oldest one in the book. Marcus pulls her out of the library and questions her before her lawyer fully wakes up.",
                        risk: "If Marcus pushes the only living Hartwell too hard and she turns out to be clean, the family's lawyers will have him off the case by 8 a.m.",
                        votePercent: 40,
                    },
                    {
                        id: "open-the-safe",
                        title: "Force the safe—find out what was taken",
                        description:
                            "The penthouse safe was opened at 11:47, sixteen minutes before Isabella vanished. Whatever was inside is the actual reason for whatever happened next. Marcus calls in a court-order favor and gets the safe opened before dawn.",
                        risk: "Forcing the safe without a clean warrant could compromise every piece of evidence found inside it. If the contents matter at trial, the trial may not have them.",
                        votePercent: 35,
                    },
                    {
                        id: "pierre-and-the-blackout",
                        title: "Walk Pierre through the four-minute blackout",
                        description:
                            "Three cameras on the east column went dark for exactly four minutes, and Pierre was the only person at the desk. Whether he caused it, allowed it, or simply watched it, he is the closest thing to a witness Marcus has.",
                        risk: "Pierre is connected to the building's ownership group. If Marcus mishandles him, the case is gone before the family even arrives.",
                        votePercent: 25,
                    },
                ],
            },
        ],
    },
}

export function getSerialStory(storyId: string) {
    return SERIAL_STORIES[storyId]
}

export function getSerialStoryChapter(storyId: string, chapterSlug: string) {
    return SERIAL_STORIES[storyId]?.chapters.find((chapter) => chapter.slug === chapterSlug)
}