// App.jsx — main component; composes the page and owns the voice-modal state
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import VoiceAgentModal from './components/VoiceAgentModal';

// Root component — every section that can open the assistant receives onAskAI
export default function App() {
  // Voice assistant modal visibility
  const [assistantOpen, setAssistantOpen] = useState(false);
  const openAssistant = () => setAssistantOpen(true);

  return (
    <>
      {/* Minimal sticky header */}
      <Header onAskAI={openAssistant} />

      <main>
        {/* Headline, subheadline and the primary AI-assistant CTA */}
        <Hero onAskAI={openAssistant} />

        {/* Service cards */}
        <Services />

        {/* Service rates */}
        <Pricing />

        {/* Customer reviews */}
        <Testimonials />
      </main>

      {/* Contact / CTA footer */}
      <Footer onAskAI={openAssistant} />

      {/* Voice assistant modal (AnimatePresence handles enter/exit) */}
      <VoiceAgentModal open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </>
  );
}
