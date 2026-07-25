# Hyperframes Composition Brief: Boston Plumbing — the Living Voice Orb

## Objective
A short, premium brag video that sells the ONE thing the last render missed: **the orb is alive and it changes state as you talk to it.** Most demo videos show a static "listening" pose and a tagline. This one shows the real interaction loop — tap → the orb warps to your voice → tap again → it thinks, then swells as it speaks the answer back. The plumbing site is the wrapper; the flex is a real-time, self-hosted voice agent. Built by Wayforé Studio.

> **What changed from the last render (and why):** the previous cut was a flat green orb + "Talk to us. We're listening." — technically accurate, but it never showed a *state change*, so it read as generic SaaS. This rewrite makes the orb's live behavior (idle → listening → thinking → speaking) the spine of the video, grounds every line in the actual product (a plumber's AI voice agent), leans on the single forest-green accent so the orb is the only saturated thing on screen, and replaces the bouncy corporate track with something calm and organic.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920×1080
- Duration: ~21s

## Source Material (verified against code)
- Project root: `D:\Work\proflow-plumbing`
- Files read: `src/components/VoiceOrb.jsx`, `src/components/VoiceAgentModal.jsx`, `src/components/Hero.jsx`, `src/components/AuroraBackground.jsx`, `src/components/ui/FlickeringGrid.jsx`, `tailwind.config.js`, `index.html`
- Product: **Boston Plumbing** demo → real product = its **AI Voice Assistant** by **Wayforé Studio**
- Real one-button flow (from `VoiceAgentModal.jsx`): one circular button toggles start/stop. `idle` → tap → `listening` (button turns red, Square icon) → tap → `thinking` → `speaking` → back to `idle`. Multiple questions per session.
- Real status strings (verbatim, `STATUS_TEXT`):
  - idle: "Press the button and start talking. No typing needed."
  - listening: "We're listening. Press the button again when you're finished."
  - thinking: "Finding your answer…"
  - speaking: "Here's your answer…"
- Real answer-card treatment: white on `slate-50`, rounded, **4px forest-green left border** (`border-l-4 border-l-forest`). Transcript shows as: `You asked: "…"`.

## ⚠️ Two things to confirm before render (code vs. the brief you gave me)
1. **The handwritten "AI-Powered" note + curved arrow.** This is *not* rendered on the live hero. What *is* in the code: the `Caveat` handwriting font is loaded (`index.html`) and defined in the design system as `script: ['Caveat','cursive'] // handwritten accents (AI indicator)` (`tailwind.config.js:19`) — but no component draws the note. The real `Hero.jsx` is a two-column layout: heading block left, breathing forest-green mic button right.
   - **Decision taken (flag if you disagree):** feature it anyway, as a *designed* beat. The intent is unambiguously in the design system, it's a genuinely distinctive human touch, and this is a stylized promo, not a screen recording. Rendered in **Caveat**, forest-green, with a hand-drawn curved arrow pointing at the mic button. If you'd rather stay 1:1 with the live site, say so and I'll drop it and open on the plain asymmetric hero.
2. **"Aurora" background = `FlickeringGrid`.** `AuroraBackground.jsx` actually renders a slow grid of flickering emerald squares (`#10b981`, `squareSize 4`, `gridGap 6`, `maxOpacity 0.35`, `flickerChance 0.08`) — not a flowing aurora. I'll recreate *that* as the ambient texture (faint, slow, desaturated) so it matches what ships.

## The Orb — the differentiator (recreate its real behavior, don't fake a pose)
From `VoiceOrb.jsx`: a clear rippled **glass shell** (MeshTransmissionMaterial, chromatic edge split) with a luminous **emerald core** glowing through it. Its energy is eased every frame and the state drives it. **The video must move through all four states — that transition IS the sell.**

