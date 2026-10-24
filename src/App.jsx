import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Environment } from '@react-three/drei';
import { 
  Box, Maximize2, Trash2, Sparkles, 
  RotateCw, AlertTriangle, 
  FolderPlus, Edit3, ArrowLeft
} from 'lucide-react';

import { RoomStructure } from './components/RoomStructure';
import { FurnitureItem } from './components/FurnitureItem';

const ITEM_DIMENSIONS = {
  sofa: { width: 1.9, depth: 0.9, height: 0.8 },
  tisch: { width: 1.2, depth: 0.7, height: 0.45 },
  bed: { width: 1.8, depth: 2.0, height: 0.7 },
  kitchen: { width: 2.0, depth: 0.7, height: 0.9 },
  oven: { width: 1.2, depth: 0.7, height: 0.9 },
  dishwasher: { width: 1.0, depth: 0.7, height: 0.9 },
  kitchenSink: { width: 1.6, depth: 0.7, height: 0.9 },
  wallCabinet: { width: 1.8, depth: 0.35, height: 0.6 },
  wardrobe: { width: 1.2, depth: 0.55, height: 1.9 },
  barStool: { width: 0.4, depth: 0.4, height: 0.7 },
  chair: { width: 0.8, depth: 0.8, height: 0.8 },
  lamp: { width: 0.5, depth: 0.5, height: 1.8 },
  rug: { width: 2.5, depth: 3.2, height: 0.01 },
  poster: { width: 0.9, depth: 0.1, height: 1.2 }
};

function checkCollision(itemA, itemB) {
  if (itemA.type === 'poster' || itemB.type === 'poster') return false;

  const dimA = ITEM_DIMENSIONS[itemA.type] || { width: 1, depth: 1 };
  const dimB = ITEM_DIMENSIONS[itemB.type] || { width: 1, depth: 1 };
  const isRotatedA = (itemA.rotation || 0) % 180 !== 0;
  const wA = isRotatedA ? dimA.depth : dimA.width;
  const dA = isRotatedA ? dimA.width : dimA.depth;

  const isRotatedB = (itemB.rotation || 0) % 180 !== 0;
  const wB = isRotatedB ? dimB.depth : dimB.width;
  const dB = isRotatedB ? dimB.width : dimB.depth;

  const boxA = { minX: itemA.x - wA / 2, maxX: itemA.x + wA / 2, minZ: itemA.z - dA / 2, maxZ: itemA.z + dA / 2 };
  const boxB = { minX: itemB.x - wB / 2, maxX: itemB.x + wB / 2, minZ: itemB.z - dB / 2, maxZ: itemB.z + dB / 2 };

  return boxA.minX < boxB.maxX && boxA.maxX > boxB.minX && boxA.minZ < boxB.maxZ && boxA.maxZ > boxB.minZ;
}

function isOutOfBounds(item, room) {
  if (item.type === 'poster') return false;
  const dim = ITEM_DIMENSIONS[item.type] || { width: 1, depth: 1 };
  const isRotated = (item.rotation || 0) % 180 !== 0;
  const w = isRotated ? dim.depth : dim.width;
  const d = isRotated ? dim.width : dim.depth;

  return item.x - w / 2 < -room.width / 2 || item.x + w / 2 > room.width / 2 ||
         item.z - d / 2 < -room.length / 2 || item.z + d / 2 > room.length / 2;
}

