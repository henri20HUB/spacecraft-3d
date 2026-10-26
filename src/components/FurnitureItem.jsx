import React, { useRef, useState } from 'react';
import { PivotControls } from '@react-three/drei';
import { FurnitureModel } from './FurnitureModel';
import * as THREE from 'three';

export function FurnitureItem({ item, onSelect, isSelected, onUpdatePosition, isColliding, isReadOnly, gridSize, snapToGrid }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const rotationRad = ((item.rotation || 0) * Math.PI) / 180;

  const handleClick = (e) => {
    if (isReadOnly) return;
    e.stopPropagation();
    onSelect(item.id, e.shiftKey);
  };

  if (!isReadOnly && isSelected) {
    return (
      <group ref={groupRef} position={[item.x, 0, item.z]} rotation={[0, rotationRad, 0]}>
        <PivotControls
          depthTest={false}
          anchor={[0, 0, 0]}
          scale={0.75}
          lineWidth={2.5}
          axisColors={isColliding ? ['#ef4444', '#ef4444', '#ef4444'] : ['#6366f1', '#10b981', '#06b6d4']}
          onDrag={(matrix) => {
            const position = new THREE.Vector3();
            const rotation = new THREE.Euler();
            const scale = new THREE.Vector3();
            matrix.decompose(position, rotation, scale);

            let targetX = item.x + position.x;
            let targetZ = item.z + position.z;

            if (isNaN(targetX) || isNaN(targetZ) || !isFinite(targetX) || !isFinite(targetZ)) return;

            // Live grid snapping preview
            if (snapToGrid && item.type !== 'poster') {
              const step = gridSize || 0.25;
              targetX = Math.round(targetX / step) * step;
              targetZ = Math.round(targetZ / step) * step;
            }

            // Move imperatively during drag to prevent React re-render loops
            if (groupRef.current) {
              groupRef.current.position.set(targetX - item.x, 0, targetZ - item.z);
            }
          }}
          onDragEnd={(matrix) => {
            const position = new THREE.Vector3();
            const rotation = new THREE.Euler();
            const scale = new THREE.Vector3();
            matrix.decompose(position, rotation, scale);

            let finalX = item.x + position.x;
            let finalZ = item.z + position.z;
            let finalRot = (item.rotation || 0) + (rotation.y * 180) / Math.PI;

            if (snapToGrid && item.type !== 'poster') {
              const step = gridSize || 0.25;
              finalX = Math.round(finalX / step) * step;
              finalZ = Math.round(finalZ / step) * step;
            }

            if (groupRef.current) {
              groupRef.current.position.set(0, 0, 0);
            }

            onUpdatePosition(item.id, finalX, finalZ, finalRot);
          }}
        >
          <group 
            onClick={handleClick}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={() => setHovered(false)}
          >
            <FurnitureModel item={item} isSelected={isSelected} isColliding={isColliding} isHovered={hovered} />
          </group>
        </PivotControls>
      </group>
    );
  }

  return (
    <group 
      position={[item.x, 0, item.z]} 
      rotation={[0, rotationRad, 0]}
      onClick={handleClick}
      onPointerOver={(e) => { if (!isReadOnly) { e.stopPropagation(); setHovered(true); } }}
      onPointerOut={() => { if (!isReadOnly) setHovered(false); }}
    >
      <FurnitureModel item={item} isSelected={isSelected} isColliding={isColliding} isHovered={hovered} />
    </group>
  );
}
