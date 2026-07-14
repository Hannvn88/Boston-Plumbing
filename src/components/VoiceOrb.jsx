// VoiceOrb.jsx — glassy 3D voice orb built with @react-three/fiber and drei.
// Inspired look: a clear, rippled glass shell with a luminous emerald core
// glowing through it. The shell warps live with the caller's voice while
// listening, pulses rhythmically while the answer plays, and breathes at idle.
import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';

// Core colours — swap these two for a different glow (e.g. '#2563eb' / '#0b1e4d' for blue)
const CORE_COLOR = '#10b981';
const CORE_DEPTH_COLOR = '#06281c';

// The reactive orb: transparent rippled shell + glowing core, driven by useFrame
function ReactiveOrb({ stateRef, analyserRef }) {
  const shellRef = useRef();
  const geometryRef = useRef();
  const coreRef = useRef();
  const basePositions = useRef(null); // undeformed vertex snapshot
  const level = useRef(0); // eased mic/speech energy
  const audioData = useMemo(() => new Uint8Array(256), []);

  // Reads the live microphone level (0..1) from the analyser, if recording
  const readMicLevel = () => {
    const analyser = analyserRef.current;
    if (!analyser) return 0;
    analyser.getByteTimeDomainData(audioData);
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      const deviation = (audioData[i] - 128) / 128; // -1..1 around silence
      sum += deviation * deviation;
    }
    return Math.min(1, Math.sqrt(sum / audioData.length) * 4); // scaled RMS
  };

  // Per-frame: ease energy toward the state target, ripple the shell, pulse the core
  useFrame(({ clock }) => {
    const geometry = geometryRef.current;
    const shell = shellRef.current;
    if (!geometry || !shell) return;

    // Snapshot the pristine vertex positions on the first frame
    if (!basePositions.current) {
      basePositions.current = geometry.attributes.position.array.slice();
    }

    const t = clock.elapsedTime;
    const state = stateRef.current;

    // Target energy: organic breathing at idle, live mic while listening,
    // rhythmic pulse while the answer is spoken
    let target = 0.1 + Math.sin(t * 1.2) * 0.05; // idle: slow visible breathing
    if (state === 'listening') target = 0.14 + readMicLevel() * 0.9;
    else if (state === 'thinking') target = 0.12;
    else if (state === 'speaking') target = 0.3 + (Math.sin(t * 6) + 1) * 0.2;
    level.current += (target - level.current) * 0.15; // eased, never jumps

    // Ripple the shell: warp each vertex with two slow travelling waves,
    // giving the blobby organic rim of the reference look
    const positions = geometry.attributes.position;
    const base = basePositions.current;
    for (let i = 0; i < positions.count; i++) {
      const ox = base[i * 3];
      const oy = base[i * 3 + 1];
      const oz = base[i * 3 + 2];
      const ripple =
        Math.sin(t * 2.2 + ox * 3.1 + oy * 2.3) * 0.5 + Math.sin(t * 3.4 + oz * 4.2) * 0.5;
      const scale = 1 + ripple * 0.12 * level.current;
      positions.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals(); // keep refraction true to the warped surface

    // The core swells with the same energy, glowing harder as you speak
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + level.current * 0.35);
    }

    // Per-state body motion
    shell.rotation.y += state === 'thinking' ? 0.014 : 0.004; // thinking: restless spin
    shell.rotation.x = state === 'thinking' ? Math.sin(t * 1.3) * 0.15 : shell.rotation.x * 0.95;
  });

  return (
    <group>
      {/* Luminous core seen through the glass: bright emerald sphere with a
          darker off-centre depth sphere that fakes the shaded interior */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.55, 20, 20]} />
          <meshBasicMaterial color={CORE_COLOR} toneMapped={false} />
        </mesh>
        <mesh position={[0.12, -0.16, 0.12]}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshBasicMaterial color={CORE_DEPTH_COLOR} toneMapped={false} />
        </mesh>
      </group>

      {/* Clear rippled glass shell — fully transparent, with chromatic edge
          splitting and animated internal distortion for the liquid-glass effect */}
      <mesh ref={shellRef}>
        {/* 32 segments keeps the ripple smooth at a quarter of the vertex cost */}
        <sphereGeometry ref={geometryRef} args={[1, 32, 32]} />
        {/* Lightweight glass: small render target + fewer samples, single-sided —
            keeps the see-through look at a fraction of the GPU cost */}
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.8}
          resolution={256}
          samples={4}
          roughness={0.15}
          chromaticAberration={0.08}
          distortion={0.5}
          distortionScale={0.4}
          temporalDistortion={0.25}
          ior={1.3}
          color="#ffffff"
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

// VoiceOrb — fixed-size, self-centering canvas that fades in/out with Framer Motion.
// `state` drives the motion via a ref; `analyserRef` supplies the live mic tap.
export default function VoiceOrb({ state, analyserRef }) {
  const stateRef = useRef(state); // read by useFrame every frame

  // Keep the frame loop's view of the assistant state current
  stateRef.current = state;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto h-48 w-48 [&_canvas]:!h-full [&_canvas]:!w-full"
      aria-hidden="true"
    >
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 3.2], fov: 40 }}>
        {/* Procedural studio environment, baked ONCE (frames={1}) into a tiny
            env map — no remote assets, near-zero per-frame cost */}
        <Environment resolution={32} frames={1}>
          <Lightformer intensity={1.2} position={[0, 3, 2]} scale={[4, 2, 1]} />
          <Lightformer intensity={0.8} position={[-3, 1, 2]} scale={[2, 3, 1]} />
          <Lightformer intensity={0.6} position={[3, -1, 2]} scale={[2, 2, 1]} color="#dff2e8" />
          <Lightformer intensity={0.5} position={[0, -3, -2]} scale={[4, 2, 1]} />
        </Environment>
        {/* Soft fill + key light for visible highlights and shadow depth */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        {/* drei Float adds a gentle idle bob so the orb never feels frozen */}
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.35}>
          <ReactiveOrb stateRef={stateRef} analyserRef={analyserRef} />
        </Float>
      </Canvas>
    </motion.div>
  );
}
