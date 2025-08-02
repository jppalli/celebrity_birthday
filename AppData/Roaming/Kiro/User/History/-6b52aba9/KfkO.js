// Daily Quote Puzzle - Quotes Calendar
// Add new quotes here with their corresponding dates

const quotesCalendar = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "only", scrambled: "ylno", index: 1 },
            { original: "great", scrambled: "taerg", index: 5 },
            { original: "work", scrambled: "krow", index: 6 },
            { original: "love", scrambled: "evol", index: 9 }
        ],
        date: "2025-07-24"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "Lennon",
        scrambledAuthor: "nonnel",
        scrambledWords: [
            { original: "what", scrambled: "tahw", index: 2 },
            { original: "happens", scrambled: "sneppah", index: 3 },
            { original: "busy", scrambled: "ysub", index: 6 },
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
            { original: "everyone", scrambled: "enoyreve", index: 2 },
            { original: "already", scrambled: "ydaerla", index: 5 },
            { original: "taken", scrambled: "nekat", index: 6 }
        ],
        date: "2025-07-22"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "future", scrambled: "erutuf", index: 1 },
            { original: "belongs", scrambled: "sgnoleb", index: 2 },
            { original: "believe", scrambled: "eveileb", index: 6 },
            { original: "beauty", scrambled: "ytuaeb", index: 9 }
        ],
        date: "2025-07-21"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Churchill",
        scrambledAuthor: "llihcruhc",
        scrambledWords: [
            { original: "success", scrambled: "sseccus", index: 0 },
            { original: "failure", scrambled: "eruliaf", index: 4 },
            { original: "courage", scrambled: "egaruoc", index: 11 },
            { original: "continue", scrambled: "eunitnoc", index: 13 }
        ],
        date: "2025-07-20"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Einstein",
        scrambledAuthor: "nietsnie",
        scrambledWords: [
            { original: "middle", scrambled: "elddim", index: 2 },
            { original: "difficulty", scrambled: "ytluciffid", index: 4 },
            { original: "lies", scrambled: "seil", index: 5 },
            { original: "opportunity", scrambled: "ytinnutroppo", index: 6 }
        ],
        date: "2025-07-19"
    },
    {
        text: "The only thing we have to fear is fear itself.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "only", scrambled: "ylno", index: 1 },
            { original: "thing", scrambled: "gniht", index: 2 },
            { original: "fear", scrambled: "raef", index: 6 },
            { original: "itself", scrambled: "flesti", index: 8 }
        ],
        date: "2025-07-18"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "innovation", scrambled: "noitavonni", index: 0 },
            { original: "distinguishes", scrambled: "sehsiugnitsid", index: 1 },
            { original: "leader", scrambled: "redael", index: 5 },
            { original: "follower", scrambled: "rewollof", index: 8 }
        ],
        date: "2025-07-17"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Proverb",
        scrambledAuthor: "brevorp",
        scrambledWords: [
            { original: "best", scrambled: "tseb", index: 1 },
            { original: "plant", scrambled: "tnalp", index: 4 },
            { original: "years", scrambled: "sraey", index: 9 },
            { original: "second", scrambled: "dnoces", index: 12 }
        ],
        date: "2025-07-16"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Jobs",
        scrambledAuthor: "bjos",
        scrambledWords: [
            { original: "time", scrambled: "emit", index: 1 },
            { original: "limited", scrambled: "detimil", index: 3 },
            { original: "waste", scrambled: "etsaw", index: 6 },
            { original: "living", scrambled: "gnivil", index: 8 }
        ],
        date: "2025-07-15"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Disney",
        scrambledAuthor: "yensid",
        scrambledWords: [
            { original: "started", scrambled: "detrats", index: 4 },
            { original: "quit", scrambled: "tiuq", index: 7 },
            { original: "talking", scrambled: "nkilatg", index: 8 },
            { original: "doing", scrambled: "gniod", index: 11 }
        ],
        date: "2025-07-14"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Rogers",
        scrambledAuthor: "sregor",
        scrambledWords: [
            { original: "yesterday", scrambled: "yadretsey", index: 2 },
            { original: "take", scrambled: "ekat", index: 3 },
            { original: "much", scrambled: "hcum", index: 6 },
            { original: "today", scrambled: "yadot", index: 8 }
        ],
        date: "2025-07-13"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        scrambledAuthor: "eltotsira",
        scrambledWords: [
            { original: "during", scrambled: "gnirud", index: 2 },
            { original: "darkest", scrambled: "tsekrad", index: 4 },
            { original: "moments", scrambled: "stnemom", index: 5 },
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
            { original: "can", scrambled: "nac", index: 2 },
            { original: "you're", scrambled: "er'uoy", index: 5 },
            { original: "halfway", scrambled: "yawflah", index: 6 }
        ],
        date: "2025-07-11"
    },
    {
        text: "The only impossible journey is the one you never start.",
        author: "Robbins",
        scrambledAuthor: "snibbor",
        scrambledWords: [
            { original: "only", scrambled: "ylno", index: 1 },
            { original: "impossible", scrambled: "elbissopmi", index: 2 },
            { original: "journey", scrambled: "yenruoj", index: 3 },
            { original: "never", scrambled: "reven", index: 8 }
        ],
        date: "2025-07-10"
    },
    {
        text: "Life is what we make it, always has been, always will be.",
        author: "Moses",
        scrambledAuthor: "sesom",
        scrambledWords: [
            { original: "life", scrambled: "efil", index: 0 },
            { original: "what", scrambled: "tahw", index: 2 },
            { original: "make", scrambled: "ekam", index: 4 },
            { original: "always", scrambled: "syawla", index: 6 }
        ],
        date: "2025-07-09"
    },
    {
        text: "The best revenge is massive success.",
        author: "Sinatra",
        scrambledAuthor: "artanis",
        scrambledWords: [
            { original: "best", scrambled: "tseb", index: 1 },
            { original: "revenge", scrambled: "egnevr", index: 2 },
            { original: "massive", scrambled: "evissam", index: 4 },
            { original: "success", scrambled: "sseccus", index: 5 }
        ],
        date: "2025-07-08"
    },
    {
        text: "Whether you think you can or you think you can't, you're right.",
        author: "Ford",
        scrambledAuthor: "drof",
        scrambledWords: [
            { original: "whether", scrambled: "rehtehw", index: 0 },
            { original: "think", scrambled: "kniht", index: 2 },
            { original: "think", scrambled: "kniht", index: 7 },
            { original: "right", scrambled: "thgir", index: 13 }
        ],
        date: "2025-07-07"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        scrambledAuthor: "suicufnoc",
        scrambledWords: [
            { original: "matter", scrambled: "rettam", index: 3 },
            { original: "slowly", scrambled: "ylwols", index: 6 },
            { original: "long", scrambled: "gnol", index: 10 },
            { original: "stop", scrambled: "pots", index: 17 }
        ],
        date: "2025-07-06"
    },
    {
        text: "The greatest glory in living is not in never falling, but in rising every time we fall.",
        author: "Mandela",
        scrambledAuthor: "aledamn",
        scrambledWords: [
            { original: "greatest", scrambled: "tsetaerg", index: 1 },
            { original: "glory", scrambled: "yrolg", index: 2 },
            { original: "falling", scrambled: "gnillaf", index: 9 },
            { original: "rising", scrambled: "gnisir", index: 13 }
        ],
        date: "2025-07-05"
    },
    {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "life", scrambled: "efil", index: 1 },
            { original: "predictable", scrambled: "elbatciderp", index: 3 },
            { original: "cease", scrambled: "esaec", index: 6 },
            { original: "flavor", scrambled: "rovalfl", index: 13 }
        ],
        date: "2025-07-04"
    },
    {
        text: "If you look at what you have in life, you'll always have more.",
        author: "Winfrey",
        scrambledAuthor: "yerfniw",
        scrambledWords: [
            { original: "look", scrambled: "kool", index: 2 },
            { original: "what", scrambled: "tahw", index: 4 },
            { original: "life", scrambled: "efil", index: 8 },
            { original: "always", scrambled: "syawla", index: 11 }
        ],
        date: "2025-07-03"
    },
    {
        text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        author: "Cameron",
        scrambledAuthor: "norema",
        scrambledWords: [
            { original: "goals", scrambled: "slaog", index: 4 },
            { original: "ridiculously", scrambled: "ylsuolucidri", index: 5 },
            { original: "failure", scrambled: "eruliaf", index: 10 },
            { original: "success", scrambled: "sseccus", index: 18 }
        ],
        date: "2025-07-02"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Disney",
        scrambledAuthor: "yensid",
        scrambledWords: [
            { original: "started", scrambled: "detrats", index: 4 },
            { original: "quit", scrambled: "tiuq", index: 7 },
            { original: "talking", scrambled: "gnikla", index: 8 },
            { original: "begin", scrambled: "nigeb", index: 10 }
        ],
        date: "2025-07-01"
    },
    {
        text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        author: "Teresa",
        scrambledAuthor: "aseret",
        scrambledWords: [
            { original: "spread", scrambled: "daerps", index: 0 },
            { original: "everywhere", scrambled: "erehwyreve", index: 2 },
            { original: "leaving", scrambled: "gnivael", index: 11 },
            { original: "happier", scrambled: "reippah", index: 12 }
        ],
        date: "2025-07-31"
    },
    {
        text: "When you reach the end of your rope, tie a knot in it and hang on.",
        author: "Roosevelt",
        scrambledAuthor: "teveloosr",
        scrambledWords: [
            { original: "reach", scrambled: "hcaer", index: 2 },
            { original: "rope", scrambled: "epor", index: 8 },
            { original: "knot", scrambled: "tonk", index: 11 },
            { original: "hang", scrambled: "gnah", index: 16 }
        ],
        date: "2025-07-30"
    },
    {
        text: "Always remember that you are absolutely unique. Just like everyone else.",
        author: "Twain",
        scrambledAuthor: "niawt",
        scrambledWords: [
            { original: "remember", scrambled: "rebmemer", index: 1 },
            { original: "absolutely", scrambled: "yletulosba", index: 5 },
            { original: "unique", scrambled: "euqinu", index: 6 },
            { original: "everyone", scrambled: "enoyreve", index: 9 }
        ],
        date: "2025-07-29"
    },
    {
        text: "It is better to be hated for what you are than to be loved for what you are not.",
        author: "Gide",
        scrambledAuthor: "edig",
        scrambledWords: [
            { original: "better", scrambled: "retteb", index: 2 },
            { original: "hated", scrambled: "detah", index: 5 },
            { original: "loved", scrambled: "devol", index: 14 },
            { original: "what", scrambled: "tahw", index: 16 }
        ],
        date: "2025-07-28"
    },
    {
        text: "Do not go where the path may lead, go where there is no path and leave a trail.",
        author: "Emerson",
        scrambledAuthor: "nosreme",
        scrambledWords: [
            { original: "where", scrambled: "erehw", index: 4 },
            { original: "path", scrambled: "htap", index: 6 },
            { original: "where", scrambled: "erehw", index: 9 },
            { original: "trail", scrambled: "liar", index: 17 }
        ],
        date: "2025-07-27"
    },
    {
        text: "You have been assigned this mountain to show others it can be moved.",
        author: "Unknown",
        scrambledAuthor: "nwonknu",
        scrambledWords: [
            { original: "assigned", scrambled: "dengissa", index: 3 },
            { original: "mountain", scrambled: "niatnuom", index: 5 },
            { original: "show", scrambled: "wohs", index: 7 },
            { original: "moved", scrambled: "devom", index: 13 }
        ],
        date: "2025-07-26"
    },
    {
        text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        author: "Franklin",
        scrambledAuthor: "nilknarf",
        scrambledWords: [
            { original: "tell", scrambled: "llet", index: 0 },
            { original: "forget", scrambled: "tegrof", index: 4 },
            { original: "remember", scrambled: "rebmemer", index: 9 },
            { original: "learn", scrambled: "nrael", index: 14 }
        ],
        date: "2025-07-25"
    }
];

// Export for use in the main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quotesCalendar;
}