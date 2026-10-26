import React, { useRef, useState } from 'react';
import { PivotControls } from '@react-three/drei';
import { FurnitureModel } from './FurnitureModel';
import * as THREE from 'three';

export function FurnitureItem({ item, onSelect, isSelected, onUpdatePosition, isColliding, isReadOnly }) {
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
          activeAxes={[true, false, true]}
          depthTest={false}
          anchor={[0, 0, 0]}
          scale={0.75}
          lineWidth={2.5}
          disableRotation={false}
          axisColors={isColliding ? ['#ef4444', '#ef4444', '#ef4444'] : ['#6366f1', '#10b981', '#06b6d4']}
          onDrag={(matrix) => {
            // Apply matrix directly to ref during drag to prevent React re-render feedback loops
            if (groupRef.current) {
              groupRef.current.matrix.copy(matrix);
              groupRef.current.matrixAutoUpdate = false;
            }
          }}
          onDragEnd={() => {
            if (groupRef.current) {
              groupRef.current.matrixAutoUpdate = true;
              const position = new THREE.Vector3();
              const rotation = new THREE.Euler();
              const scale = new THREE.Vector3();
              groupRef.current.matrix.decompose(position, rotation, scale);

              const finalX = item.x + position.x;
              const finalZ = item.z + position.z;
              const finalRot = (item.rotation || 0) + (rotation.y * 180) / Math.PI;

              // Reset local ref matrix so React state position takes over cleanly
              groupRef.current.position.set(0, 0, 0);
              groupRef.current.rotation.set(0, 0, 0);
              groupRef.current.scale.set(1, 1, 1);
              groupRef.current.updateMatrix();

              onUpdatePosition(item.id, finalX, finalZ, finalRot);
            }
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
