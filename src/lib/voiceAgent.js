// voiceAgent.js — microphone recording, webhook communication and audio playback
// for the AI voice assistant. Pure logic, no React — imported by VoiceAgentModal.
// Playback uses a plain HTMLAudioElement; an AnalyserNode taps the mic stream
// so the 3D orb can react to the caller's voice in real time.

// n8n endpoint that receives the recorded audio and returns the AI answer
const WEBHOOK_URL = 'https://n8n.wayfore.studio/webhook/plumbing-voice';

// Shared AudioContext for mic analysis (created lazily after a user gesture)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// Starts microphone capture. Returns a handle exposing an AnalyserNode (for the
// live orb reaction) and a stop() that resolves with the recorded audio Blob.
export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Tap the mic through an analyser so the UI can read live volume levels
  const ctx = getAudioContext();
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  source.connect(analyser);

  const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks = [];
  recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data);
  recorder.start();

  return {
    analyser,
    // Stops recording, releases the microphone, and resolves with the audio Blob
    stop: () =>
      new Promise((resolve) => {
        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          source.disconnect();
          resolve(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }));
        };
        recorder.stop();
      }),
  };
}

// Converts an audio Blob to a base64 string (without the data-URL prefix)
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Sends the recorded audio to the n8n webhook and returns the parsed JSON response.
// Expected response shape: { answer: string, transcription?: string, audio?: base64 }
export async function sendToWebhook(audioBlob) {
  const audioBase64 = await blobToBase64(audioBlob);
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audio: audioBase64,
      mimeType: audioBlob.type,
      source: 'boston-plumbing-website',
    }),
  });
  if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
  return response.json();
}

// Plays a base64-encoded audio response through an <audio> element.
// Resolves when playback finishes (or fails, so the UI never hangs).
export function playAudioResponse(base64Audio, mimeType = 'audio/mpeg') {
  return new Promise((resolve) => {
    const player = new Audio(`data:${mimeType};base64,${base64Audio}`);
    player.onended = resolve;
    player.onerror = resolve;
    player.play().catch(resolve);
  });
}

// Fallback: speaks the answer with browser speech synthesis when the webhook
// returns text only. Resolves when speech ends.
export function speakText(text) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window) || !text) return resolve();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
  });
}
