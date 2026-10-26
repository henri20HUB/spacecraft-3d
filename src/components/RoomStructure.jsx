import React, { useMemo } from 'react';
import * as THREE from 'three';

export function RoomStructure({ room, gridSize = 0.25, showRoomGrid = false }) {
  const wallHeight = 2.4;
  const wallThickness = 0.12;
  const { width, length, hasWindow, windowWidth = 1.6, windowHeight = 1.2 } = room;

  // Generate wood floor planks
  const plankGrooves = useMemo(() => {
    const lines = [];
    const plankWidth = 0.2;
    for (let x = -width / 2 + plankWidth; x < width / 2; x += plankWidth) {
      lines.push(
        <lineSegments key={`plank-${x}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([x, 0.006, -length / 2, x, 0.006, length / 2]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#5c3a21" transparent opacity={0.35} linewidth={1} />
        </lineSegments>
      );
    }
    return lines;
  }, [width, length]);

  // Generate precise square grid lines for snapping
  const squareGridLines = useMemo(() => {
    if (!showRoomGrid) return null;
    const lines = [];
    const step = gridSize;

    // Lines parallel to Z axis
    for (let x = -width / 2; x <= width / 2; x += step) {
      lines.push(
        <lineSegments key={`grid-x-${x}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([x, 0.008, -length / 2, x, 0.008, length / 2]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </lineSegments>
      );
    }

    // Lines parallel to X axis
    for (let z = -length / 2; z <= length / 2; z += step) {
      lines.push(
        <lineSegments key={`grid-z-${z}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-width / 2, 0.008, z, width / 2, 0.008, z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </lineSegments>
      );
    }
    return lines;
  }, [width, length, gridSize, showRoomGrid]);

  return (
    <group>
      {/* Rich Darker Hardwood Floor Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial 
          color="#9e6f47" 
          roughness={0.45} 
          metalness={0.03} 
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Individual Plank Line Details */}
      {plankGrooves}

      {/* Square Snapping Grid Overlay */}
      {squareGridLines}

      {/* Baseboard Rim */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[width + 0.15, 0.1, length + 0.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Back Wall with Window */}
      <group position={[0, wallHeight / 2, -length / 2]}>
        {hasWindow ? (
          <>
            <mesh position={[-(width / 2 + windowWidth / 2) / 2, 0, 0]}>
              <boxGeometry args={[width / 2 - windowWidth / 2, wallHeight, wallThickness]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
            </mesh>
            <mesh position={[(width / 2 + windowWidth / 2) / 2, 0, 0]}>
              <boxGeometry args={[width / 2 - windowWidth / 2, wallHeight, wallThickness]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
            </mesh>
            <mesh position={[0, (wallHeight + windowHeight) / 4, 0]}>
              <boxGeometry args={[windowWidth, (wallHeight - windowHeight) / 2, wallThickness]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
            </mesh>
            <mesh position={[0, -(wallHeight + windowHeight) / 4, 0]}>
              <boxGeometry args={[windowWidth, (wallHeight - windowHeight) / 2, wallThickness]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
            </mesh>

            {/* Glass Pane */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[windowWidth - 0.04, windowHeight - 0.04, 0.02]} />
              <meshStandardMaterial color="#7dd3fc" transparent opacity={0.3} roughness={0.1} />
            </mesh>

            {/* Window Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[windowWidth + 0.04, windowHeight + 0.04, 0.06]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} />
            </mesh>
          </>
        ) : (
          <mesh receiveShadow>
            <boxGeometry args={[width, wallHeight, wallThickness]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
          </mesh>
        )}
      </group>

      {/* Left Wall */}
      <mesh position={[-width / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[length, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
    </group>
  );
}
