// Daily Quote Puzzles for July 2025
// Each day has a unique quote with proper scrambles and hints

const JULY_QUOTES = {
    1: {
        text: "The only way to do {0} work is to {1} what you do.",
        author: "{2}",
        answers: ["great", "love", "jobs"],
        scrambles: ["TAERG", "ELOV", "BJOS"],
        hints: [
            "Excellent or outstanding in quality",
            "To have deep affection for something",
            "Co-founder of Apple Inc."
        ]
    },
    2: {
        text: "The {0} to get started is to quit talking and begin {1}.",
        author: "{2}",
        answers: ["way", "doing", "disney"],
        scrambles: ["YAW", "GNOID", "YENSID"],
        hints: [
            "A method or path to achieve something",
            "To perform an action or activity",
            "Creator of Mickey Mouse"
        ]
    },
    3: {
        text: "In the {0} of difficulty lies {1}.",
        author: "{2}",
        answers: ["middle", "opportunity", "einstein"],
        scrambles: ["ELDIDM", "YTINNUTROPPO", "NIETSNIE"],
        hints: [
            "The center point of something",
            "A chance for advancement or progress",
            "Famous physicist, E=mc²"
        ]
    },
    4: {
        text: "It is during our {0} moments that we must {1} to see the light.",
        author: "{2}",
        answers: ["darkest", "focus", "aristotle"],
        scrambles: ["TSEKRAD", "SUCOF", "ELTOTSIRA"],
        hints: [
            "Most difficult or gloomy times",
            "To concentrate attention or effort",
            "Ancient Greek philosopher"
        ]
    },
    5: {
        text: "The {0} thing in life is to {1} yourself.",
        author: "{2}",
        answers: ["hardest", "be", "wilde"],
        scrambles: ["TSEDRAH", "EB", "EDLIW"],
        hints: [
            "Most difficult or challenging",
            "To exist as your authentic self",
            "Irish playwright, wrote Dorian Gray"
        ]
    },
    6: {
        text: "An {0} life is not worth {1}.",
        author: "{2}",
        answers: ["unexamined", "living", "socrates"],
        scrambles: ["DENIMAEXNU", "GNIVIL", "SETARCOS"],
        hints: [
            "Not carefully analyzed or considered",
            "The state of being alive",
            "Ancient Greek philosopher, teacher of Plato"
        ]
    },
    7: {
        text: "Be the {0} you wish to see in the {1}.",
        author: "{2}",
        answers: ["change", "world", "gandhi"],
        scrambles: ["EGNAHC", "DLROW", "IHDNAG"],
        hints: [
            "To make or become different",
            "The earth and all its people",
            "Indian independence leader"
        ]
    },
    8: {
        text: "The {0} of a thousand miles begins with one {1}.",
        author: "{2}",
        answers: ["journey", "step", "laozi"],
        scrambles: ["YENRUOJ", "PETS", "IZOAL"],
        hints: [
            "A long trip or voyage",
            "A single movement of the foot",
            "Ancient Chinese philosopher"
        ]
    },
    9: {
        text: "Yesterday is {0}, tomorrow is a mystery, today is a {1}.",
        author: "{2}",
        answers: ["history", "gift", "roosevelt"],
        scrambles: ["YROTSIH", "TFIG", "TLEVESOOR"],
        hints: [
            "Past events and records",
            "Something given freely to someone",
            "US President during Great Depression"
        ]
    },
    10: {
        text: "The best time to plant a {0} was 20 years ago. The second best time is {1}.",
        author: "{2}",
        answers: ["tree", "now", "proverb"],
        scrambles: ["EERT", "WON", "BREVORP"],
        hints: [
            "A large woody plant",
            "At this present moment",
            "Traditional wise saying"
        ]
    },
    11: {
        text: "It does not matter how {0} you go as long as you do not {1}.",
        author: "{2}",
        answers: ["slowly", "stop", "confucius"],
        scrambles: ["YLWOLS", "POTS", "SUICUFNOC"],
        hints: [
            "At a slow pace or speed",
            "To cease movement or action",
            "Ancient Chinese teacher and philosopher"
        ]
    },
    12: {
        text: "The only {0} thing is {1}.",
        author: "{2}",
        answers: ["constant", "change", "heraclitus"],
        scrambles: ["TNATSNOC", "EGNAHC", "SUTILCAREH"],
        hints: [
            "Never changing or varying",
            "To become different",
            "Ancient Greek philosopher of flux"
        ]
    },
    13: {
        text: "Life is what happens to you while you're busy making other {0}.",
        author: "{2}",
        answers: ["plans", "lennon"],
        scrambles: ["SNALP", "NONNEL"],
        hints: [
            "Arrangements or schemes for the future",
            "Beatles member and peace activist"
        ]
    },
    14: {
        text: "The {0} who moves a mountain begins by carrying away small {1}.",
        author: "{2}",
        answers: ["person", "stones", "confucius"],
        scrambles: ["NOSREP", "SENOTS", "SUICUFNOC"],
        hints: [
            "An individual human being",
            "Small pieces of rock",
            "Ancient Chinese philosopher"
        ]
    },
    15: {
        text: "Success is not {0}, failure is not fatal: it is the {1} to continue that counts.",
        author: "{2}",
        answers: ["final", "courage", "churchill"],
        scrambles: ["LANIF", "EGARUOC", "LLIHCRUHC"],
        hints: [
            "Last or ultimate",
            "Bravery in the face of danger",
            "British Prime Minister during WWII"
        ]
    },
    16: {
        text: "The {0} you become, the more {1} you attract.",
        author: "{2}",
        answers: ["better", "good", "rohn"],
        scrambles: ["RETTEB", "DOOG", "NHOR"],
        hints: [
            "Of higher quality or standard",
            "Positive, beneficial, or desirable",
            "American motivational speaker"
        ]
    },
    17: {
        text: "Don't watch the {0}, be the {0}.",
        author: "{2}",
        answers: ["clock", "unknown"],
        scrambles: ["KCOLC", "NWONKNU"],
        hints: [
            "Device that shows time",
            "Author not identified"
        ]
    },
    18: {
        text: "The {0} to happiness is not in seeking more, but in developing the {1} to enjoy less.",
        author: "{2}",
        answers: ["secret", "capacity", "socrates"],
        scrambles: ["TERCES", "YTICAPAC", "SETARCOS"],
        hints: [
            "Hidden knowledge or information",
            "The ability or power to do something",
            "Ancient Greek philosopher"
        ]
    },
    19: {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies {0} us.",
        author: "{2}",
        answers: ["within", "emerson"],
        scrambles: ["NIHTIW", "NOSREME"],
        hints: [
            "Inside or internal to something",
            "American transcendentalist writer"
        ]
    },
    20: {
        text: "The {0} is not to be better than someone else, but to be better than you were {1}.",
        author: "{2}",
        answers: ["goal", "yesterday", "unknown"],
        scrambles: ["LAOG", "YADRETSEY", "NWONKNU"],
        hints: [
            "An objective or target to achieve",
            "The day before today",
            "Author not identified"
        ]
    },
    21: {
        text: "You are never too {0} to set another goal or to dream a new {1}.",
        author: "{2}",
        answers: ["old", "dream", "lewis"],
        scrambles: ["DLO", "MAERD", "SIWEL"],
        hints: [
            "Advanced in age or years",
            "A cherished aspiration or ambition",
            "Author C.S. Lewis"
        ]
    },
    22: {
        text: "Believe you can and you're {0} way there.",
        author: "{2}",
        answers: ["halfway", "roosevelt"],
        scrambles: ["YAWFLAH", "TLEVESOOR"],
        hints: [
            "Partially complete, at the midpoint",
            "26th President of the United States"
        ]
    },
    23: {
        text: "The {0} thing you can be is {1}.",
        author: "{2}",
        answers: ["best", "yourself", "unknown"],
        scrambles: ["TSEB", "FLESRUOY", "NWONKNU"],
        hints: [
            "Of the highest quality or standard",
            "Your own self, not someone else",
            "Author not identified"
        ]
    },
    24: {
        text: "Don't let {0} stop you from doing what you {1}.",
        author: "{2}",
        answers: ["fear", "love", "unknown"],
        scrambles: ["RAEF", "EVOL", "NWONKNU"],
        hints: [
            "Feeling of anxiety or apprehension",
            "To have deep affection for",
            "Author not identified"
        ]
    },
    25: {
        text: "The {0} time to be happy is {1}.",
        author: "{2}",
        answers: ["best", "now", "unknown"],
        scrambles: ["TSEB", "WON", "NWONKNU"],
        hints: [
            "Of the highest quality",
            "At this present moment",
            "Author not identified"
        ]
    },
    26: {
        text: "Life is {0}% what happens to you and {1}% how you react to it.",
        author: "{2}",
        answers: ["ten", "ninety", "swindoll"],
        scrambles: ["NET", "YTENNIN", "LLODNIWS"],
        hints: [
            "The number 10",
            "The number 90",
            "American pastor and author"
        ]
    },
    27: {
        text: "The {0} to get ahead is to get {1}.",
        author: "{2}",
        answers: ["way", "started", "twain"],
        scrambles: ["YAW", "DETRATS", "NIAWT"],
        hints: [
            "A method or path forward",
            "To begin or commence",
            "American writer Mark Twain"
        ]
    },
    28: {
        text: "Your {0} becomes your {1}.",
        author: "{2}",
        answers: ["attitude", "destiny", "gandhi"],
        scrambles: ["EDUTTITTA", "YNITSESD", "IHDNAG"],
        hints: [
            "Your mental outlook or approach",
            "Your fate or future outcome",
            "Indian independence leader"
        ]
    },
    29: {
        text: "The {0} is not in our stars, but in {1}.",
        author: "{2}",
        answers: ["fault", "ourselves", "shakespeare"],
        scrambles: ["TLUAF", "SEVLESRUO", "ERAEPSEKAH"],
        hints: [
            "Responsibility or blame",
            "We ourselves, not others",
            "English playwright and poet"
        ]
    },
    30: {
        text: "A {0} today is worth two {1}.",
        author: "{2}",
        answers: ["bird", "tomorrow", "proverb"],
        scrambles: ["DRIB", "WORROMOT", "BREVORP"],
        hints: [
            "A flying animal with feathers",
            "The day after today",
            "Traditional wise saying"
        ]
    },
    31: {
        text: "The {0} of all knowledge is to {1} yourself.",
        author: "{2}",
        answers: ["beginning", "know", "socrates"],
        scrambles: ["GNINNIGEB", "WONK", "SETARCOS"],
        hints: [
            "The start or first part",
            "To be aware of or understand",
            "Ancient Greek philosopher"
        ]
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JULY_QUOTES;
}