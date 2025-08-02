// challenges.js - Daily Word Morph Challenges
// This file contains all the challenge data for the Word Morph game
// Each day of the month (1-31) has its own unique challenge

// Daily challenges for each day of the month (1-31)
const DAILY_CHALLENGES = {
    1: {
        start: 'COLD',
        target: 'WARM',
        optimal: 5,
        validWords: ['COLD', 'CORD', 'CARD', 'WARD', 'WARP', 'WARM'],
        solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM']
    },
    2: {
        start: 'FISH',
        target: 'DUCK',
        optimal: 4,
        validWords: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK'],
        solution: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK']
    },
    3: {
        start: 'MOON',
        target: 'STAR',
        optimal: 5,
        validWords: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR'],
        solution: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR']
    },
    4: {
        start: 'LOVE',
        target: 'HATE',
        optimal: 3,
        validWords: ['LOVE', 'LAVE', 'LATE', 'HATE'],
        solution: ['LOVE', 'LAVE', 'LATE', 'HATE']
    },
    5: {
        start: 'FIRE',
        target: 'SNOW',
        optimal: 6,
        validWords: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW'],
        solution: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW']
    },
    6: {
        start: 'EAST',
        target: 'WEST',
        optimal: 3,
        validWords: ['EAST', 'PAST', 'PEST', 'WEST'],
        solution: ['EAST', 'PAST', 'PEST', 'WEST']
    },
    7: {
        start: 'CAKE',
        target: 'TART',
        optimal: 3,
        validWords: ['CAKE', 'CARE', 'TARE', 'TART'],
        solution: ['CAKE', 'CARE', 'TARE', 'TART']
    },
    8: {
        start: 'BIRD',
        target: 'WORM',
        optimal: 3,
        validWords: ['BIRD', 'WORD', 'WORK', 'WORM'],
        solution: ['BIRD', 'WORD', 'WORK', 'WORM']
    },
    9: {
        start: 'DARK',
        target: 'LITE',
        optimal: 4,
        validWords: ['DARK', 'LARK', 'LAKE', 'LIKE', 'LITE'],
        solution: ['DARK', 'LARK', 'LAKE', 'LIKE', 'LITE']
    },
    10: {
        start: 'HEAD',
        target: 'TAIL',
        optimal: 4,
        validWords: ['HEAD', 'HEAL', 'TEAL', 'TALL', 'TAIL'],
        solution: ['HEAD', 'HEAL', 'TEAL', 'TALL', 'TAIL']
    },
    11: {
        start: 'CATS',
        target: 'DOGS',
        optimal: 4,
        validWords: ['CATS', 'BATS', 'BAGS', 'BOGS', 'DOGS'],
        solution: ['CATS', 'BATS', 'BAGS', 'BOGS', 'DOGS']
    },
    12: {
        start: 'MAKE',
        target: 'TAKE',
        optimal: 1,
        validWords: ['MAKE', 'TAKE'],
        solution: ['MAKE', 'TAKE']
    },
    13: {
        start: 'WORD',
        target: 'WORK',
        optimal: 1,
        validWords: ['WORD', 'WORK'],
        solution: ['WORD', 'WORK']
    },
    14: {
        start: 'GOOD',
        target: 'FOOD',
        optimal: 1,
        validWords: ['GOOD', 'FOOD'],
        solution: ['GOOD', 'FOOD']
    },
    15: {
        start: 'PLAY',
        target: 'PLAN',
        optimal: 1,
        validWords: ['PLAY', 'PLAN'],
        solution: ['PLAY', 'PLAN']
    },
    16: {
        start: 'BEAR',
        target: 'DEAR',
        optimal: 1,
        validWords: ['BEAR', 'DEAR'],
        solution: ['BEAR', 'DEAR']
    },
    17: {
        start: 'SHIP',
        target: 'SHOP',
        optimal: 1,
        validWords: ['SHIP', 'SHOP'],
        solution: ['SHIP', 'SHOP']
    },
    18: {
        start: 'GOLD',
        target: 'COLD',
        optimal: 1,
        validWords: ['GOLD', 'COLD'],
        solution: ['GOLD', 'COLD']
    },
    19: {
        start: 'KING',
        target: 'RING',
        optimal: 1,
        validWords: ['KING', 'RING'],
        solution: ['KING', 'RING']
    },
    20: {
        start: 'MILK',
        target: 'SILK',
        optimal: 1,
        validWords: ['MILK', 'SILK'],
        solution: ['MILK', 'SILK']
    },
    21: {
        start: 'WIND',
        target: 'WILD',
        optimal: 1,
        validWords: ['WIND', 'WILD'],
        solution: ['WIND', 'WILD']
    },
    22: {
        start: 'ROCK',
        target: 'SOCK',
        optimal: 1,
        validWords: ['ROCK', 'SOCK'],
        solution: ['ROCK', 'SOCK']
    },
    23: {
        start: 'WOLF',
        target: 'GOLF',
        optimal: 1,
        validWords: ['WOLF', 'GOLF'],
        solution: ['WOLF', 'GOLF']
    },
    24: {
        start: 'GIFT',
        target: 'LIFT',
        optimal: 1,
        validWords: ['GIFT', 'LIFT'],
        solution: ['GIFT', 'LIFT']
    },
    25: {
        start: 'HOPE',
        target: 'ROPE',
        optimal: 1,
        validWords: ['HOPE', 'ROPE'],
        solution: ['HOPE', 'ROPE']
    },
    26: {
        start: 'GAME',
        target: 'CAME',
        optimal: 1,
        validWords: ['GAME', 'CAME'],
        solution: ['GAME', 'CAME']
    },
    27: {
        start: 'WORK',
        target: 'WORD',
        optimal: 1,
        validWords: ['WORK', 'WORD'],
        solution: ['WORK', 'WORD']
    },
    28: {
        start: 'FAST',
        target: 'LAST',
        optimal: 1,
        validWords: ['FAST', 'LAST'],
        solution: ['FAST', 'LAST']
    },
    29: {
        start: 'RICH',
        target: 'RICE',
        optimal: 1,
        validWords: ['RICH', 'RICE'],
        solution: ['RICH', 'RICE']
    },
    30: {
        start: 'YEAR',
        target: 'HEAR',
        optimal: 1,
        validWords: ['YEAR', 'HEAR'],
        solution: ['YEAR', 'HEAR']
    },
    31: {
        start: 'BLUE',
        target: 'GLUE',
        optimal: 1,
        validWords: ['BLUE', 'GLUE'],
        solution: ['BLUE', 'GLUE']
    }
};

