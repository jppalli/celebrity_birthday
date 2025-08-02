// Script to generate a full year of quotes with properly scrambled words
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

// Comprehensive list of inspirational quotes
const allQuotes = [
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "wordsToScramble": ["journey", "thousand", "begins", "step"]
    },
    {
        "text": "You must be the change you wish to see in the world.",
        "author": "Mahatma Gandhi",
        "wordsToScramble": ["change", "wish", "see", "world"]
    },
    {
        "text": "Happiness is not something ready made. It comes from your own actions.",
        "author": "Dalai Lama",
        "wordsToScramble": ["happiness", "something", "comes", "actions"]
    },
    {
        "text": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
        "wordsToScramble": ["what", "what", "where", "are"]
    },
    {
        "text": "Every moment is a fresh beginning.",
        "author": "T.S. Eliot",
        "wordsToScramble": ["every", "moment", "fresh", "beginning"]
    },
    {
        "text": "The only limit to our realization of tomorrow is our doubts of today.",
        "author": "Franklin D. Roosevelt",
        "wordsToScramble": ["limit", "realization", "doubts", "today"]
    },
    {
        "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "author": "Zig Ziglar",
        "wordsToScramble": ["achieving", "goals", "become", "goals"]
    },
    {
        "text": "The mind is everything. What you think you become.",
        "author": "Buddha",
        "wordsToScramble": ["mind", "everything", "think", "become"]
    },
    {
        "text": "The best way to find yourself is to lose yourself in the service of others.",
        "author": "Mahatma Gandhi",
        "wordsToScramble": ["best", "find", "lose", "service"]
    },
    {
        "text": "If you want to lift yourself up, lift up someone else.",
        "author": "Booker T. Washington",
        "wordsToScramble": ["want", "lift", "yourself", "someone"]
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "wordsToScramble": ["only", "great", "love", "work"]
    },
    {
        "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston Churchill",
        "wordsToScramble": ["success", "failure", "courage", "continue"]
    },
    {
        "text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt",
        "wordsToScramble": ["future", "belongs", "believe", "dreams"]
    },
    {
        "text": "It is during our darkest moments that we must focus to see the light.",
        "author": "Aristotle",
        "wordsToScramble": ["darkest", "moments", "focus", "light"]
    },
    {
        "text": "Whoever is happy will make others happy too.",
        "author": "Anne Frank",
        "wordsToScramble": ["whoever", "happy", "make", "others"]
    },
    {
        "text": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "wordsToScramble": ["where", "path", "trail", "leave"]
    },
    {
        "text": "You will face many defeats in life, but never let yourself be defeated.",
        "author": "Maya Angelou",
        "wordsToScramble": ["face", "defeats", "never", "defeated"]
    },
    {
        "text": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "author": "Nelson Mandela",
        "wordsToScramble": ["greatest", "glory", "rising", "fall"]
    },
    {
        "text": "In the middle of difficulty lies opportunity.",
        "author": "Albert Einstein",
        "wordsToScramble": ["middle", "difficulty", "lies", "opportunity"]
    },
    {
        "text": "Keep your face always toward the sunshine, and shadows will fall behind you.",
        "author": "Walt Whitman",
        "wordsToScramble": ["keep", "face", "sunshine", "shadows"]
    },
    {
        "text": "The only person you are destined to become is the person you decide to be.",
        "author": "Ralph Waldo Emerson",
        "wordsToScramble": ["person", "destined", "decide", "become"]
    },
    {
        "text": "Believe you can and you're halfway there.",
        "author": "Theodore Roosevelt",
        "wordsToScramble": ["believe", "halfway", "there", "can"]
    },
    {
        "text": "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
        "author": "Jimmy Dean",
        "wordsToScramble": ["change", "direction", "adjust", "destination"]
    },
    {
        "text": "Nothing is impossible, the word itself says 'I'm possible'!",
        "author": "Audrey Hepburn",
        "wordsToScramble": ["nothing", "impossible", "possible", "word"]
    },
    {
        "text": "The only limit to our realization of tomorrow will be our doubts of today.",
        "author": "Franklin D. Roosevelt",
        "wordsToScramble": ["limit", "realization", "doubts", "today"]
    },
    {
        "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "author": "Zig Ziglar",
        "wordsToScramble": ["achieving", "goals", "become", "important"]
    },
    {
        "text": "The mind is everything. What you think you become.",
        "author": "Buddha",
        "wordsToScramble": ["mind", "everything", "think", "become"]
    },
    {
        "text": "The best way to find yourself is to lose yourself in the service of others.",
        "author": "Mahatma Gandhi",
        "wordsToScramble": ["best", "find", "lose", "service"]
    },
    {
        "text": "If you want to lift yourself up, lift up someone else.",
        "author": "Booker T. Washington",
        "wordsToScramble": ["want", "lift", "yourself", "someone"]
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "wordsToScramble": ["only", "great", "love", "work"]
    },
    {
        "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston Churchill",
        "wordsToScramble": ["success", "failure", "courage", "continue"]
    },
    {
        "text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt",
        "wordsToScramble": ["future", "belongs", "believe", "dreams"]
    },
    {
        "text": "It is during our darkest moments that we must focus to see the light.",
        "author": "Aristotle",
        "wordsToScramble": ["darkest", "moments", "focus", "light"]
    },
    {
        "text": "Whoever is happy will make others happy too.",
        "author": "Anne Frank",
        "wordsToScramble": ["whoever", "happy", "make", "others"]
    },
    {
        "text": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "wordsToScramble": ["where", "path", "trail", "leave"]
    },
    {
        "text": "You will face many defeats in life, but never let yourself be defeated.",
        "author": "Maya Angelou",
        "wordsToScramble": ["face", "defeats", "never", "defeated"]
    },
    {
        "text": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "author": "Nelson Mandela",
        "wordsToScramble": ["greatest", "glory", "rising", "fall"]
    },
    {
        "text": "In the middle of difficulty lies opportunity.",
        "author": "Albert Einstein",
        "wordsToScramble": ["middle", "difficulty", "lies", "opportunity"]
    },
    {
        "text": "Keep your face always toward the sunshine, and shadows will fall behind you.",
        "author": "Walt Whitman",
        "wordsToScramble": ["keep", "face", "sunshine", "shadows"]
    },
    {
        "text": "The only person you are destined to become is the person you decide to be.",
        "author": "Ralph Waldo Emerson",
        "wordsToScramble": ["person", "destined", "decide", "become"]
    },
    {
        "text": "Believe you can and you're halfway there.",
        "author": "Theodore Roosevelt",
        "wordsToScramble": ["believe", "halfway", "there", "can"]
    },
    {
        "text": "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
        "author": "Jimmy Dean",
        "wordsToScramble": ["change", "direction", "adjust", "destination"]
    },
    {
        "text": "Nothing is impossible, the word itself says 'I'm possible'!",
        "author": "Audrey Hepburn",
        "wordsToScramble": ["nothing", "impossible", "possible", "word"]
    }
];

