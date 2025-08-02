// Daily Quote Puzzle - Quotes Calendar
// Add new quotes here with their corresponding dates

const quotesCalendar = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "great", scrambled: "taerg", index: 5 },
            { original: "love", scrambled: "evol", index: 10 }
        ],
        date: "2025-07-24"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "Lennon", 
        scrambledAuthor: "nonnel",
        scrambledWords: [
            { original: "happens", scrambled: "sneppah", index: 3 },
            { original: "making", scrambled: "gnikam", index: 7 }
        ],
        date: "2025-07-23"
    },
    {
        text: "Be yourself; everyone else is already taken.",
        author: "Wilde",
        scrambledAuthor: "edliw",
        scrambledWords: [
            { original: "yourself", scrambled: "flesruoy", index: 1 },
            { original: "taken", scrambled: "nekta", index: 6 }
        ],
        date: "2025-07-22"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "future", scrambled: "utrefu", index: 1 },
            { original: "believe", scrambled: "eveileb", index: 5 }
        ],
        date: "2025-07-21"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Churchill",
        scrambledAuthor: "llihcruhc",
        scrambledWords: [
            { original: "success", scrambled: "sseccus", index: 0 },
            { original: "courage", scrambled: "uagrec", index: 12 }
        ],
        date: "2025-07-20"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Einstein",
        scrambledAuthor: "nietsnie",
        scrambledWords: [
            { original: "middle", scrambled: "dimdel", index: 3 },
            { original: "opportunity", scrambled: "portutiyonp", index: 7 }
        ],
        date: "2025-07-19"
    },
    {
        text: "The only thing we have to fear is fear itself.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "fear", scrambled: "afre", index: 6 },
            { original: "itself", scrambled: "flesit", index: 9 }
        ],
        date: "2025-07-18"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "innovation", scrambled: "noitavonni", index: 0 },
            { original: "leader", scrambled: "redael", index: 5 }
        ],
        date: "2025-07-17"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Proverb",
        scrambledAuthor: "brevorp",
        scrambledWords: [
            { original: "plant", scrambled: "tnalp", index: 4 },
            { original: "second", scrambled: "dnoces", index: 12 }
        ],
        date: "2025-07-16"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "limited", scrambled: "detimil", index: 2 },
            { original: "waste", scrambled: "etsaw", index: 5 }
        ],
        date: "2025-07-15"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Disney",
        scrambledAuthor: "yensid",
        scrambledWords: [
            { original: "started", scrambled: "detrats", index: 4 },
            { original: "doing", scrambled: "gniod", index: 10 }
        ],
        date: "2025-07-14"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Rogers",
        scrambledAuthor: "sregor",
        scrambledWords: [
            { original: "yesterday", scrambled: "yadretsey", index: 2 },
            { original: "today", scrambled: "yadot", index: 8 }
        ],
        date: "2025-07-13"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        scrambledAuthor: "eltotsira",
        scrambledWords: [
            { original: "darkest", scrambled: "tsekrad", index: 4 },
            { original: "focus", scrambled: "sucof", index: 9 }
        ],
        date: "2025-07-12"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "believe", scrambled: "eveileb", index: 0 },
            { original: "halfway", scrambled: "yawflah", index: 6 }
        ],
        date: "2025-07-11"
    },
    {
        text: "The only impossible journey is the one you never start.",
        author: "Robbins",
        scrambledAuthor: "snibbor",
        scrambledWords: [
            { original: "impossible", scrambled: "elbissopmi", index: 2 },
            { original: "journey", scrambled: "yenruoj", index: 3 }
        ],
        date: "2025-07-10"
    },
    {
        text: "Life is what we make it, always has been, always will be.",
        author: "Moses",
        scrambledAuthor: "sesom",
        scrambledWords: [
            { original: "make", scrambled: "ekam", index: 4 },
            { original: "always", scrambled: "syawla", index: 7 }
        ],
        date: "2025-07-09"
    },
    {
        text: "The best revenge is massive success.",
        author: "Sinatra",
        scrambledAuthor: "artanis",
        scrambledWords: [
            { original: "revenge", scrambled: "egnevr", index: 2 },
            { original: "massive", scrambled: "evissam", index: 4 }
        ],
        date: "2025-07-08"
    }
];

// Export for use in the main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quotesCalendar;
}