// challenges.js - Daily Word Morph Challenges
// This file contains all the challenge data for the Word Morph game

const CHALLENGE_TEMPLATES = [
    {
        start: 'COLD',
        target: 'WARM',
        optimal: 5,
        validWords: ['COLD', 'CORD', 'CARD', 'WARD', 'WARP', 'WARM'],
        solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM']
    },
    {
        start: 'FISH',
        target: 'DUCK',
        optimal: 4,
        validWords: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK'],
        solution: ['FISH', 'DISH', 'DISK', 'DUSK', 'DUCK']
    },
    {
        start: 'MOON',
        target: 'STAR',
        optimal: 5,
        validWords: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR'],
        solution: ['MOON', 'MOAN', 'ROAN', 'ROAR', 'SOAR', 'STAR']
    },
    {
        start: 'LOVE',
        target: 'HATE',
        optimal: 3,
        validWords: ['LOVE', 'LAVE', 'LATE', 'HATE'],
        solution: ['LOVE', 'LAVE', 'LATE', 'HATE']
    },
    {
        start: 'FIRE',
        target: 'SNOW',
        optimal: 6,
        validWords: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW'],
        solution: ['FIRE', 'SIRE', 'SORE', 'SORT', 'SOOT', 'SNOT', 'SNOW']
    },
    {
        start: 'EAST',
        target: 'WEST',
        optimal: 3,
        validWords: ['EAST', 'PAST', 'PEST', 'WEST'],
        solution: ['EAST', 'PAST', 'PEST', 'WEST']
    },
    {
        start: 'CAKE',
        target: 'TART',
        optimal: 3,
        validWords: ['CAKE', 'CARE', 'TARE', 'TART'],
        solution: ['CAKE', 'CARE', 'TARE', 'TART']
    },
    {
        start: 'BIRD',
        target: 'WORM',
        optimal: 4,
        validWords: ['BIRD', 'WORD', 'WORK', 'WORM'],
        solution: ['BIRD', 'WORD', 'WORK', 'WORM']
    },
    {
        start: 'DARK',
        target: 'LITE',
        optimal: 4,
        validWords: ['DARK', 'LARK', 'LAKE', 'LIKE', 'LITE'],
        solution: ['DARK', 'LARK', 'LAKE', 'LIKE', 'LITE']
    },
    {
        start: 'HEAD',
        target: 'TAIL',
        optimal: 4,
        validWords: ['HEAD', 'HEAL', 'TEAL', 'TALL', 'TAIL'],
        solution: ['HEAD', 'HEAL', 'TEAL', 'TALL', 'TAIL']
    }
];

// Specific challenges for certain dates (optional)
// Format: 'YYYY-MM-DD': challenge_object
const SPECIFIC_CHALLENGES = {
    // Example: Set a special challenge for New Year's Day
    // '2025-01-01': {
    //     start: 'YEAR',
    //     target: 'HOPE',
    //     optimal: 4,
    //     validWords: ['YEAR', 'HEAR', 'HEAP', 'HOPE'],
    //     solution: ['YEAR', 'HEAR', 'HEAP', 'HOPE']
    // }
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
    'HOPE': 'A feeling of expectation'
};

// Generate challenges for a date range
function generateChallenges(startDate, endDate) {
    const challenges = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
        const dateStr = formatDate(currentDate);
        
        // Check if there's a specific challenge for this date
        if (SPECIFIC_CHALLENGES[dateStr]) {
            challenges[dateStr] = SPECIFIC_CHALLENGES[dateStr];
        } else {
            // Use template challenges in rotation
            const daysSinceEpoch = Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24));
            const templateIndex = daysSinceEpoch % CHALLENGE_TEMPLATES.length;
            challenges[dateStr] = CHALLENGE_TEMPLATES[templateIndex];
        }
        
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
        CHALLENGE_TEMPLATES,
        SPECIFIC_CHALLENGES,
        WORD_DEFINITIONS,
        generateChallenges,
        generateCurrentChallenges,
        formatDate
    };
} else {
    // Browser environment - attach to window
    window.ChallengeManager = {
        CHALLENGE_TEMPLATES,
        SPECIFIC_CHALLENGES,
        WORD_DEFINITIONS,
        generateChallenges,
        generateCurrentChallenges,
        formatDate
    };
}