| State | Real behavior in code | How to show it |
|---|---|---|
| **idle** | `target = 0.1 + sin(t·1.2)·0.05` — slow visible breathing; drei `Float` gentle bob | Orb breathes, never frozen. Establish this first. |
| **listening** | `target = 0.14 + micLevel·0.9` — shell warps live to voice RMS; core swells | Surface ripples/warps in real time as the "voice" comes in — the money shot. |
| **thinking** | `rotation.y += 0.014` (vs 0.004), `rotation.x = sin(t·1.3)·0.15` — restless spin + wobble | Orb drifts/spins restlessly, unsettled — "it's working." |
| **speaking** | `target = 0.3 + (sin(t·6)+1)·0.2` — rhythmic pulse; core brightens | Orb swells rhythmically, core glows harder in time with the spoken answer. |

Recreate the essence in CSS/canvas/WebGL: emerald radial-gradient core (`#10b981` over depth `#06281c`), glassy sheen + soft blur halo, and a `level`-driven scale/glow that visibly differs per state. No literal equalizer bars — the diegetic shell warp is the reactivity.

## Visual Identity — one saturated thing on screen
- **Background:** `#FFFFFF`, with the real ambient texture recreated: slow flickering emerald grid (very faint — `maxOpacity ~0.35` but desaturated further so it never competes), plus a barely-there film grain. No gradients, no rainbow, no particle systems.
- **Single accent:** forest green **`#14432A`** (deep `#0F3D2E` / `forest-deep`). Orb emerald `#10b981`, core depth `#06281c`. **The orb and the forest accent are the only saturated elements — everything else is white / desaturated slate.** Let the green pop.
- **Text:** `#1F2937` (gray-800) primary, `#475569` (slate-600) muted.
- **Type:**
  - **General Sans** (Fontshare, 600/700) — headline moments. Fallback: Outfit/Inter, keep weight + tracking.
  - **Inter** — body / UI copy.
  - **Caveat** (600) — the "AI-Powered" handwritten note beat *only*. Used as a deliberate visual beat, not decoration.
- **Real UI props to reproduce:** forest-green circular mic button (lucide `Mic`; red `Square` while listening) with the "breathing" shadow bloom; the answer card with the 4px forest left border on slate-50; status line under the orb.

## Story Beats — show the real interaction, not a tagline
> Language rule: **no generic AI-assistant taglines** ("we're listening", "how can I help") as headline copy. Ground everything in *this* product — a Boston plumber's AI voice agent. The real status strings (e.g. "We're listening. Press the button again…") may still appear **diegetically inside the modal UI**, because that's authentic on-screen product text, not a marketing tagline.

### Scene 1 — The hero, human touch — ~3.5s
Open on the real **asymmetric hero** over the faint flickering-emerald grid: heading block left ("Boston Plumbing" / "Emergency plumbing, engineered for speed."), the **breathing forest-green mic button** right with its soft green halo. A **Caveat "AI-Powered" note** sits beside the button with a hand-drawn **curved arrow** pointing at it — the distinctive human touch. Calm, confident, still.
Audio: track opens warm and low; a soft presence as the note/arrow draw on.

### Scene 2 — Tap to talk → it hears you — ~5s
A cursor glides in and **taps** the mic (press ripple; button flips to the red Square "recording" state). The orb blooms up to center and shifts to **listening** — its glass shell **warps live to the voice** (the differentiator shot). Diegetic status: "We're listening…". Transcript types in below: *"Do you handle burst pipes at 2am?"* — the plumbing context enters naturally as the real demo question.
Audio-coupled: soft UI tick on tap; light key ticks under the typing.

### Scene 3 — It thinks, then speaks the answer — ~5s
Tap again ("Press again when you're finished"). Orb → **thinking**: restless spin + wobble, three pulsing dots, "Finding your answer…". Then → **speaking**: rhythmic swell, core brightens, "Here's your answer…". The **answer card** fades in with the real forest left border: *"Yes — licensed plumbers on call 24/7, usually at your door within 45 minutes."* Hold ~1.6s so it reads. This is the full loop landing.
Audio-coupled: brief "working" lull under thinking; a soft warm confirm as the answer settles and the orb pulses.

