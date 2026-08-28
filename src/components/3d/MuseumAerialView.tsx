import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Eye, Compass } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface MuseumAerialViewProps {
  onReturnToEntrance?: () => void;
}

export const MuseumAerialView: React.FC<MuseumAerialViewProps> = ({ onReturnToEntrance }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);
    scene.fog = new THREE.FogExp2(0x0a0e14, 0.025);

    // Camera (Isometric perspective)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 1, 1000);
    camera.position.set(28, 32, 28);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting (Twilight sunset glow)
    const ambientLight = new THREE.AmbientLight(0x232d3f, 1.2);
    scene.add(ambientLight);

    const sunsetLight = new THREE.DirectionalLight(0xe2b36f, 2.5);
    sunsetLight.position.set(20, 25, 10);
    sunsetLight.castShadow = true;
    scene.add(sunsetLight);

    const blueRim = new THREE.DirectionalLight(0x38bdf8, 1.0);
    blueRim.position.set(-20, 15, -15);
    scene.add(blueRim);

    // Ground Plane (City Plaza Grid)
    const groundGeo = new THREE.PlaneGeometry(120, 120, 30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0e141c,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Lines on ground
    const gridHelper = new THREE.GridHelper(100, 50, 0x2a6f97, 0x182432);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Main Museum Architectural Structure (Subtle "S" Flow)
    const museumGroup = new THREE.Group();
    groupRef.current = museumGroup;
    scene.add(museumGroup);

    // Concrete & Glass Materials
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      roughness: 0.7,
      metalness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x64dfdf,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.5,
      emissive: 0x0f2b36,
    });

    const woodTerraceMat = new THREE.MeshStandardMaterial({
      color: 0x8b6540,
      roughness: 0.6,
    });

    const glowInteriorMat = new THREE.MeshBasicMaterial({
      color: 0xffdb99,
    });

    // 1. Top Arch of the "S" (North Gallery Wings)
    const northWing1 = new THREE.Mesh(new THREE.BoxGeometry(10, 3.5, 4.5), concreteMat);
    northWing1.position.set(0, 1.75, -8);
    northWing1.castShadow = true;
    northWing1.receiveShadow = true;
    museumGroup.add(northWing1);

    const northWing2 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.2, 8), concreteMat);
    northWing2.position.set(-4.5, 2.1, -4.5);
    northWing2.castShadow = true;
    northWing2.receiveShadow = true;
    museumGroup.add(northWing2);

    // Glass Atrium Connectors
    const glassAtrium1 = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 4), glassMat);
    glassAtrium1.position.set(-2, 1.5, -4.5);
    museumGroup.add(glassAtrium1);

    // 2. Central Diagonal Pivot of the "S" (Grand Central Corridor & Archive)
    const centralCorridor = new THREE.Mesh(new THREE.BoxGeometry(12, 4.8, 4.8), concreteMat);
    centralCorridor.position.set(0, 2.4, 0);
    centralCorridor.rotation.y = -Math.PI / 4.5;
    centralCorridor.castShadow = true;
    centralCorridor.receiveShadow = true;
    museumGroup.add(centralCorridor);

    // Long Glass Skylight along central corridor
    const skylight = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 1.8), glassMat);
    skylight.position.set(0, 4.9, 0);
    skylight.rotation.y = -Math.PI / 4.5;
    museumGroup.add(skylight);

    // 3. Bottom Arch of the "S" (South Entrance & Rooftop Terrace)
    const southWing1 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.0, 8), concreteMat);
    southWing1.position.set(4.5, 2.0, 4.5);
    southWing1.castShadow = true;
    southWing1.receiveShadow = true;
    museumGroup.add(southWing1);

    const southWing2 = new THREE.Mesh(new THREE.BoxGeometry(10, 3.2, 4.5), concreteMat);
    southWing2.position.set(0, 1.6, 8);
    southWing2.castShadow = true;
    southWing2.receiveShadow = true;
    museumGroup.add(southWing2);

    // Rooftop Garden Pavilion on top of South Wing
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 3.6), woodTerraceMat);
    terrace.position.set(0, 3.3, 8);
    museumGroup.add(terrace);

    // Rooftop Trees & Greenery
    const treeGeo = new THREE.ConeGeometry(0.5, 1.2, 6);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x2d5a3f, roughness: 0.8 });
    for (let i = -3; i <= 3; i += 1.2) {
      const tree = new THREE.Mesh(treeGeo, treeMat);
      tree.position.set(i, 4.0, 7.2 + (Math.sin(i) * 0.4));
      tree.castShadow = true;
      museumGroup.add(tree);
    }

    // Warm Windows / Light Slits
    const windowPositions = [
      { x: 3, y: 1.5, z: -8.1, w: 2.5, h: 1 },
      { x: -4.6, y: 2, z: -2, w: 0.1, h: 2, d: 2 },
      { x: 4.6, y: 1.8, z: 2, w: 0.1, h: 2, d: 2 },
      { x: -2, y: 1.4, z: 8.1, w: 3, h: 0.8 },
    ];
    windowPositions.forEach((wp) => {
      const win = new THREE.Mesh(
        new THREE.BoxGeometry(wp.w, wp.h, wp.d || 0.1),
        glowInteriorMat
      );
      win.position.set(wp.x, wp.y, wp.z);
      museumGroup.add(win);
    });

    // Surrounding Stylized City Skyline Blocks (Low-poly minimalist)
    const cityMat = new THREE.MeshStandardMaterial({
      color: 0x121820,
      roughness: 0.8,
    });
    for (let b = 0; b < 28; b++) {
      const angle = (b / 28) * Math.PI * 2;
      const dist = 28 + (b % 4) * 4;
      const height = 4 + (b % 7) * 3;
      const bGeo = new THREE.BoxGeometry(4 + (b % 3), height, 4 + ((b + 1) % 3));
      const bMesh = new THREE.Mesh(bGeo, cityMat);
      bMesh.position.set(Math.cos(angle) * dist, height / 2, Math.sin(angle) * dist);
      scene.add(bMesh);
    }

    // Interaction / Orbit
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging || !museumGroup) return;
      const dx = e.clientX - prevMouse.x;
      museumGroup.rotation.y += dx * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && museumGroup) {
        museumGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderer.dispose();
      if (container && dom) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] md:h-[600px] rounded-2xl bg-museum-bg border border-white/10 overflow-hidden shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 flex items-center space-x-2 text-xs font-mono">
          <Eye className="w-3.5 h-3.5 text-museum-accent" />
          <span className="text-white font-medium">AERIAL STRUCTURAL SURVEY (1:500)</span>
        </div>

        <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-xs font-mono text-museum-accent flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
          <span>S-CURVE ARCHITECTURAL GEOMETRY</span>
        </div>
      </div>

      {/* Bottom Information Callout */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-museum-accent/30 max-w-md space-y-1.5">
          <div className="text-[10px] font-mono text-museum-accent tracking-widest uppercase">
            ARCHITECTURAL INSIGHT
          </div>
          <div className="text-sm font-medium text-white">
            "The building is not a straight line. It unfolds in layers, turns unexpected corners, and reveals itself only to those who walk the entire path."
          </div>
          <div className="text-[11px] font-mono text-white/50">
            Observation: Museum ground plan subtly forms the letter 'S'.
          </div>
        </div>

        {onReturnToEntrance && (
          <button
            onClick={() => {
              soundEngine.playTransition();
              onReturnToEntrance();
            }}
            className="pointer-events-auto px-5 py-2.5 rounded-xl bg-museum-accent text-museum-bg font-mono text-xs font-semibold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-museum-accent/20 flex items-center space-x-2"
          >
            <span>[ RETURN TO ENTRANCE ]</span>
          </button>
        )}
      </div>
    </div>
  );
};
