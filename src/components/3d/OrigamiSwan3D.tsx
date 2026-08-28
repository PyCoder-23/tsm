import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCw, ZoomIn, Sparkles } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface OrigamiSwan3DProps {
  onInteract?: () => void;
}

export const OrigamiSwan3D: React.FC<OrigamiSwan3DProps> = ({ onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [foldedPiecesCount] = useState(384);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 11);
    camera.lookAt(0, 1.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting (Warm museum gallery spotlights)
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.9);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffebd2, 2.8, 25, Math.PI / 4, 0.4, 1);
    keySpot.position.set(6, 12, 8);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const rimLight = new THREE.DirectionalLight(0x64dfdf, 1.2);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const bottomFill = new THREE.PointLight(0xe2b36f, 0.6, 15);
    bottomFill.position.set(0, -2, 4);
    scene.add(bottomFill);

    // Swan Group
    const swanGroup = new THREE.Group();
    groupRef.current = swanGroup;
    scene.add(swanGroup);

    // Shared modular paper geometry (Triangular Origami Unit)
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(-0.25, 0);
    triangleShape.lineTo(0.25, 0);
    triangleShape.lineTo(0, 0.5);
    triangleShape.closePath();

    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const unitGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);

    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5ba23, // Warm golden-yellow matching Sonal's real origami swan
      roughness: 0.5,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    materialsRef.current.push(paperMaterial);

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Deep amber edge folds
      roughness: 0.4,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    materialsRef.current.push(accentMaterial);

    const beakMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Pointed golden cone beak
      roughness: 0.35,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    materialsRef.current.push(beakMaterial);

    // Procedurally assemble modular origami swan rings
    // 1. Base Rings (Bowl shape)
    const baseRings = 7;
    for (let r = 0; r < baseRings; r++) {
      const radius = 1.3 + Math.sin((r / baseRings) * Math.PI) * 0.7;
      const count = 24;
      const y = r * 0.28;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const mesh = new THREE.Mesh(unitGeometry, r === 0 || r === 3 ? accentMaterial : paperMaterial);
        mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        mesh.rotation.y = -angle + Math.PI / 2;
        mesh.rotation.x = -0.3 + (r * 0.05);
        mesh.scale.set(1, 1, 1);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        swanGroup.add(mesh);
      }
    }

    // 2. Wings (Stepped arching triangular layers)
    const wingSteps = 9;
    for (let side of [-1, 1]) {
      for (let step = 0; step < wingSteps; step++) {
        const unitsInRow = wingSteps - step;
        const y = 1.8 + step * 0.32;
        const zSpread = (step * 0.28);
        for (let u = 0; u < unitsInRow; u++) {
          const x = side * (1.6 + step * 0.22 + (u * 0.12));
          const z = (u - unitsInRow / 2) * 0.45 - (zSpread * 0.4);
          const mesh = new THREE.Mesh(unitGeometry, u === 0 ? accentMaterial : paperMaterial);
          mesh.position.set(x, y, z);
          mesh.rotation.z = side * (-0.5 - (step * 0.08));
          mesh.rotation.y = side * 0.3;
          mesh.castShadow = true;
          swanGroup.add(mesh);
        }
      }
    }

    // 3. Graceful Neck and Pointed Beak
    const neckSegments = 16;
    for (let n = 0; n < neckSegments; n++) {
      const t = n / (neckSegments - 1);
      // S-curve for the swan neck
      const ny = 1.8 + Math.sin(t * Math.PI * 0.85) * 2.8 + (t * 0.4);
      const nz = 1.6 + Math.cos(t * Math.PI * 0.85) * 1.5 - (t * 0.6);
      const nx = 0;

      const isBeak = n >= neckSegments - 2;
      const mesh = new THREE.Mesh(
        unitGeometry,
        isBeak ? beakMaterial : paperMaterial
      );
      mesh.position.set(nx, ny, nz);
      mesh.rotation.x = 0.5 + Math.sin(t * Math.PI) * 1.2;
      mesh.scale.set(0.9 - t * 0.2, 0.9 - t * 0.2, 0.9 - t * 0.2);
      mesh.castShadow = true;
      swanGroup.add(mesh);
    }

    // Sharp Pointed Beak Geometry at the end of the mouth
    const beakConeGeo = new THREE.ConeGeometry(0.16, 0.48, 4);
    const beakConeMesh = new THREE.Mesh(beakConeGeo, beakMaterial);
    beakConeMesh.position.set(0, 4.35, 1.45);
    beakConeMesh.rotation.x = Math.PI / 2.3;
    beakConeMesh.castShadow = true;
    swanGroup.add(beakConeMesh);

    // 4. Tail Feathers
    for (let t = 0; t < 6; t++) {
      const mesh = new THREE.Mesh(unitGeometry, paperMaterial);
      mesh.position.set(0, 1.8 + t * 0.3, -1.6 - t * 0.25);
      mesh.rotation.x = -0.8 - t * 0.1;
      mesh.castShadow = true;
      swanGroup.add(mesh);
    }

    // Minimalist Pedestal Plinth
    const plinthGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.3, 48);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x182028,
      roughness: 0.8,
      metalness: 0.1,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = -0.15;
    plinth.receiveShadow = true;
    scene.add(plinth);

    // Subtle plinth glow ring
    const ringGeo = new THREE.RingGeometry(2.35, 2.42, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe2b36f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Mouse Interaction / Orbit controls simulation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      soundEngine.playInspect();
      if (onInteract) onInteract();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !swanGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      swanGroup.rotation.y += deltaX * 0.01;
      swanGroup.rotation.x = Math.max(-0.4, Math.min(0.4, swanGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && swanGroup && !isDragging) {
        swanGroup.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      unitGeometry.dispose();
      plinthGeo.dispose();
      ringGeo.dispose();
      if (container && domElement) {
        container.removeChild(domElement);
      }
    };
  }, [autoRotate, onInteract]);

  // Wireframe toggle effect
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = isWireframe;
    });
  }, [isWireframe]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] rounded-2xl bg-gradient-to-b from-[#13181f] via-[#0f141a] to-[#0a0d11] border border-white/10 overflow-hidden shadow-2xl group">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Blueprint Grid Overlay in wireframe mode */}
      {isWireframe && (
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      )}

      {/* Top Spec Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-museum-accent/15 border border-museum-accent/30 text-museum-accent text-xs font-mono font-medium tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            MASTERPIECE ARTIFACT
          </span>
          <span className="text-white/40 text-xs font-mono hidden sm:inline-block">
            CAT: #SWAN-384-TRI
          </span>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={() => {
              setIsWireframe(!isWireframe);
              soundEngine.playInspect();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 border ${
              isWireframe
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
            title="Toggle GMD Architectural Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isWireframe ? 'CAD WIREFRAME' : 'ORIGAMI SOLID'}</span>
          </button>

          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              soundEngine.playInspect();
            }}
            className={`p-1.5 rounded-lg text-xs font-mono transition-all border ${
              autoRotate
                ? 'bg-museum-accent/20 text-museum-accent border-museum-accent/40'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
            title="Toggle Rotation"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>
      </div>

      {/* Bottom Architectural HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono space-y-1">
          <div className="text-white/40">STRUCTURAL COMPOSITION</div>
          <div className="text-museum-text font-semibold flex items-center space-x-2">
            <span className="text-museum-accent">{foldedPiecesCount}</span>
            <span>Triangular Paper Units</span>
          </div>
          <div className="text-[10px] text-white/50">Geometry: Repeated Modular Origami</div>
        </div>

        <div className="text-right text-[11px] font-mono text-white/40 hidden sm:block">
          <div className="flex items-center justify-end space-x-1 text-white/60">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>DRAG TO ORBIT 360°</span>
          </div>
          <div>ARTIST: SONAL</div>
        </div>
      </div>
    </div>
  );
};