export default function App() {
  const [viewMode, setViewMode] = useState('home');
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  const showcaseRooms = [
    {
      id: 'show-living',
      title: 'Living Room',
      width: 5.5, length: 6, hasWindow: true, windowWidth: 2.0,
      furniture: [
        { id: 1, type: 'rug', name: 'Center Living Rug', x: 0, z: -0.2, rotation: 0 },
        { id: 2, type: 'sofa', name: 'Main Sofa', x: 0, z: -1.2, rotation: 0 },
        { id: 3, type: 'tisch', name: 'Coffee Table', x: 0, z: -0.2, rotation: 0 },
        { id: 4, type: 'chair', name: 'Lounge Armchair 1', x: 1.7, z: -0.5, rotation: 225 },
        { id: 5, type: 'chair', name: 'Lounge Armchair 2', x: -1.7, z: -0.5, rotation: 135 },
        { id: 6, type: 'lamp', name: 'Corner Floor Lamp', x: -2.2, z: 2.2, rotation: 0 },
        { id: 7, type: 'wardrobe', name: 'Media Console', x: -1.4, z: 2.4, rotation: 180 },
        { id: 8, type: 'wardrobe', name: 'Bookshelf Wall Unit', x: 1.4, z: 2.4, rotation: 180 },
        { id: 9, type: 'poster', name: 'Modern Wall Art', x: 1.8, z: -2.93, rotation: 0 }
      ]
    },
    {
      id: 'show-bed',
      title: 'Bedroom',
      width: 4.8, length: 5.2, hasWindow: true, windowWidth: 1.6,
      furniture: [
        { id: 10, type: 'rug', name: 'Plush Bed Rug', x: 0, z: -0.4, rotation: 0 },
        { id: 11, type: 'bed', name: 'King Bed', x: 0, z: -1.2, rotation: 0 },
        { id: 12, type: 'wardrobe', name: 'Main Wardrobe', x: 1.8, z: 1.2, rotation: 180 },
        { id: 13, type: 'tisch', name: 'Nightstand Left', x: -1.3, z: -2.0, rotation: 0 },
        { id: 14, type: 'tisch', name: 'Nightstand Right', x: 1.3, z: -2.0, rotation: 0 },
        { id: 15, type: 'lamp', name: 'Bedside Reading Lamp', x: -1.8, z: -2.0, rotation: 0 },
        { id: 16, type: 'poster', name: 'Bedroom Art Print', x: 1.5, z: -2.53, rotation: 0 }
      ]
    },
    {
      id: 'show-kit',
      title: 'Kitchen',
      width: 5.2, length: 5.5, hasWindow: true, windowWidth: 1.8,
      furniture: [
        // Cleanly spaced back wall appliances with zero collision
        { id: 20, type: 'kitchen', name: 'Fitted Counter', x: -1.6, z: -2.1, rotation: 0 },
        { id: 21, type: 'oven', name: 'Oven Range', x: -0.4, z: -2.1, rotation: 0 },
        { id: 22, type: 'dishwasher', name: 'Dishwasher', x: 0.6, z: -2.1, rotation: 0 },
        { id: 23, type: 'kitchenSink', name: 'Sink Counter', x: 1.8, z: -2.1, rotation: 0 },
        { id: 24, type: 'wallCabinet', name: 'Upper Wall Cabinets', x: -0.4, z: -2.2, rotation: 0 },
        // Center Island Bar & Stools
        { id: 25, type: 'kitchen', name: 'Center Island Bar', x: 0, z: 0.1, rotation: 0 },
        { id: 26, type: 'barStool', name: 'Bar High Stool 1', x: -0.8, z: 0.85, rotation: 180 },
        { id: 27, type: 'barStool', name: 'Bar High Stool 2', x: 0, z: 0.85, rotation: 180 },
        { id: 28, type: 'barStool', name: 'Bar High Stool 3', x: 0.8, z: 0.85, rotation: 180 }
      ]
    }
  ];

  const [userRooms, setUserRooms] = useState([
    {
      id: 'usr-1',
      title: 'My Custom Living Room',
      width: 4, length: 5, hasWindow: true, windowWidth: 1.4,
      furniture: [
        { id: 1, type: 'sofa', name: 'Sofa', x: 0, z: -1.2, rotation: 0 },
        { id: 2, type: 'tisch', name: 'Table', x: 0, z: -0.2, rotation: 0 }
      ]
    }
  ]);

  const [activeRoomId, setActiveRoomId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const activeRoom = userRooms.find(r => r.id === activeRoomId) || userRooms[0];
  const activeShowcase = showcaseRooms[showcaseIndex];

  const handleSelect = (id, isShiftPressed) => {
    if (isShiftPressed) {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    } else {
      setSelectedIds([id]);
    }
  };

  const collisionDetails = useMemo(() => {
    if (!activeRoom) return [];
    const reports = [];
    const items = activeRoom.furniture;
    for (let i = 0; i < items.length; i++) {
      if (isOutOfBounds(items[i], activeRoom)) reports.push(`"${items[i].name || items[i].type}" exceeds room boundary walls.`);
      for (let j = i + 1; j < items.length; j++) {
        if (checkCollision(items[i], items[j])) reports.push(`"${items[i].name || items[i].type}" collides with "${items[j].name || items[j].type}".`);
      }
    }
    return reports;
  }, [activeRoom]);

  const collidingIds = useMemo(() => {
    if (!activeRoom) return new Set();
    const colliding = new Set();
    const items = activeRoom.furniture;
    for (let i = 0; i < items.length; i++) {
      if (isOutOfBounds(items[i], activeRoom)) colliding.add(items[i].id);
      for (let j = i + 1; j < items.length; j++) {
        if (checkCollision(items[i], items[j])) { colliding.add(items[i].id); colliding.add(items[j].id); }
      }
    }
    return colliding;
  }, [activeRoom]);

  const zoomLimits = useMemo(() => {
    if (!activeRoom) return { min: 3, max: 12 };
    const maxDim = Math.max(activeRoom.width, activeRoom.length);
    return { min: Math.max(2.5, maxDim * 0.5), max: Math.max(10, maxDim * 2.2) };
  }, [activeRoom]);

  const createNewRoom = () => {
    const newRoom = { id: `usr-${Date.now()}`, title: `New Room ${userRooms.length + 1}`, width: 4, length: 4, hasWindow: true, windowWidth: 1.2, furniture: [] };
    setUserRooms([...userRooms, newRoom]);
    setActiveRoomId(newRoom.id);
    setViewMode('editor');
  };

  const updateActiveRoom = (updatedFields) => {
    setUserRooms(userRooms.map(r => r.id === activeRoom.id ? { ...r, ...updatedFields } : r));
  };

  const addFurniture = (type) => {
    const newItem = { id: Date.now(), type, name: type.toUpperCase(), x: 0, z: 0, rotation: 0 };
    updateActiveRoom({ furniture: [...activeRoom.furniture, newItem] });
    setSelectedIds([newItem.id]);
  };

  const updatePosition = (id, x, z) => {
    const updated = activeRoom.furniture.map(item => item.id === id ? { ...item, x, z } : item);
    updateActiveRoom({ furniture: updated });
  };

  const rotateSelected = () => {
    if (selectedIds.length === 0) return;
    const updated = activeRoom.furniture.map(item => {
      if (selectedIds.includes(item.id)) {
        return { ...item, rotation: ((item.rotation || 0) + 45) % 360 };
      }
      return item;
    });
    updateActiveRoom({ furniture: updated });
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    updateActiveRoom({ furniture: activeRoom.furniture.filter(item => !selectedIds.includes(item.id)) });
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div><span className="text-xl font-bold tracking-tight text-white">SpaceCraft<span className="text-cyan-400">.3D</span></span></div>
          </div>
          <nav className="flex items-center gap-4 text-xs font-semibold">
            <button onClick={() => setViewMode('home')} className={`px-4 py-2 rounded-xl transition ${viewMode === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>Showcase Home</button>
            <button onClick={() => setViewMode('directory')} className={`px-4 py-2 rounded-xl transition ${viewMode !== 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>My Room Workspace</button>
          </nav>
        </div>
      </header>

      {/* 1. HOME PAGE */}
      {viewMode === 'home' && (
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-cyan-400 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Professional Architectural Suite
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Design spaces that feel <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                warm, livable, and authentic.
              </span>
            </h1>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-white">{activeShowcase.title} Concept</h3>
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {showcaseRooms.map((room, idx) => (
                  <button key={room.id} onClick={() => setShowcaseIndex(idx)} className={`px-5 py-2 rounded-xl text-xs font-semibold transition ${showcaseIndex === idx ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                    {room.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[520px] w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative">
              <Canvas shadows camera={{ position: [0, 5, 7], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-bias={-0.0001} />
                <Environment preset="apartment" />
                <RoomStructure room={activeShowcase} />
                <Grid position={[0, 0.001, 0]} args={[12, 12]} cellSize={0.5} cellThickness={0.8} cellColor="#94a3b8" sectionSize={1} sectionThickness={1.2} sectionColor="#64748b" />
                {activeShowcase.furniture.map(item => (
                  <FurnitureItem key={item.id} item={item} isReadOnly={true} />
                ))}
                <OrbitControls makeDefault minDistance={4} maxDistance={10} maxPolarAngle={Math.PI / 2 - 0.05} />
              </Canvas>
            </div>

            <div className="mt-6 flex justify-center">
              <button onClick={() => {
                const cloned = { ...activeShowcase, id: `usr-${Date.now()}`, title: `${activeShowcase.title} (Custom)` };
                setUserRooms([...userRooms, cloned]);
                setActiveRoomId(cloned.id);
                setViewMode('editor');
              }} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-6 py-3 rounded-xl transition shadow-lg flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Customize This Room
              </button>
            </div>
          </div>
        </main>
      )}

      {/* 2. DIRECTORY */}
      {viewMode === 'directory' && (
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Room Directory</h1>
            <button onClick={createNewRoom} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2">
              <FolderPlus className="w-4 h-4" /> Create New Room
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRooms.map(room => (
              <div key={room.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition flex flex-col">
                <div className="h-44 bg-slate-950 relative border-b border-slate-800/80">
                  <Canvas camera={{ position: [0, 4, 6], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 8, 5]} intensity={1} />
                    <RoomStructure room={room} />
                    {room.furniture.map(item => (<FurnitureItem key={item.id} item={item} isReadOnly={true} />))}
                    <OrbitControls makeDefault enableZoom={false} maxPolarAngle={Math.PI / 2 - 0.05} />
                  </Canvas>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{room.title}</h3>
                    <span className="text-xs text-slate-400">{room.width}m × {room.length}m • {room.furniture.length} items</span>
                  </div>
                  <button onClick={() => { setActiveRoomId(room.id); setViewMode('editor'); }} className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition">
                    <Edit3 className="w-3.5 h-3.5" /> Open Studio Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 3. EDITOR */}
      {viewMode === 'editor' && activeRoom && (
        <main className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setViewMode('directory')} className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
              <ArrowLeft className="w-4 h-4" /> Back to Directory
            </button>
            <span className="text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">Editing: {activeRoom.title}</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              
              <div className="w-full lg:w-96 space-y-6">
                {collisionDetails.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase"><AlertTriangle className="w-4 h-4" /> Collision Warnings</div>
                    <ul className="space-y-1">
                      {collisionDetails.map((msg, index) => (<li key={index} className="text-[11px] text-red-300 leading-snug list-disc list-inside">{msg}</li>))}
                    </ul>
                  </div>
                )}

                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm"><Maximize2 className="w-4 h-4" /> Room Setup</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Width (m)</label>
                      <input type="number" value={activeRoom.width} onChange={(e) => updateActiveRoom({ width: parseFloat(e.target.value) || 1 })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Length (m)</label>
                      <input type="number" value={activeRoom.length} onChange={(e) => updateActiveRoom({ length: parseFloat(e.target.value) || 1 })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
                  <span className="text-xs font-semibold text-cyan-400 block mb-3">Add Furniture</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => addFurniture('sofa')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Sofa</button>
                    <button onClick={() => addFurniture('tisch')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Table</button>
                    <button onClick={() => addFurniture('bed')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Bed</button>
                    <button onClick={() => addFurniture('kitchen')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Kitchen</button>
                    <button onClick={() => addFurniture('wardrobe')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Wardrobe</button>
                    <button onClick={() => addFurniture('poster')} className="p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl text-xs text-slate-200">Wall Art</button>
                  </div>
                </div>

                {selectedIds.length > 0 ? (
                  <div className="bg-indigo-950/20 border border-indigo-900/50 rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{selectedIds.length} item(s) selected</span>
                    <div className="flex gap-2">
                      <button onClick={rotateSelected} className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Snap Rotate 45°
                      </button>
                      <button onClick={deleteSelected} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-900/30 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 text-center text-slate-500 text-xs">
                    Hover over furniture to preview. Click empty space to deselect. Shift + Click for multi-select.
                  </div>
                )}
              </div>

              {/* Viewport Canvas */}
              <div className="flex-1 h-[500px] lg:h-[600px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative">
                <Canvas 
                  shadows 
                  camera={{ position: [0, 5, 7], fov: 45 }}
                  onPointerMissed={() => setSelectedIds([])}
                >
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-bias={-0.0001} />
                  <Environment preset="apartment" />
                  <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={12} blur={1.5} far={4} />

                  <RoomStructure room={activeRoom} />
                  <Grid position={[0, 0.001, 0]} args={[12, 12]} cellSize={0.5} cellThickness={0.8} cellColor="#94a3b8" sectionSize={1} sectionThickness={1.2} sectionColor="#64748b" />

                  {activeRoom.furniture.map(item => (
                    <FurnitureItem 
                      key={item.id} 
                      item={item} 
                      onSelect={handleSelect} 
                      isSelected={selectedIds.includes(item.id)} 
                      onUpdatePosition={updatePosition}
                      isColliding={collidingIds.has(item.id)}
                      isReadOnly={false}
                    />
                  ))}

                  <OrbitControls makeDefault minDistance={zoomLimits.min} maxDistance={zoomLimits.max} maxPolarAngle={Math.PI / 2 - 0.05} />
                </Canvas>
              </div>

            </div>
          </div>
        </main>
      )}

      <footer className="border-t border-slate-900 py-10 px-6 text-center text-xs text-slate-500 mt-16">
        <p>© 2026 SpaceCraft 3D. Precision Architectural Studio.</p>
      </footer>

    </div>
  );
}
