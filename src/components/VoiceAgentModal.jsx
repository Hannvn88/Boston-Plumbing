// VoiceAgentModal.jsx — the AI voice assistant dialog. AnimatePresence handles
// enter/exit; a matte 3D orb reacts live to the conversation; one premium pill
// button runs the whole flow: tap to talk, tap again to send.
import React, { Suspense, lazy, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { startRecording, sendToWebhook, playAudioResponse, speakText } from '@/lib/voiceAgent';

// Loaded on demand — keeps Three.js out of the initial page bundle
const VoiceOrb = lazy(() => import('./VoiceOrb'));

// Plain-language status line for each assistant state
const STATUS_TEXT = {
  idle: 'Press the button and start talking. No typing needed.',
  listening: 'We’re listening. Press the button again when you’re finished.',
  thinking: 'Finding your answer…',
  speaking: 'Here’s your answer…',
};

// Three pulsing dots shown while the assistant is working (no spinners)
function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2 py-2" role="status" aria-label="Loading">
      {[0, 1, 2].map((dotIndex) => (
        <motion.span
          key={dotIndex}
          className="h-2.5 w-2.5 rounded-full bg-slate-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dotIndex * 0.15 }}
        />
      ))}
    </div>
  );
}

// VoiceAgentModal — records the question, sends it to the webhook, shows and
// speaks the answer. Multiple questions are allowed per session.
export default function VoiceAgentModal({ open, onClose }) {
  const [assistantState, setAssistantState] = useState('idle'); // idle | listening | thinking | speaking
  const [transcript, setTranscript] = useState(''); // user's transcribed question
  const [answer, setAnswer] = useState(''); // AI response text
  const [errorMessage, setErrorMessage] = useState('');
  const recorderRef = useRef(null); // active recorder handle
  const analyserRef = useRef(null); // live mic analyser, read by the orb
const audioPlayerRef = useRef(null); // Stores currently playing audio element so we can stop it
  // Starts microphone capture and hands the analyser to the orb
  const beginListening = async () => {
    try {
      setErrorMessage('');
      setTranscript('');
      setAssistantState('listening');
      recorderRef.current = await startRecording();
      analyserRef.current = recorderRef.current.analyser;
    } catch {
      setAssistantState('idle');
      setErrorMessage('We can’t hear you yet. Please allow microphone access, then try again.');
    }
  };

  // Stops recording, sends the audio, then displays and speaks the answer
  const finishAndSend = async () => {
    try {
      setAssistantState('thinking');
      analyserRef.current = null; // orb stops tracking the mic
      const audioBlob = await recorderRef.current.stop();
      recorderRef.current = null;

      const data = await sendToWebhook(audioBlob);
      setTranscript(data.transcription || data.transcript || '');
      setAnswer(data.answer || 'Sorry, we didn’t catch that. Please try again.');

      // Speak the reply: webhook audio if provided, otherwise browser speech synthesis
      setAssistantState('speaking');
      if (data.audio) await playAudioResponse(data.audio, 'audio/wav', audioPlayerRef);
      else await speakText(data.answer);
      setAssistantState('idle'); // ready for the next question
    } catch {
      setAssistantState('idle');
      setErrorMessage('Something went wrong reaching the assistant. Please try again, or call (555) 012-3456.');
    }
  };

  // The single talk button toggles between start and send
  const handleTalkClick = () => {
    if (assistantState === 'listening') finishAndSend();
    else if (assistantState === 'idle') beginListening();
  };

  // Closes the modal and aborts any recording or speech in progress
 const handleClose = () => {
  // Stop mic recording if active
  recorderRef.current?.stop();
  recorderRef.current = null;
  analyserRef.current = null;
  
  // Cancel any browser speech synthesis
  window.speechSynthesis?.cancel();
  
  // Stop any playing audio from n8n response
  if (audioPlayerRef.current) {
    audioPlayerRef.current.pause();
    audioPlayerRef.current = null;
  }
  
  setAssistantState('idle');
  onClose()...

  const isBusy = assistantState === 'thinking' || assistantState === 'speaking';
  const isListening = assistantState === 'listening';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-gray-800/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          {/* Modal panel — clicks inside must not close the overlay */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Boston Plumbing AI assistant"
            className="relative w-full max-w-lg rounded-md border border-slate-200 bg-white p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Minimal close button, top-right */}
            <button
              onClick={handleClose}
              aria-label="Close assistant"
              className="absolute right-4 top-4 rounded p-2 text-slate-600 hover:bg-slate-100 hover:text-gray-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h2 className="font-display text-xl font-bold text-gray-800">Boston Plumbing AI Assistant</h2>

            {/* Live 3D orb, centered — reacts to the mic while listening */}
            <div className="mt-4 flex min-h-[12rem] items-center justify-center">
              <Suspense fallback={null}>
                <VoiceOrb state={assistantState} analyserRef={analyserRef} />
              </Suspense>
            </div>

            {/* Status line below the orb */}
            <p className="min-h-[1.75rem] text-center text-base text-slate-600">
              {STATUS_TEXT[assistantState]}
            </p>

            {/* Conversation area: transcript, loading dots, then the answer */}
            <div className="mt-4 space-y-4">
              {transcript && (
                <motion.p
                  key={transcript}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-base italic text-slate-600"
                >
                  You asked: “{transcript}”
                </motion.p>
              )}

              {assistantState === 'thinking' && <LoadingDots />}

              {answer && assistantState !== 'thinking' && (
                <motion.div
                  key={answer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-md border border-slate-200 border-l-4 border-l-forest bg-slate-50 p-4 text-base leading-relaxed text-gray-800"
                >
                  {answer}
                </motion.div>
              )}

              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-base font-medium text-red-700"
                >
                  {errorMessage}
                </motion.p>
              )}
            </div>

            {/* Circular icon-only talk button, matching the orb's aesthetic.
                The status line above carries the instructions; the button stays
                labelled for screen readers via aria-label. */}
            <div className="mt-7 flex justify-center">
              <motion.button
                onClick={handleTalkClick}
                disabled={isBusy}
                aria-label={isListening ? 'Stop and send your question' : 'Tap to talk'}
                animate={
                  assistantState === 'idle'
                    ? {
                        scale: [1, 1.04, 1],
                        boxShadow: [
                          '0 6px 20px rgba(20, 67, 42, 0.25)',
                          '0 6px 34px rgba(20, 67, 42, 0.5)',
                          '0 6px 20px rgba(20, 67, 42, 0.25)',
                        ],
                      }
                    : isListening
                      ? { scale: [1, 1.03, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: isListening ? 1.2 : 2.4, repeat: isBusy ? 0 : Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'grid h-16 w-16 place-items-center rounded-full text-white shadow-lg transition-colors',
                  isListening ? 'bg-red-700 hover:bg-red-800' : 'bg-forest hover:bg-forest-deep',
                  isBusy && 'cursor-not-allowed opacity-60'
                )}
              >
                {isListening ? (
                  <Square className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Mic className="h-7 w-7" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