// Special challenges for specific dates (holidays, events, etc.)
// Format: 'YYYY-MM-DD': challenge_object
const SPECIAL_CHALLENGES = {
    // New Year's Day
    '2025-01-01': {
        start: 'YEAR',
        target: 'HOPE',
        optimal: 3,
        validWords: ['YEAR', 'HEAR', 'HEAP', 'HOPE'],
        solution: ['YEAR', 'HEAR', 'HEAP', 'HOPE']
    },
    // Valentine's Day
    '2025-02-14': {
        start: 'LOVE',
        target: 'KISS',
        optimal: 4,
        validWords: ['LOVE', 'LOSE', 'LOSS', 'LESS', 'MESS', 'MISS', 'KISS'],
        solution: ['LOVE', 'LOSE', 'LOSS', 'LESS', 'MESS', 'MISS', 'KISS']
    },
    // Christmas
    '2025-12-25': {
        start: 'GIFT',
        target: 'LOVE',
        optimal: 3,
        validWords: ['GIFT', 'LIFT', 'LIVE', 'LOVE'],
        solution: ['GIFT', 'LIFT', 'LIVE', 'LOVE']
    }
};

// Word definitions for hints
const WORD_DEFINITIONS = {
    'CORD': 'A thin rope or string',
    'CARD': 'A piece of stiff paper, often for playing games',
    'WARD': 'A division of a hospital or to guard against',
    'WARM': 'Having or giving off heat; not cold',
    'DISH': 'A shallow container for food',
    'DISK': 'A flat, circular object',
    'DUSK': 'The time of day when the sun sets',
    'DUCK': 'A waterbird with webbed feet',
    'MOAN': 'A low sound expressing pain or pleasure',
    'ROAN': 'A horse with a coat of mixed colors',
    'ROAR': 'A loud, deep sound like a lion makes',
    'SOAR': 'To fly high in the air',
    'STAR': 'A bright point of light in the night sky',
    'LAVE': 'To wash or bathe',
    'LATE': 'After the expected time',
    'HATE': 'To dislike intensely',
    'SIRE': 'A male parent, especially of a horse',
    'SORE': 'Painful or aching',
    'SORT': 'To arrange in order',
    'SOOT': 'Black powder from burning',
    'SNOT': 'Nasal mucus',
    'SNOW': 'Frozen white precipitation',
    'PAST': 'Time that has already happened',
    'PEST': 'An annoying insect or person',
    'WEST': 'The direction where the sun sets',
    'CARE': 'To look after someone or something',
    'TARE': 'The weight of a container',
    'TART': 'Sharp in taste; a type of pastry',
    'WORD': 'A unit of language with meaning',
    'WORK': 'Activity involving effort or exertion',
    'WORM': 'A small crawling creature',
    'LARK': 'A small songbird',
    'LAKE': 'A large body of water',
    'LIKE': 'To find agreeable or enjoyable',
    'LITE': 'Light in weight or calories',
    'HEAL': 'To make or become healthy again',
    'TEAL': 'A blue-green color',
    'TALL': 'Having great height',
    'TAIL': 'The rear part of an animal',
    'HEAR': 'To perceive sound',
    'HEAP': 'A pile of things',
    'HOPE': 'A feeling of expectation',
    'GLUE': 'A sticky substance used for joining things',
    'PINE': 'An evergreen tree with needle-like leaves',
    'PINK': 'A light red color',
    'LOOK': 'To direct your eyes in order to see',
    'LOCK': 'A device for securing doors or containers',
    'PACK': 'To put things into a container',
    'PAGE': 'A sheet of paper in a book',
    'LOOR': 'An archaic word meaning floor',
    'LAND': 'The solid part of the earth\'s surface',
    'LOOT': 'Stolen goods or money',
    'FOOT': 'The lower part of the leg',
    'FREE': 'Not under the control of another',
    'FLEE': 'To run away from danger',
    'FLEA': 'A small jumping insect',
    'LEAF': 'A flat green part of a plant',
    'GAIN': 'To obtain or acquire something',
    'GOWN': 'A long dress',
    'SOWN': 'Past participle of sow (to plant seeds)',
    'DEAR': 'Beloved or expensive',
    'DEER': 'A four-legged animal with antlers',
    'SHOP': 'A place where goods are sold',
    'SHOT': 'A single discharge of a gun',
    'BOOT': 'A type of footwear',
    'BOAT': 'A watercraft',
    'COLD': 'Having a low temperature',
    'CORN': 'A cereal grain',
    'COIN': 'A piece of metal money',
    'RING': 'A circular band',
    'RANG': 'Past tense of ring',
    'PANG': 'A sudden sharp feeling',
    'PAWN': 'A chess piece or to give as security',
    'SILK': 'A smooth fabric made by silkworms',
    'SICK': 'Not feeling well',
    'SACK': 'A large bag',
    'WILD': 'Living in natural conditions',
    'WILL': 'Future tense auxiliary or determination',
    'WALL': 'A vertical structure',
    'CALL': 'To shout or telephone',
    'CALM': 'Peaceful and quiet',
    'SOCK': 'A garment worn on the foot',
    'SAND': 'Fine particles of rock',
    'GOLF': 'A sport played with clubs and balls',
    'GULF': 'A large bay',
    'GULL': 'A seabird',
    'LULL': 'A temporary period of calm',
    'LAMB': 'A young sheep',
    'LIFT': 'To raise up',
    'LIVE': 'To be alive',
    'ROPE': 'A thick cord',
    'RIPE': 'Fully developed and ready to eat',
    'RISE': 'To move upward',
    'WISE': 'Having knowledge and experience',
    'WISH': 'To want something to happen',
    'CAME': 'Past tense of come',
    'CAMP': 'A place with temporary accommodation',
    'CLAP': 'To strike hands together',
    'CLAY': 'A type of earth used for pottery',
    'PLAY': 'To engage in activity for enjoyment',
    'WORE': 'Past tense of wear',
    'WIRE': 'A thin metal strand',
    'LAST': 'Coming after all others',
    'LOST': 'Unable to find the way',
    'SLOT': 'A narrow opening',
    'SLOW': 'Moving at low speed',
    'RICE': 'A cereal grain',
    'PIPE': 'A tube for conveying liquids',
    'POPE': 'The head of the Catholic Church',
    'POOR': 'Having little money',
    'DAYS': 'Plural of day',
    'LOSE': 'To be deprived of something',
    'LOSS': 'The fact of losing something',
    'LESS': 'A smaller amount',
    'MESS': 'A dirty or untidy state',
    'MISS': 'To fail to hit or catch',
    'KISS': 'To touch with the lips',
    'CATS': 'Small domesticated carnivorous mammals',
    'BATS': 'Flying mammals or sports equipment',
    'BAGS': 'Containers for carrying things',
    'BOGS': 'Wetland areas with soft ground',
    'DOGS': 'Domesticated carnivorous mammals',
    'MAKE': 'To create or produce something',
    'TAKE': 'To get hold of and carry away',
    'GOOD': 'Having the right or desired qualities',
    'FOOD': 'Any substance consumed for nutrition',
    'PLAN': 'A detailed proposal for achieving something',
    'BEAR': 'A large mammal with thick fur',
    'SHIP': 'A large watercraft',
    'GOLD': 'A precious yellow metal',
    'KING': 'A male ruler of a country',
    'MILK': 'A white liquid produced by mammals',
    'WIND': 'Moving air',
    'ROCK': 'A solid mineral material',
    'WOLF': 'A wild carnivorous mammal',
    'GIFT': 'Something given voluntarily',
    'GAME': 'An activity for entertainment',
    'FAST': 'Moving at high speed',
    'RICH': 'Having a lot of money',
    'YEAR': 'A period of 365 days',
    'BLUE': 'The color of the sky'
};

