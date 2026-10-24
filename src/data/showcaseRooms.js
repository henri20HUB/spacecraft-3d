export const showcaseRooms = [
  {
    id: 'show-living',
    title: 'Living Room',
    width: 5.5, length: 6, hasWindow: true, windowWidth: 2.0,
    furniture: [
      { id: 1, type: 'rug', name: 'Center Living Rug', x: 0, z: -0.2, rotation: 0 },
      { id: 2, type: 'sofa', name: 'Main Sofa', x: 0, z: -1.2, rotation: 0 },
      { id: 3, type: 'tisch', name: 'Coffee Table', x: 0, z: -0.2, rotation: 0 },
      { id: 4, type: 'chair', name: 'Lounge Armchair', x: 1.6, z: -0.5, rotation: 225 },
      { id: 5, type: 'chair', name: 'Accent Armchair', x: -1.6, z: -0.5, rotation: 135 },
      { id: 6, type: 'lamp', name: 'Corner Floor Lamp', x: -2.1, z: 2.2, rotation: 0 },
      { id: 7, type: 'wardrobe', name: 'Media Console', x: 0, z: 2.4, rotation: 180 }, // Placed away from window wall
      { id: 8, type: 'wardrobe', name: 'Bookshelf Wall Unit', x: 2.1, z: 0, rotation: 270 }
    ]
  },
  {
    id: 'show-bed',
    title: 'Bedroom',
    width: 4.8, length: 5.2, hasWindow: true, windowWidth: 1.6,
    furniture: [
      { id: 10, type: 'rug', name: 'Plush Bed Rug', x: 0, z: -0.4, rotation: 0 },
      { id: 11, type: 'bed', name: 'King Bed', x: 0, z: -1.2, rotation: 0 },
      { id: 12, type: 'wardrobe', name: 'Main Wardrobe', x: 1.8, z: 1.2, rotation: 180 }, // Placed against side/back wall away from window
      { id: 13, type: 'tisch', name: 'Nightstand Left', x: -1.3, z: -2.0, rotation: 0 },
      { id: 14, type: 'tisch', name: 'Nightstand Right', x: 1.3, z: -2.0, rotation: 0 },
      { id: 15, type: 'lamp', name: 'Bedside Reading Lamp', x: -1.3, z: -2.0, rotation: 0 },
      { id: 16, type: 'wardrobe', name: 'Dresser Chest', x: -1.8, z: 1.4, rotation: 90 },
      { id: 17, type: 'chair', name: 'Bedroom Lounge Chair', x: 1.6, z: -0.5, rotation: 225 }
    ]
  },
  {
    id: 'show-kit',
    title: 'Kitchen',
    width: 5.0, length: 5.5, hasWindow: true, windowWidth: 1.8,
    furniture: [
      { id: 20, type: 'kitchen', name: 'Fitted Counter', x: -1.1, z: -2.1, rotation: 0 },
      { id: 21, type: 'kitchenSink', name: 'Sink Counter', x: 1.1, z: -2.1, rotation: 0 },
      { id: 22, type: 'wallCabinet', name: 'Upper Wall Cabinets', x: 0, z: -2.2, rotation: 0 },
      { id: 23, type: 'kitchen', name: 'Center Island Bar', x: 0, z: 0.2, rotation: 0 },
      { id: 24, type: 'wardrobe', name: 'Refrigerator Tower', x: -1.9, z: 2.0, rotation: 180 }, // Moved away from window
      // Barstools placed cleanly along the front/side of the island without overlapping
      { id: 25, type: 'chair', name: 'Bar Stool 1', x: -0.6, z: 0.85, rotation: 180 },
      { id: 26, type: 'chair', name: 'Bar Stool 2', x: 0, z: 0.85, rotation: 180 },
      { id: 27, type: 'chair', name: 'Bar Stool 3', x: 0.6, z: 0.85, rotation: 180 }
    ]
  }
];