### Scene 4 — Under the hood — ~4s
Clean white feature row; three cards arrive one-by-one on the beat, each an emerald dot + label: **"Hears you — Whisper (Groq)"** · **"Thinks — LLaMA"** · **"Speaks back — Piper"**. Subtitle settles: *"orchestrated in n8n · self-hosted · real-time."* The capability flex.
Audio-coupled: one soft pop per card, beat-aligned; small music lift.

### Scene 5 — It could run inside yours — ~3.5s
Line settles: **"It's running inside a plumbing site. It could run inside yours."** → clean slam to the **Wayforé Studio** wordmark + **"Web + AI automation."** A small emerald orb reprise signs it off. Hold, then fade clean.
Audio-coupled: single soft confirm as the wordmark lands on a strong beat; bed fades to silence.

## Audio — calmer, organic, premium (replace the bundled track)
- **Drop** `happy-beats-business-moves-vol-1…mp3` — it reads as bouncy corporate stock and fights the white/minimal aesthetic.
- **Target track:** understated, calm-confident, a little organic/ambient — warm pads, soft/analog or acoustic texture, gentle pulse. **Not** upbeat "happy beats" energy. Think slow-to-mid tempo (~70–90 BPM), lots of air, minimal. It should feel like the calm confidence of the design, not hype.
- **How it's sourced:** resolve a new BGM at build time via the media-use skill against that mood brief; copy the frozen file into `brag-output/composition/assets/music/` and record it in the media ledger.
- **Beat locks are re-derived, not inherited.** The old 120.19-BPM grid and the 20.02s wordmark lock were tied to the *old* track — discard them. After the new track is resolved, re-read its BPM/beat grid and: reveal the 3 stack cards on every-other beat (holding long enough to read), and land the Wayforé wordmark on the nearest strong cue in the outro window. Mark them `// beat-locked` / `// beat-grid`.
- **Music arc:** warm low bed under the hero → unobtrusive through the tap/listen/answer loop, slight duck under "thinking" → small lift into the 3-card stack → wordmark lands on a strong beat → gentle fade to silence on the tail.
- **SFX posture:** sparse, professional, motion-matched — mic tap tick, light key ticks under the transcript, one soft pop per stack card, a soft confirm on the answer card and the wordmark. No casino/impact bombast. Pick SFX *after* the animation exists; prefer clean `interface`/`ui` sounds and low high-frequency-risk files for the repeated stack pops.
- **Audio-reactive note:** per-frame music extraction is unavailable in this environment (no Python/librosa). The orb's glow/scale is therefore driven by the GSAP timeline — beat-aligned pulses on the new track's grid during the hero and "speaking" states, plus fully diegetic reaction to the voice states (listening warp, thinking spin, speaking swell). Deterministic, reads as reactive, no waveform bars.

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion + runtime adapters; use the Three.js/WebGL or canvas adapter for the orb), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), `hyperframes-cli` (lint/check/render), and `media-use` (resolve the new BGM + SFX). This is the `/brag` workflow — do NOT enter the generic promo/launch-video intent interview.

Requirements:
- Show real UI/copy from the source project (orb states, mic button, answer card, verbatim status strings all qualify).
- **The orb must visibly pass through idle → listening → thinking → speaking** — the state change is the whole point; a single static pose fails the brief.
- Keep all text readable (reading-time floor: short labels ~0.8s settled, sentences ~0.3s/word).
- 15–25s window (~21s target).
- Resolve and include the new calmer/organic music + the SFX layer; use local assets only.
- Re-derive beat locks from the newly resolved track; snap stack cards to its grid and land the wordmark on a strong outro cue; mark them in code.
- Orb glow/scale driven by the timeline (audio-reactive fallback documented above).
- Run `hyperframes check` before render — brag's single gate.
