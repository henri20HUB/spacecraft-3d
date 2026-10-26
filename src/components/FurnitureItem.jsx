import React, { useState } from 'react';
import { FurnitureModel } from './FurnitureModel';

export function FurnitureItem({ item, onSelect, isSelected, onUpdatePosition, isColliding, isReadOnly }) {
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, z: 0 });
  const rotationRad = ((item.rotation || 0) * Math.PI) / 180;

  const handlePointerDown = (e) => {
    if (isReadOnly) return;
    e.stopPropagation();
    onSelect(item.id, e.shiftKey);
    setIsDragging(true);
    setDragStartOffset({
      x: e.point.x - item.x,
      z: e.point.z - item.z
    });
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isReadOnly) return;
    e.stopPropagation();
    
    // Exact floor raycast calculation - zero matrix accumulation, 100% stable
    const targetX = e.point.x - dragStartOffset.x;
    const targetZ = e.point.z - dragStartOffset.z;

    onUpdatePosition(item.id, targetX, targetZ);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <group 
      position={[item.x, 0, item.z]} 
      rotation={[0, rotationRad, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOver={(e) => { if (!isReadOnly) { e.stopPropagation(); setHovered(true); } }}
      onPointerOut={(e) => { if (!isReadOnly) { setHovered(false); } }}
    >
      <FurnitureModel item={item} isSelected={isSelected} isColliding={isColliding} isHovered={hovered} />

      {/* Visual Selection Ring & Drag Indicator when selected */}
      {!isReadOnly && isSelected && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(item.width || 0.8, 0.8) * 0.5, Math.max(item.width || 0.8, 0.8) * 0.55, 32]} />
          <meshBasicMaterial color={isColliding ? '#ef4444' : '#38bdf8'} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
