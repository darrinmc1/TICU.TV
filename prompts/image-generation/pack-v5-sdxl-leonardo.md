# Pack V5 - SDXL / Leonardo Batch (Copy/Paste)

This version is parameterized for SDXL-class models and Leonardo-style workflows.

## Base Settings
- Aspect ratio: 16:9
- Resolution: 1536x864
- Steps: 35
- CFG: 6.5
- Sampler: DPM++ 2M Karras
- Hires fix/upscale: optional 1.5x after approval
- Keep fixed seed per story for continuity.

## Story Seed Map
- Dragons Last Breath: `seed=11031`
- Love in Paris: `seed=22041`
- Showdown at Sunset: `seed=33051`
- Mars Colony Crisis: `seed=44061`

## Continuity Controls
- SDXL: use FaceID/IP-Adapter with strength 0.75 to 0.9.
- Leonardo: Character Reference ON, strength High.
- Keep same model checkpoint for all beats in a chapter.

## Global Negative
text, logo, watermark, blurry, low quality, bad anatomy, extra limbs, duplicate face, deformed hands, jpeg artifacts, oversaturated neon, cartoon

---

## Dragons Last Breath

### Establishing
Prompt:
Caelin at the edge of a glassed volcanic crater at dawn, obsidian relic in forearm faintly glowing, ruined village smoke in distance, epic but grounded fantasy realism, ember and cyan accent lighting, dramatic atmosphere, cinematic composition, subtle film grain, continuity locked to story reference
Parameters:
seed=11031, steps=35, cfg=6.5, ar=16:9

### Tension
Prompt:
Caelin, Vex, and Thornik examining blood-stained dwarven journal over an improvised forge table, resonance devices emitting low glow, practical warm light mixed with cold mountain spill, tactical urgency and dread, cinematic fantasy realism, continuity locked to story reference
Parameters:
seed=11031, steps=35, cfg=6.5, ar=16:9

### Decision
Prompt:
underground dwarven hall awakening with bronze channels igniting, central dais choice moment, team framed against monumental stone architecture, high stakes, cinematic fantasy realism with depth and scale, continuity locked to story reference
Parameters:
seed=11031, steps=35, cfg=6.5, ar=16:9

### Cliffhanger
Prompt:
night ridge with distant torch-lines converging, Caelin relic pulse in foreground, Vex scanning horizon and Thornik lit by instrument glow, imminent threat atmosphere, cinematic fantasy cliffhanger realism, continuity locked to story reference
Parameters:
seed=11031, steps=35, cfg=6.5, ar=16:9

---

## Love in Paris

### Establishing
Prompt:
Juliet outside Left Bank bookshop after rain, warm interior window glow reflecting on wet cobblestone, intimate romantic realism, elegant framing, soft bokeh, subtle emotional anticipation, continuity locked to story reference
Parameters:
seed=22041, steps=35, cfg=6.5, ar=16:9

### Tension
Prompt:
Juliet in fellowship studio with unfinished canvas and open poetry volume, rain at skylight, ambition versus uncertainty in expression, warm lamp practicals with cool city spill, cinematic romantic realism, continuity locked to story reference
Parameters:
seed=22041, steps=35, cfg=6.5, ar=16:9

### Decision
Prompt:
Juliet and Etienne walking by the Seine under bridge light, visible emotional distance and unresolved connection, nuanced body language storytelling, intimate cinematic romantic realism, continuity locked to story reference
Parameters:
seed=22041, steps=35, cfg=6.5, ar=16:9

### Cliffhanger
Prompt:
Juliet at apartment doorway with key paused in lock and handwritten note in hand, corridor tungsten practicals versus cool rain spill, unresolved decision beat, cinematic romantic cliffhanger realism, continuity locked to story reference
Parameters:
seed=22041, steps=35, cfg=6.5, ar=16:9

---

## Showdown at Sunset

### Establishing
Prompt:
Sheriff Jake on Red Mesa boardwalk before panic, hard frontier sunlight, dusty street detail, grounded western realism, wide cinematic composition, continuity locked to story reference
Parameters:
seed=33051, steps=35, cfg=6.5, ar=16:9

### Tension
Prompt:
Jake and Rosa coordinating defense preparations, supply movement and shutter reinforcement, telegraph urgency implied, copper dust haze, gritty cinematic western realism, continuity locked to story reference
Parameters:
seed=33051, steps=35, cfg=6.5, ar=16:9

### Decision
Prompt:
sheriff office strategy map scene with Jake Rosa and Hendricks planning lines and fallback routes, slatted light and pressure-heavy expressions, grounded western realism, continuity locked to story reference
Parameters:
seed=33051, steps=35, cfg=6.5, ar=16:9

### Cliffhanger
Prompt:
first Holloway rider appears on sunset horizon with full gang dust plume behind, Jake in foreground hand near holster, iconic standoff composition, cinematic western cliffhanger realism, continuity locked to story reference
Parameters:
seed=33051, steps=35, cfg=6.5, ar=16:9

---

## Mars Colony Crisis

### Establishing
Prompt:
Commander Aria in pre-dawn command center reviewing anomalous deep signal waveform, cyan interface glow and rust-red Martian dawn spill, hard sci-fi realism, cinematic composition, continuity locked to story reference
Parameters:
seed=44061, steps=35, cfg=6.5, ar=16:9

### Tension
Prompt:
Zhao and Rael monitoring drill-bay pattern shift with maintenance drone fault in background, industrial surfaces and controlled panic atmosphere, high-detail hard sci-fi realism, continuity locked to story reference
Parameters:
seed=44061, steps=35, cfg=6.5, ar=16:9

### Decision
Prompt:
Aria Martinez Zhao and Rael around central ops board deciding containment versus contact, leadership hierarchy through blocking and gaze, clean industrial sci-fi cinematic realism, continuity locked to story reference
Parameters:
seed=44061, steps=35, cfg=6.5, ar=16:9

### Cliffhanger
Prompt:
command room reaction to bore-camera reveal as geometric seams illuminate under Martian surface on main display, Aria foreground making final call, high-stakes hard sci-fi cliffhanger realism, continuity locked to story reference
Parameters:
seed=44061, steps=35, cfg=6.5, ar=16:9

---

## Suggested Output Paths
- public/images/stories/<story-slug>/chapter-<n>/establishing.jpg
- public/images/stories/<story-slug>/chapter-<n>/tension.jpg
- public/images/stories/<story-slug>/chapter-<n>/decision.jpg
- public/images/stories/<story-slug>/chapter-<n>/cliffhanger.jpg
