// Game data and configuration
const GAME_CONFIG = {
    maxGuesses: 50,
    hintThreshold: 10,
    soundEnabled: true,
    animationsEnabled: true,
    difficulty: 'normal' // easy, normal, hard
};

// Physical objects word bank
const WORD_BANK = [
    'apple', 'chair', 'bicycle', 'lamp', 'book', 'guitar', 'hammer', 'pillow',
    'telephone', 'camera', 'scissors', 'umbrella', 'clock', 'mirror', 'candle',
    'keyboard', 'backpack', 'toothbrush', 'wallet', 'headphones', 'pencil',
    'bottle', 'shoe', 'flower', 'tree', 'rock', 'shell', 'coin', 'knife', 'cup'
];

// Physical attributes for concrete objects
const PHYSICAL_ATTRIBUTES = {
    apple: { 
        size: 15, hardness: 30, weight: 20, temperature: 40,
        color: '#FF6B6B', material: 'Organic', shape: 'Round', texture: 'Smooth',
        category: 'Food', location: 'Kitchen', function: 'Eating'
    },
    chair: { 
        size: 70, hardness: 85, weight: 60, temperature: 35,
        color: '#8B4513', material: 'Wood', shape: 'Angular', texture: 'Hard',
        category: 'Furniture', location: 'Indoor', function: 'Sitting'
    },
    bicycle: { 
        size: 85, hardness: 90, weight: 75, temperature: 35,
        color: '#FF4500', material: 'Metal', shape: 'Complex', texture: 'Hard',
        category: 'Vehicle', location: 'Outdoor', function: 'Transportation'
    },
    lamp: { 
        size: 45, hardness: 75, weight: 40, temperature: 60,
        color: '#FFD700', material: 'Mixed', shape: 'Tall', texture: 'Smooth',
        category: 'Electronics', location: 'Indoor', function: 'Lighting'
    },
    book: { 
        size: 25, hardness: 40, weight: 30, temperature: 35,
        color: '#4169E1', material: 'Paper', shape: 'Rectangle', texture: 'Soft',
        category: 'Media', location: 'Indoor', function: 'Reading'
    },
    guitar: { 
        size: 80, hardness: 70, weight: 50, temperature: 35,
        color: '#D2691E', material: 'Wood', shape: 'Curved', texture: 'Smooth',
        category: 'Instrument', location: 'Indoor', function: 'Music'
    },
    hammer: { 
        size: 35, hardness: 95, weight: 70, temperature: 35,
        color: '#696969', material: 'Metal', shape: 'Long', texture: 'Hard',
        category: 'Tool', location: 'Workshop', function: 'Building'
    },
    pillow: { 
        size: 50, hardness: 10, weight: 15, temperature: 40,
        color: '#F0F8FF', material: 'Fabric', shape: 'Square', texture: 'Soft',
        category: 'Bedding', location: 'Bedroom', function: 'Comfort'
    },
    telephone: { 
        size: 30, hardness: 80, weight: 40, temperature: 35,
        color: '#000000', material: 'Plastic', shape: 'Rectangle', texture: 'Smooth',
        category: 'Electronics', location: 'Indoor', function: 'Communication'
    },
    camera: { 
        size: 40, hardness: 85, weight: 55, temperature: 35,
        color: '#2F2F2F', material: 'Plastic', shape: 'Rectangle', texture: 'Textured',
        category: 'Electronics', location: 'Portable', function: 'Photography'
    },
    scissors: { 
        size: 20, hardness: 90, weight: 25, temperature: 35,
        color: '#C0C0C0', material: 'Metal', shape: 'Sharp', texture: 'Hard',
        category: 'Tool', location: 'Office', function: 'Cutting'
    },
    umbrella: { 
        size: 60, hardness: 50, weight: 35, temperature: 35,
        color: '#4B0082', material: 'Fabric', shape: 'Round', texture: 'Smooth',
        category: 'Accessory', location: 'Portable', function: 'Protection'
    },
    clock: { 
        size: 35, hardness: 80, weight: 45, temperature: 35,
        color: '#FFFFFF', material: 'Plastic', shape: 'Round', texture: 'Smooth',
        category: 'Electronics', location: 'Indoor', function: 'Time'
    },
    mirror: { 
        size: 55, hardness: 95, weight: 60, temperature: 35,
        color: '#E6E6FA', material: 'Glass', shape: 'Rectangle', texture: 'Smooth',
        category: 'Furniture', location: 'Bathroom', function: 'Reflection'
    },
    candle: { 
        size: 15, hardness: 40, weight: 20, temperature: 70,
        color: '#FFFAF0', material: 'Wax', shape: 'Cylinder', texture: 'Smooth',
        category: 'Decoration', location: 'Indoor', function: 'Lighting'
    },
    keyboard: { 
        size: 45, hardness: 75, weight: 50, temperature: 35,
        color: '#2F2F2F', material: 'Plastic', shape: 'Rectangle', texture: 'Textured',
        category: 'Electronics', location: 'Office', function: 'Typing'
    },
    backpack: { 
        size: 65, hardness: 25, weight: 40, temperature: 35,
        color: '#006400', material: 'Fabric', shape: 'Bag', texture: 'Textured',
        category: 'Accessory', location: 'Portable', function: 'Carrying'
    },
    toothbrush: { 
        size: 18, hardness: 60, weight: 10, temperature: 35,
        color: '#00CED1', material: 'Plastic', shape: 'Long', texture: 'Textured',
        category: 'Hygiene', location: 'Bathroom', function: 'Cleaning'
    },
    wallet: { 
        size: 20, hardness: 50, weight: 15, temperature: 35,
        color: '#8B4513', material: 'Leather', shape: 'Rectangle', texture: 'Smooth',
        category: 'Accessory', location: 'Portable', function: 'Storage'
    },
    headphones: { 
        size: 35, hardness: 70, weight: 30, temperature: 35,
        color: '#1C1C1C', material: 'Plastic', shape: 'Curved', texture: 'Padded',
        category: 'Electronics', location: 'Portable', function: 'Audio'
    },
    pencil: { 
        size: 12, hardness: 60, weight: 5, temperature: 35,
        color: '#FFD700', material: 'Wood', shape: 'Cylinder', texture: 'Smooth',
        category: 'Tool', location: 'Office', function: 'Writing'
    },
    bottle: { 
        size: 35, hardness: 90, weight: 45, temperature: 40,
        color: '#87CEEB', material: 'Glass', shape: 'Cylinder', texture: 'Smooth',
        category: 'Container', location: 'Kitchen', function: 'Storage'
    },
    shoe: { 
        size: 30, hardness: 65, weight: 40, temperature: 35,
        color: '#8B4513', material: 'Leather', shape: 'Curved', texture: 'Textured',
        category: 'Clothing', location: 'Closet', function: 'Protection'
    },
    flower: { 
        size: 10, hardness: 15, weight: 5, temperature: 40,
        color: '#FF69B4', material: 'Organic', shape: 'Complex', texture: 'Soft',
        category: 'Plant', location: 'Garden', function: 'Beauty'
    },
    tree: { 
        size: 95, hardness: 85, weight: 90, temperature: 35,
        color: '#228B22', material: 'Wood', shape: 'Tall', texture: 'Rough',
        category: 'Plant', location: 'Outdoor', function: 'Oxygen'
    },
    rock: { 
        size: 25, hardness: 100, weight: 80, temperature: 30,
        color: '#696969', material: 'Stone', shape: 'Irregular', texture: 'Rough',
        category: 'Natural', location: 'Outdoor', function: 'Building'
    },
    shell: { 
        size: 8, hardness: 85, weight: 10, temperature: 35,
        color: '#F5DEB3', material: 'Calcium', shape: 'Curved', texture: 'Smooth',
        category: 'Natural', location: 'Beach', function: 'Protection'
    },
    coin: { 
        size: 3, hardness: 90, weight: 8, temperature: 35,
        color: '#FFD700', material: 'Metal', shape: 'Round', texture: 'Smooth',
        category: 'Currency', location: 'Wallet', function: 'Payment'
    },
    knife: { 
        size: 25, hardness: 95, weight: 30, temperature: 35,
        color: '#C0C0C0', material: 'Metal', shape: 'Sharp', texture: 'Hard',
        category: 'Tool', location: 'Kitchen', function: 'Cutting'
    },
    cup: { 
        size: 20, hardness: 85, weight: 25, temperature: 45,
        color: '#FFFFFF', material: 'Ceramic', shape: 'Cylinder', texture: 'Smooth',
        category: 'Container', location: 'Kitchen', function: 'Drinking'
    }
};

// Similarity thresholds and descriptions
const SIMILARITY_LEVELS = {
    perfect: { min: 100, max: 100, text: '🎯 Perfect!', color: 'emerald' },
    veryClose: { min: 80, max: 99, text: '🔥 Very Close', color: 'green' },
    warm: { min: 60, max: 79, text: '♨️ Getting Warm', color: 'yellow' },
    similar: { min: 40, max: 59, text: '🌡️ Somewhat Similar', color: 'orange' },
    distant: { min: 20, max: 39, text: '❄️ Distantly Related', color: 'red' },
    different: { min: 0, max: 19, text: '🧊 Very Different', color: 'gray' }
};

// Game statistics structure
const DEFAULT_STATS = {
    gamesPlayed: 0,
    gamesWon: 0,
    totalGuesses: 0,
    bestGame: null,
    averageGuesses: 0,
    winStreak: 0,
    maxWinStreak: 0
};