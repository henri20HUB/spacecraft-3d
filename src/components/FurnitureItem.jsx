import React, { useState } from 'react';
import { PivotControls } from '@react-three/drei';
import { FurnitureModel } from './FurnitureModel';

export function FurnitureItem({ item, onSelect, isSelected, onUpdatePosition, isColliding, isReadOnly }) {
  const [hovered, setHovered] = useState(false);
  const rotationRad = ((item.rotation || 0) * Math.PI) / 180;

  const handleClick = (e) => {
    if (isReadOnly) return;
    e.stopPropagation();
    onSelect(item.id, e.shiftKey);
  };

  if (!isReadOnly && isSelected) {
    return (
      <group position={[item.x, 0, item.z]}>
        <PivotControls
          activeAxes={[true, false, true]}
          depthTest={false}
          anchor={[0, 0, 0]}
          scale={0.75}
          lineWidth={2.5}
          disableRotation={true}
          axisColors={isColliding ? ['#ef4444', '#ef4444', '#ef4444'] : ['#6366f1', '#10b981', '#06b6d4']}
          onDrag={(matrix) => {
            // Extract exact translation vector relative to the item's origin
            const deltaX = matrix.elements[12];
            const deltaZ = matrix.elements[14];
            onUpdatePosition(item.id, item.x + deltaX, item.z + deltaZ);
          }}
        >
          <group 
            rotation={[0, rotationRad, 0]} 
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
