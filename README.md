# Boston Plumbing — Light, Modern Site + AI Voice Assistant

White, premium-feeling plumbing service website built with **React**, **Tailwind CSS**, **shadcn/ui-style components** (heavily customized), and **Framer Motion**. Asymmetrical layouts throughout; the AI voice assistant is the primary feature — the hero "Get Help Now" CTA (with a handwritten "AI-Powered" note and curved arrow), a header shortcut, and a footer CTA all open it.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to /dist
```

## Structure

```
src/
  App.jsx                        # main component — owns voice-modal state
  components/
    Header.jsx                   # minimal nav: text wordmark, links, phone, CTA
    Hero.jsx                     # asymmetric hero (heading left, CTA right) over the aurora
    AuroraBackground.jsx         # light-mode aurora backdrop (Aceternity UI pattern)
    Services.jsx                 # service cards, scroll-reveal + hover lift
    Pricing.jsx                  # offset/staggered rate cards + inclusions panel
    Testimonials.jsx             # staggered left/right reviews, stars beside names
    Footer.jsx                   # asymmetric CTA band + contact details
    VoiceAgentModal.jsx          # AnimatePresence modal, breathing aura, one-button flow
    FadeUp.jsx                   # reusable whileInView fade-in-up wrapper
    ui/
      button.jsx                 # customized shadcn Button: 4px corners, green, hover scale
      card.jsx                   # customized shadcn Card: clean border, minimal shadow
  lib/
    utils.js                     # cn() class-merge helper (shadcn convention)
    voiceAgent.js                # mic recording, webhook call, <audio> playback
```

## Design

- Light theme: white background with a barely-perceptible film-grain texture, `#1F2937` dark-charcoal text, `slate-600` muted text, **deep forest green `#14432A`** as the single sparing accent (flat solid color, no gradients). No orange, no dark mode.
- Typography: **General Sans** (Fontshare) for headlines, **Inter** for body, **Caveat** for the handwritten "AI-Powered" note.
- Aurora background (vendored Aceternity pattern, slate/green bands) flows continuously behind the full-viewport hero on a fast 10s cycle, both gradient layers animating; hero content centers vertically in the first screen.
- Asymmetry by design: hero columns offset, pricing cards staggered at different heights, reviews alternate left/right, footer CTA band splits text/actions.
- Framer Motion everywhere: staggered fade-in-up on load, smooth `whileInView` section reveals on scroll, hover scale + shadow on buttons, card hover lift, AnimatePresence modal fade + scale, pulsing-dot loading.

## Voice assistant

- Records mic audio (MediaRecorder) and POSTs base64 JSON to `http://n8n.wayfore.studio:5678/webhook/plumbing-voice`.
- Expects `{ "answer": string, "transcription"?: string, "audio"?: base64 }`.
- Plays returned audio via an `<audio>` element; falls back to browser speech synthesis for text-only responses.
- One-button flow: **Tap to Talk → Tap When Done → answer fades in and is spoken.** Multiple questions per session. The pill-shaped talk button pulses with a soft glow while idle.
- A matte deep-green **3D orb (`@react-three/fiber` + `drei`, lazy-loaded)** sits centered in the modal under studio lighting: its surface deforms live with your voice while listening (AnalyserNode on the mic stream), drifts restlessly while thinking, swells rhythmically while the answer plays, and idles with a gentle drei `Float` bob.

> Note: the webhook is plain `http`, so browsers will block it from an `https` deployment (mixed content). Serve over `http` or put the webhook behind TLS for production.
