// Script to properly scramble all existing words in quotes without deleting any quotes
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

// Extract the quotes array by finding the const declaration
const startIndex = quotesContent.indexOf('const quotesCalendar = [');
const endIndex = quotesContent.lastIndexOf('];');
const quotesArrayContent = quotesContent.substring(startIndex + 'const quotesCalendar = ['.length, endIndex);

// Parse the quotes (this is a simplified approach)
// We'll use eval to parse the array, but in production you'd want a proper JSON parser
let quotes;
try {
    // Create a safe context to evaluate the quotes array
    const safeQuotesContent = `[${quotesArrayContent}]`;
    quotes = eval(safeQuotesContent);
} catch (error) {
    console.error('Error parsing quotes:', error);
    process.exit(1);
}

console.log(`Found ${quotes.length} quotes to update`);

// Update all quotes with properly scrambled words
quotes.forEach((quote, quoteIndex) => {
    console.log(`Processing quote ${quoteIndex + 1}: "${quote.text.substring(0, 50)}..."`);
    
    // Scramble all words in the quote
    if (quote.scrambledWords && Array.isArray(quote.scrambledWords)) {
        quote.scrambledWords.forEach((wordObj, wordIndex) => {
            const originalWord = wordObj.original;
            const newScrambled = scrambleWord(originalWord);
            
            console.log(`  ${originalWord} -> ${newScrambled} (was: ${wordObj.scrambled})`);
            wordObj.scrambled = newScrambled;
        });
    }
    
    // Scramble the author
    if (quote.author) {
        const newScrambledAuthor = scrambleAuthor(quote.author);
        console.log(`  Author: ${quote.author} -> ${newScrambledAuthor} (was: ${quote.scrambledAuthor})`);
        quote.scrambledAuthor = newScrambledAuthor;
    }
});

// Create the new file content
const newQuotesContent = `// Daily Quote Puzzle - Calendar Quotes Database
// Each quote includes the original text, author, scrambled words, and scrambled author name

const quotesCalendar = ${JSON.stringify(quotes, null, 4)};
`;

// Write the updated quotes file
fs.writeFileSync('quotes_calendar.js', newQuotesContent);

console.log(`\n✅ Successfully updated ${quotes.length} quotes with properly scrambled words!`);
console.log(`\nSample of new scrambling:`);
console.log(`"journey" -> "${scrambleWord("journey")}"`);
console.log(`"thousand" -> "${scrambleWord("thousand")}"`);
console.log(`"begins" -> "${scrambleWord("begins")}"`);
console.log(`"step" -> "${scrambleWord("step")}"`);
console.log(`"change" -> "${scrambleWord("change")}"`);
console.log(`"wish" -> "${scrambleWord("wish")}"`);
console.log(`"see" -> "${scrambleWord("see")}"`);
console.log(`"world" -> "${scrambleWord("world")}"`);
console.log(`"happiness" -> "${scrambleWord("happiness")}"`);
console.log(`"something" -> "${scrambleWord("something")}"`);
console.log(`"comes" -> "${scrambleWord("comes")}"`);
console.log(`"actions" -> "${scrambleWord("actions")}"`);

console.log(`\n📝 All quotes have been updated with proper scrambling!`);
console.log(`📊 Total quotes processed: ${quotes.length}`);
console.log(`🎯 Words are now properly randomized instead of just reversed`); 