// Get challenge for a specific date
function getChallengeForDate(date) {
    const dateStr = formatDate(date);

    // Check if there's a special challenge for this specific date
    if (SPECIAL_CHALLENGES[dateStr]) {
        return SPECIAL_CHALLENGES[dateStr];
    }

    // Otherwise, use the day of the month to get the daily challenge
    const dayOfMonth = date.getDate();
    return DAILY_CHALLENGES[dayOfMonth] || DAILY_CHALLENGES[1]; // Fallback to day 1 if not found
}

// Generate challenges for a date range
function generateChallenges(startDate, endDate) {
    const challenges = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        const dateStr = formatDate(currentDate);
        challenges[dateStr] = getChallengeForDate(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return challenges;
}

// Generate challenges for current date range (past 30 days + future 7 days)
function generateCurrentChallenges() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    return generateChallenges(startDate, endDate);
}

// Utility function to format date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Export functions and data for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        DAILY_CHALLENGES,
        SPECIAL_CHALLENGES,
        WORD_DEFINITIONS,
        getChallengeForDate,
        generateChallenges,
        generateCurrentChallenges,
        formatDate
    };
} else {
    // Browser environment - attach to window
    window.ChallengeManager = {
        DAILY_CHALLENGES,
        SPECIAL_CHALLENGES,
        WORD_DEFINITIONS,
        getChallengeForDate,
        generateChallenges,
        generateCurrentChallenges,
        formatDate
    };
}