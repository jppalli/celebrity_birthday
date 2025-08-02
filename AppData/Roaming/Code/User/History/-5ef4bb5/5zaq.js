// Author Name Updater - Updates author names with proper full names or last names
const fs = require('fs');

// Import the current quotes
const quotesCalendar = require('./quotes_calendar.js');

// Author name mappings - full names for famous figures, last names for very well-known ones
const authorMappings = {
    // Full names for famous figures (need more recognition)
    "Tzu": "Lao Tzu",
    "Gandhi": "Mahatma Gandhi",
    "Roosevelt": "Theodore Roosevelt", // Most Roosevelt quotes are from Theodore
    "Eliot": "T.S. Eliot",
    "Whitman": "Walt Whitman",
    "Emerson": "Ralph Waldo Emerson",
    "Watts": "Alan Watts",
    "Keller": "Helen Keller",
    "Gretzky": "Wayne Gretzky",
    "Peale": "Norman Vincent Peale",
    "Twain": "Mark Twain",
    "Hill": "Napoleon Hill",
    "James": "William James",
    "Jackson": "Jesse Jackson",
    "Lewis": "C.S. Lewis",
    "Hillary": "Edmund Hillary",
    "Bernhardt": "Sarah Bernhardt",
    "Disney": "Walt Disney",
    "Cameron": "James Cameron",
    "Winfrey": "Oprah Winfrey",
    "Mandela": "Nelson Mandela",
    "Ford": "Henry Ford",
    "Sinatra": "Frank Sinatra",
    "Moses": "Grandma Moses",
    "Robbins": "Tony Robbins",
    "Rogers": "Will Rogers",
    "Jobs": "Steve Jobs",
    "Einstein": "Albert Einstein",
    "Churchill": "Winston Churchill",
    "Wilde": "Oscar Wilde",
    "Lennon": "John Lennon",
    "Franklin": "Benjamin Franklin",
    "Gide": "André Gide",
    "Teresa": "Mother Teresa",
    "Ziglar": "Zig Ziglar",
    "Nader": "Ralph Nader",
    "Drucker": "Peter Drucker",
    "Thoreau": "Henry David Thoreau",
    "Charles": "Lewis Carroll", // Assuming this is from Alice in Wonderland context
    "Milne": "A.A. Milne",
    "Zuckerberg": "Mark Zuckerberg",
    "Levenson": "Sam Levenson",
    "Rohn": "Jim Rohn",
    "Frost": "Robert Frost",
    "Babbel": "Irving Babbitt",
    "Washington": "Booker T. Washington",
    "Tracy": "Brian Tracy",
    "Clarke": "Arthur C. Clarke",
    
    // Keep single names for very well-known figures
    "Buddha": "Buddha",
    "Aristotle": "Aristotle",
    "Plato": "Plato",
    "Socrates": "Socrates",
    "Confucius": "Confucius",
    "Plutarch": "Plutarch",
    
    // Keep special cases as-is
    "Dalai Lama": "Dalai Lama",
    "John Paul II": "Pope John Paul II",
    "Unknown": "Unknown",
    "Proverb": "Chinese Proverb"
};

function scrambleText(text) {
    // Simple scrambling - reverse the text for now
    // This could be enhanced with more sophisticated scrambling later
    return text.toLowerCase().split('').reverse().join('');
}

function updateAuthors() {
    console.log('🔄 Updating author names...\n');
    
    const updatedQuotes = quotesCalendar.map((quote, index) => {
        const currentAuthor = quote.author;
        const newAuthor = authorMappings[currentAuthor] || currentAuthor;
        
        if (newAuthor !== currentAuthor) {
            console.log(`✅ ${quote.date}: "${currentAuthor}" → "${newAuthor}"`);
            
            return {
                ...quote,
                author: newAuthor,
                scrambledAuthor: scrambleText(newAuthor)
            };
        } else {
            console.log(`➡️  ${quote.date}: "${currentAuthor}" (unchanged)`);
            return quote;
        }
    });
    
    // Generate the new file content
    const fileContent = `const quotesCalendar = ${JSON.stringify(updatedQuotes, null, 4)};

// Export for use in the main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quotesCalendar;
}`;

    // Write to a new file first for review
    fs.writeFileSync('quotes_calendar_updated.js', fileContent);
    
    console.log('\n✅ Generated quotes_calendar_updated.js');
    console.log('📝 Review the updated file and replace the original when ready.');
    
    return updatedQuotes;
}

// Run the update
if (require.main === module) {
    const updatedQuotes = updateAuthors();
    
    console.log('\n📊 UPDATE SUMMARY:');
    console.log('='.repeat(50));
    
    const changes = updatedQuotes.filter((quote, index) => 
        quote.author !== quotesCalendar[index].author
    );
    
    console.log(`Total Quotes: ${updatedQuotes.length}`);
    console.log(`Authors Updated: ${changes.length}`);
    console.log(`Authors Unchanged: ${updatedQuotes.length - changes.length}`);
    
    if (changes.length > 0) {
        console.log('\n🔄 UPDATED AUTHORS:');
        console.log('='.repeat(50));
        changes.forEach((quote, index) => {
            const originalIndex = quotesCalendar.findIndex(q => q.date === quote.date);
            const originalAuthor = quotesCalendar[originalIndex].author;
            console.log(`• ${originalAuthor} → ${quote.author}`);
        });
    }
}

module.exports = { updateAuthors, authorMappings };