// Script to properly scramble words in quotes
// This will replace the simple reversal with actual scrambling

function scrambleWord(word) {
    // Convert to array of characters
    let chars = word.split('');
    
    // Fisher-Yates shuffle algorithm
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    let scrambled = chars.join('');
    
    // Make sure it's not the same as original (very unlikely but possible)
    if (scrambled === word) {
        // Swap first and last character if they're different
        if (chars.length > 1 && chars[0] !== chars[chars.length - 1]) {
            [chars[0], chars[chars.length - 1]] = [chars[chars.length - 1], chars[0]];
            scrambled = chars.join('');
        }
    }
    
    return scrambled;
}

// Test the scrambling function
console.log("Testing scramble function:");
console.log("journey ->", scrambleWord("journey"));
console.log("thousand ->", scrambleWord("thousand"));
console.log("begins ->", scrambleWord("begins"));
console.log("step ->", scrambleWord("step"));
console.log("change ->", scrambleWord("change"));
console.log("wish ->", scrambleWord("wish"));
console.log("see ->", scrambleWord("see"));
console.log("world ->", scrambleWord("world"));
console.log("happiness ->", scrambleWord("happiness"));
console.log("something ->", scrambleWord("something"));
console.log("comes ->", scrambleWord("comes"));
console.log("actions ->", scrambleWord("actions"));

// Generate some sample scrambled words
console.log("\nSample scrambled words:");
const testWords = ["journey", "thousand", "begins", "step", "change", "wish", "see", "world"];
testWords.forEach(word => {
    console.log(`${word} -> ${scrambleWord(word)}`);
}); 