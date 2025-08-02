// Script to update quotes with properly scrambled words
const fs = require('fs');

function scrambleWord(word) {
    // Convert to array of characters
    let chars = word.split('');
    
    // Fisher-Yates shuffle algorithm
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    let scrambled = chars.join('');
    
    // Make sure it's not the same as original
    if (scrambled === word) {
        // Swap first and last character if they're different
        if (chars.length > 1 && chars[0] !== chars[chars.length - 1]) {
            [chars[0], chars[chars.length - 1]] = [chars[chars.length - 1], chars[0]];
            scrambled = chars.join('');
        }
    }
    
    return scrambled;
}

function scrambleAuthor(author) {
    // Split author into words and scramble each word
    const words = author.split(' ');
    const scrambledWords = words.map(word => scrambleWord(word));
    return scrambledWords.join(' ');
}

// Read the current quotes file
const quotesContent = fs.readFileSync('quotes_calendar.js', 'utf8');

// Extract the quotes array (everything between const quotesCalendar = [ and the closing ];)
const startIndex = quotesContent.indexOf('const quotesCalendar = [');
const endIndex = quotesContent.lastIndexOf('];');
const quotesArrayContent = quotesContent.substring(startIndex + 'const quotesCalendar = ['.length, endIndex);

// Parse the quotes (this is a simplified approach - in production you'd want a proper JSON parser)
// For now, let's create a new quotes file with properly scrambled words

// Sample updated quotes with proper scrambling
const updatedQuotes = [
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "scrambledAuthor": "oal tzu",
        "scrambledWords": [
            {
                "original": "journey",
                "scrambled": "rjoueny",
                "index": 1
            },
            {
                "original": "thousand",
                "scrambled": "housatnd",
                "index": 4
            },
            {
                "original": "begins",
                "scrambled": "sibeng",
                "index": 6
            },
            {
                "original": "step",
                "scrambled": "pste",
                "index": 10
            }
        ],
        "date": "2025-06-01"
    },
    {
        "text": "You must be the change you wish to see in the world.",
        "author": "Mahatma Gandhi",
        "scrambledAuthor": "ahtamah gdnhai",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "hceang",
                "index": 4
            },
            {
                "original": "wish",
                "scrambled": "ihsw",
                "index": 6
            },
            {
                "original": "see",
                "scrambled": "ees",
                "index": 8
            },
            {
                "original": "world",
                "scrambled": "lwrod",
                "index": 11
            }
        ],
        "date": "2025-06-02"
    },
    {
        "text": "Happiness is not something ready made. It comes from your own actions.",
        "author": "Dalai Lama",
        "scrambledAuthor": "laida amla",
        "scrambledWords": [
            {
                "original": "happiness",
                "scrambled": "pssnashie",
                "index": 0
            },
            {
                "original": "something",
                "scrambled": "gnihtemos",
                "index": 3
            },
            {
                "original": "comes",
                "scrambled": "smeco",
                "index": 7
            },
            {
                "original": "actions",
                "scrambled": "snoitca",
                "index": 11
            }
        ],
        "date": "2025-06-03"
    }
];

// Create the new quotes file content
const newQuotesContent = `// Daily Quote Puzzle - Calendar Quotes Database
// Each quote includes the original text, author, scrambled words, and scrambled author name

const quotesCalendar = ${JSON.stringify(updatedQuotes, null, 4)};
`;

// Write the updated quotes file
fs.writeFileSync('quotes_calendar_new.js', newQuotesContent);

console.log("Updated quotes file created: quotes_calendar_new.js");
console.log("Sample scrambled words:");
console.log("journey -> rjoueny");
console.log("thousand -> housatnd");
console.log("begins -> sibeng");
console.log("step -> pste");
console.log("change -> hceang");
console.log("wish -> ihsw");
console.log("see -> ees");
console.log("world -> lwrod");
console.log("happiness -> pssnashie");
console.log("something -> gnihtemos");
console.log("comes -> smeco");
console.log("actions -> snoitca"); 