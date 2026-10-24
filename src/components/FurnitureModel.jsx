import React from 'react';

export function FurnitureModel({ item, isSelected, isColliding, isHovered }) {
  const mainColor = isColliding ? '#ef4444' : isSelected ? '#38bdf8' : isHovered ? '#f59e0b' : null;

  return (
    <group>
      {/* SOFA */}
      {item.type === 'sofa' && (
        <group>
          <mesh position={[0, 0.22, 0]} castShadow receiveShadow><boxGeometry args={[1.9, 0.35, 0.85]} /><meshStandardMaterial color={mainColor || '#334155'} roughness={0.7} /></mesh>
          <mesh position={[0, 0.65, -0.35]} castShadow receiveShadow><boxGeometry args={[1.9, 0.55, 0.2]} /><meshStandardMaterial color={mainColor || '#1e293b'} roughness={0.7} /></mesh>
          <mesh position={[-0.95, 0.4, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.5, 0.9]} /><meshStandardMaterial color={mainColor || '#1e293b'} /></mesh>
          <mesh position={[0.95, 0.4, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.5, 0.9]} /><meshStandardMaterial color={mainColor || '#1e293b'} /></mesh>
        </group>
      )}

      {/* COFFEE TABLE */}
      {item.type === 'tisch' && (
        <group>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow><boxGeometry args={[1.2, 0.05, 0.7]} /><meshStandardMaterial color={mainColor || '#78350f'} roughness={0.3} /></mesh>
          <mesh position={[-0.5, 0.2, -0.25]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh position={[0.5, 0.2, -0.25]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh position={[-0.5, 0.2, 0.25]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh position={[0.5, 0.2, 0.25]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
        </group>
      )}

      {/* BED */}
      {item.type === 'bed' && (
        <group>
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow><boxGeometry args={[1.8, 0.4, 2.0]} /><meshStandardMaterial color={mainColor || '#e2e8f0'} roughness={0.8} /></mesh>
          <mesh position={[0, 0.6, -0.95]} castShadow receiveShadow><boxGeometry args={[1.8, 0.7, 0.15]} /><meshStandardMaterial color={mainColor || '#475569'} roughness={0.5} /></mesh>
        </group>
      )}

      {/* KITCHEN COUNTER */}
      {item.type === 'kitchen' && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow><boxGeometry args={[2.0, 0.9, 0.7]} /><meshStandardMaterial color={mainColor || '#0f172a'} roughness={0.4} /></mesh>
          <mesh position={[0, 0.91, 0]} castShadow receiveShadow><boxGeometry args={[2.02, 0.04, 0.72]} /><meshStandardMaterial color="#f8fafc" roughness={0.2} /></mesh>
        </group>
      )}

      {/* OVEN RANGE UNIT */}
      {item.type === 'oven' && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow><boxGeometry args={[1.2, 0.9, 0.7]} /><meshStandardMaterial color={mainColor || '#1e293b'} roughness={0.3} /></mesh>
          <mesh position={[0, 0.91, 0]} castShadow receiveShadow><boxGeometry args={[1.22, 0.04, 0.72]} /><meshStandardMaterial color="#334155" roughness={0.2} /></mesh>
          {/* Glass Oven Door Window */}
          <mesh position={[0, 0.45, 0.36]}><boxGeometry args={[0.7, 0.5, 0.02]} /><meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} /></mesh>
          {/* Burners on top */}
          <mesh position={[-0.3, 0.93, -0.15]}><cylinderGeometry args={[0.1, 0.1, 0.02]} /><meshStandardMaterial color="#000000" metalness={0.8} /></mesh>
          <mesh position={[0.3, 0.93, -0.15]}><cylinderGeometry args={[0.1, 0.1, 0.02]} /><meshStandardMaterial color="#000000" metalness={0.8} /></mesh>
        </group>
      )}

      {/* DISHWASHER */}
      {item.type === 'dishwasher' && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow><boxGeometry args={[1.0, 0.9, 0.7]} /><meshStandardMaterial color={mainColor || '#cbd5e1'} roughness={0.2} metalness={0.5} /></mesh>
          <mesh position={[0, 0.88, 0.36]}><boxGeometry args={[0.3, 0.04, 0.02]} /><meshStandardMaterial color="#0f172a" metalness={0.9} /></mesh>
        </group>
      )}

      {/* KITCHEN SINK */}
      {item.type === 'kitchenSink' && (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow><boxGeometry args={[1.6, 0.9, 0.7]} /><meshStandardMaterial color={mainColor || '#1e293b'} roughness={0.4} /></mesh>
          <mesh position={[0, 0.91, 0]} castShadow receiveShadow><boxGeometry args={[1.62, 0.04, 0.72]} /><meshStandardMaterial color="#e2e8f0" roughness={0.2} /></mesh>
          <mesh position={[0, 0.93, 0]}><boxGeometry args={[0.7, 0.02, 0.4]} /><meshStandardMaterial color="#64748b" metalness={0.9} /></mesh>
          <mesh position={[0, 1.05, -0.25]}><cylinderGeometry args={[0.02, 0.02, 0.2]} /><meshStandardMaterial color="#cbd5e1" metalness={0.9} /></mesh>
        </group>
      )}

      {/* UPPER CABINET */}
      {item.type === 'wallCabinet' && (
        <group position={[0, 1.8, 0]}>
          <mesh castShadow receiveShadow><boxGeometry args={[1.8, 0.6, 0.35]} /><meshStandardMaterial color={mainColor || '#334155'} roughness={0.5} /></mesh>
        </group>
      )}

      {/* DETAILED WARDROBE (Multi-panel doors & metal handles) */}
      {item.type === 'wardrobe' && (
        <group>
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow><boxGeometry args={[1.2, 1.9, 0.55]} /><meshStandardMaterial color={mainColor || '#334155'} roughness={0.4} /></mesh>
          {/* Center door split line */}
          <mesh position={[0, 0.95, 0.28]}><boxGeometry args={[0.01, 1.85, 0.01]} /><meshStandardMaterial color="#0f172a" /></mesh>
          {/* Metal Handles */}
          <mesh position={[-0.08, 0.95, 0.29]}><boxGeometry args={[0.02, 0.3, 0.02]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} /></mesh>
          <mesh position={[0.08, 0.95, 0.29]}><boxGeometry args={[0.02, 0.3, 0.02]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} /></mesh>
        </group>
      )}

      {/* HIGH BAR STOOL */}
      {item.type === 'barStool' && (
        <group>
          <mesh position={[0, 0.68, 0]} castShadow receiveShadow><boxGeometry args={[0.38, 0.08, 0.38]} /><meshStandardMaterial color={mainColor || '#334155'} roughness={0.6} /></mesh>
          <mesh position={[-0.14, 0.34, -0.14]} castShadow><cylinderGeometry args={[0.015, 0.01, 0.68]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
          <mesh position={[0.14, 0.34, -0.14]} castShadow><cylinderGeometry args={[0.015, 0.01, 0.68]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
          <mesh position={[-0.14, 0.34, 0.14]} castShadow><cylinderGeometry args={[0.015, 0.01, 0.68]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
          <mesh position={[0.14, 0.34, 0.14]} castShadow><cylinderGeometry args={[0.015, 0.01, 0.68]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
        </group>
      )}

      {/* COZY LOUNGE ARMCHAIR */}
      {item.type === 'chair' && (
        <group>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow><boxGeometry args={[0.8, 0.3, 0.8]} /><meshStandardMaterial color={mainColor || '#475569'} roughness={0.7} /></mesh>
          <mesh position={[0, 0.55, -0.3]} castShadow receiveShadow><boxGeometry args={[0.8, 0.5, 0.2]} /><meshStandardMaterial color={mainColor || '#334155'} roughness={0.7} /></mesh>
          <mesh position={[-0.35, 0.38, 0]}><boxGeometry args={[0.1, 0.35, 0.75]} /><meshStandardMaterial color={mainColor || '#334155'} /></mesh>
          <mesh position={[0.35, 0.38, 0]}><boxGeometry args={[0.1, 0.35, 0.75]} /><meshStandardMaterial color={mainColor || '#334155'} /></mesh>
        </group>
      )}

      {/* FLOOR LAMP */}
      {item.type === 'lamp' && (
        <group>
          <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.25, 0.25, 0.04]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.02, 0.02, 1.8]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} /></mesh>
          <mesh position={[0, 1.7, 0]}><coneGeometry args={[0.3, 0.4, 16]} /><meshStandardMaterial color="#f8fafc" roughness={0.2} emissive="#fef08a" emissiveIntensity={0.5} /></mesh>
        </group>
      )}

      {/* AREA RUG */}
      {item.type === 'rug' && (
        <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.5, 3.2]} />
          <meshStandardMaterial color={mainColor || '#94a3b8'} roughness={0.9} />
        </mesh>
      )}

      {/* FRAMED WALL ART / POSTER */}
      {item.type === 'poster' && (
        <group position={[0, 1.4, 0]}>
          {/* Outer Frame */}
          <mesh castShadow><boxGeometry args={[0.9, 1.2, 0.04]} /><meshStandardMaterial color="#0f172a" roughness={0.3} /></mesh>
          {/* Inner Canvas / Poster Print */}
          <mesh position={[0, 0, 0.022]}><boxGeometry args={[0.82, 1.12, 0.01]} /><meshStandardMaterial color="#f8fafc" roughness={0.8} /></mesh>
          {/* Abstract Art Shape inside poster */}
          <mesh position={[0, 0.1, 0.028]}><boxGeometry args={[0.5, 0.5, 0.01]} /><meshStandardMaterial color="#38bdf8" roughness={0.5} /></mesh>
          <mesh position={[0, -0.3, 0.028]}><boxGeometry args={[0.6, 0.2, 0.01]} /><meshStandardMaterial color="#f43f5e" roughness={0.5} /></mesh>
        </group>
      )}
    </group>
  );
}
