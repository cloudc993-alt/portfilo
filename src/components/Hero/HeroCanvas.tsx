import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Pre-allocated math helpers outside render loop (zero GC)
const _targetEuler = new THREE.Euler();

function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

interface SceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile: boolean;
  isSoftwareGl: boolean;
}

function FuturisticCoreAssembly({
  mouseRef,
  scrollProgressRef,
  isMobile,
  isSoftwareGl,
}: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  // Procedural particle cloud
  const particleCount = isMobile ? 160 : isSoftwareGl ? 220 : 380;
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.6 + Math.random() * 4.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [particleCount]);

  // Procedural floating geometric shard positions
  const shards = useMemo(
    () => [
      { pos: [-2.4, 1.35, -0.6] as [number, number, number], scale: 0.24 },
      { pos: [2.25, -1.2, -0.3] as [number, number, number], scale: 0.2 },
      { pos: [-1.8, -1.5, 0.5] as [number, number, number], scale: 0.16 },
      { pos: [1.9, 1.55, -0.8] as [number, number, number], scale: 0.22 },
      { pos: [0.35, 2.15, -1.1] as [number, number, number], scale: 0.14 },
    ],
    [],
  );

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const scrollShift = scrollProgressRef.current;

    if (groupRef.current) {
      _targetEuler.set(my * 0.32 + scrollShift * 0.4, mx * 0.45 + t * 0.12, 0);
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        _targetEuler.x,
        3.5,
        delta,
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        _targetEuler.y,
        3.5,
        delta,
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        -scrollShift * 1.1,
        4,
        delta,
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.28;
      ring1Ref.current.rotation.x = Math.PI * 0.34 + Math.sin(t * 0.4) * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.22;
      ring2Ref.current.rotation.y = Math.PI * 0.28 + Math.cos(t * 0.35) * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.16;
      ring3Ref.current.rotation.y -= delta * 0.18;
    }
    if (latticeRef.current) {
      latticeRef.current.rotation.y -= delta * 0.15;
      latticeRef.current.rotation.z += delta * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04 + mx * 0.12;
      particlesRef.current.rotation.x = my * 0.08;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, mx * 0.4, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, my * 0.28, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });

  // Shift focal core subtly left-of-center on desktop so it sits cleanly between hero text and portrait
  const assemblyPosition: [number, number, number] = isMobile ? [0, 0.25, -1.2] : [-0.4, 0, -0.4];

  return (
    <>
      <fog attach="fog" args={['#080808', 6, 16]} />
      <hemisphereLight args={['#ff7a24', '#080808', 0.45]} />
      <directionalLight position={[4, 5, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-2.5, -1.5, 3]} intensity={5.5} color="#FF2B1C" distance={10} decay={2} />
      <pointLight position={[2.5, 2.2, 2]} intensity={3.8} color="#FF7A24" distance={9} decay={2} />

      <Environment resolution={128}>
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#ffffff"
          scale={[6, 2, 1]}
          position={[0, 4, 3]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          color="#FF2B1C"
          scale={4}
          position={[-4, 1, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#FF7A24"
          scale={[4, 4, 1]}
          position={[4, -2, 2]}
          target={[0, 0, 0]}
        />
      </Environment>

      <group ref={groupRef} position={assemblyPosition}>
        <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.45}>
          {/* 1. Primary Obsidian Metallic Core Sphere */}
          <mesh>
            <icosahedronGeometry args={[1.05, 4]} />
            <meshPhysicalMaterial
              color="#121212"
              metalness={0.92}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.12}
              emissive="#4a0704"
              emissiveIntensity={0.65}
            />
          </mesh>

          {/* 2. Glowing Fiery Red Inner Core Pulse */}
          <mesh scale={0.78}>
            <sphereGeometry args={[1, 28, 28]} />
            <meshStandardMaterial
              color="#FF2B1C"
              emissive="#FF2B1C"
              emissiveIntensity={2.2}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>

          {/* 3. Outer Metallic Geodesic Wireframe Lattice */}
          <mesh ref={latticeRef} scale={1.24}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#FF5A1F"
              emissive="#FF2B1C"
              emissiveIntensity={1.4}
              wireframe
              transparent
              opacity={0.72}
            />
          </mesh>

          {/* 4. Articulated Metallic Orbital Ring 1 */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.68, 0.026, 16, 96]} />
            <meshStandardMaterial
              color="#c8c8c8"
              metalness={0.95}
              roughness={0.14}
              emissive="#FF2B1C"
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* 5. Articulated Fire Orange Orbital Ring 2 */}
          <mesh ref={ring2Ref}>
            <torusGeometry args={[2.05, 0.018, 16, 96]} />
            <meshStandardMaterial
              color="#FF7A24"
              emissive="#FF5A1F"
              emissiveIntensity={1.6}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>

          {/* 6. Outer Structural Titanium Ring 3 */}
          {!isMobile && (
            <mesh ref={ring3Ref} rotation={[Math.PI * 0.45, Math.PI * 0.15, 0]}>
              <torusGeometry args={[2.42, 0.012, 12, 96]} />
              <meshStandardMaterial
                color="#737373"
                metalness={0.9}
                roughness={0.22}
                transparent
                opacity={0.65}
              />
            </mesh>
          )}

          {/* 7. Floating Metallic Geometric Shards */}
          {shards.map((shard, idx) => (
            <mesh key={idx} position={shard.pos} scale={shard.scale}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#1b1b1b' : '#FF5A1F'}
                metalness={0.9}
                roughness={0.2}
                emissive={idx % 2 === 0 ? '#FF2B1C' : '#FF7A24'}
                emissiveIntensity={idx % 2 === 0 ? 0.45 : 0.9}
              />
            </mesh>
          ))}
        </Float>
      </group>

      {/* Ambient Ember Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FF5A1F"
          size={isMobile ? 0.032 : 0.028}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export function HeroCanvas() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollProgressRef.current = Math.min(window.scrollY / window.innerHeight, 1);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (prefersReduced || webglFailed) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-radial-glow absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF2B1C]/20" />
        <div className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF7A24]/10" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="hero-radial-glow absolute inset-0" />
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={isSoftwareGl ? 1 : isMobile ? [1, 1.35] : [1, 1.85]}
        gl={{
          antialias: !isSoftwareGl,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setWebglFailed(true);
          });
          canvas.addEventListener('webglcontextrestored', () => {
            setWebglFailed(false);
          });
        }}
      >
        <FuturisticCoreAssembly
          mouseRef={mouseRef}
          scrollProgressRef={scrollProgressRef}
          isMobile={isMobile}
          isSoftwareGl={isSoftwareGl}
        />
      </Canvas>
    </div>
  );
}