// Generate dates for the entire year (2025)
function generateDates() {
    const dates = [];
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-31');
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
    }
    
    return dates;
}

// Process quotes and create the final array
function processQuotes() {
    const dates = generateDates();
    const processedQuotes = [];
    
    allQuotes.forEach((quote, index) => {
        const dateIndex = index % dates.length;
        const date = dates[dateIndex];
        
        // Find the words in the text and get their indices
        const textWords = quote.text.split(' ');
        const scrambledWords = [];
        
        quote.wordsToScramble.forEach((wordToScramble, wordIndex) => {
            const wordIndexInText = textWords.findIndex(word => 
                word.toLowerCase().replace(/[^a-z]/g, '') === wordToScramble.toLowerCase()
            );
            
            if (wordIndexInText !== -1) {
                scrambledWords.push({
                    "original": wordToScramble,
                    "scrambled": scrambleWord(wordToScramble),
                    "index": wordIndexInText
                });
            }
        });
        
        processedQuotes.push({
            "text": quote.text,
            "author": quote.author,
            "scrambledAuthor": scrambleAuthor(quote.author),
            "scrambledWords": scrambledWords,
            "date": date
        });
    });
    
    return processedQuotes;
}

// Generate the quotes
const finalQuotes = processQuotes();

// Create the file content
const fileContent = `// Daily Quote Puzzle - Calendar Quotes Database
// Each quote includes the original text, author, scrambled words, and scrambled author name

const quotesCalendar = ${JSON.stringify(finalQuotes, null, 4)};
`;

// Write the file
fs.writeFileSync('quotes_calendar.js', fileContent);

console.log(`Generated ${finalQuotes.length} quotes with properly scrambled words!`);
console.log(`Date range: ${finalQuotes[0].date} to ${finalQuotes[finalQuotes.length - 1].date}`);
console.log("\nSample scrambled words:");
console.log("journey ->", scrambleWord("journey"));
console.log("thousand ->", scrambleWord("thousand"));
console.log("begins ->", scrambleWord("begins"));
console.log("step ->", scrambleWord("step"));
console.log("change ->", scrambleWord("change"));
console.log("wish ->", scrambleWord("wish"));
console.log("see ->", scrambleWord("see"));
console.log("world ->", scrambleWord("world")); 