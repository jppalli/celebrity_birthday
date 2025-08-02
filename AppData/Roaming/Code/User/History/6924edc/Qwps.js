// Quote Fixer - Automatically corrects all word indexes in the quotes database
const fs = require('fs');

// Import the original quotes
const quotesCalendar = require('./quotes_calendar.js');

function fixQuoteIndexes(quote) {
    const words = quote.text.split(' ');
    const correctedScrambledWords = [];

    quote.scrambledWords.forEach(scrambledWord => {
        const { original, scrambled } = scrambledWord;
        
        // Find the correct index for this word
        let correctIndex = -1;
        
        // Try to find exact match first
        for (let i = 0; i < words.length; i++) {
            const cleanWord = words[i].toLowerCase().replace(/[.,!?";]/g, '');
            if (cleanWord === original.toLowerCase()) {
                correctIndex = i;
                break;
            }
        }
        
        // If not found, try partial matches (for contractions, etc.)
        if (correctIndex === -1) {
            for (let i = 0; i < words.length; i++) {
                const cleanWord = words[i].toLowerCase().replace(/[.,!?";']/g, '');
                if (cleanWord.includes(original.toLowerCase()) || original.toLowerCase().includes(cleanWord)) {
                    correctIndex = i;
                    break;
                }
            }
        }

        if (correctIndex !== -1) {
            correctedScrambledWords.push({
                original,
                scrambled,
                index: correctIndex
            });
        } else {
            console.log(`⚠️  Could not find word "${original}" in quote: "${quote.text}"`);
            // Keep original index as fallback
            correctedScrambledWords.push(scrambledWord);
        }
    });

    return {
        ...quote,
        scrambledWords: correctedScrambledWords
    };
}

function generateCorrectedQuotesFile() {
    console.log('🔧 Fixing all quote indexes...\n');
    
    const correctedQuotes = quotesCalendar.map((quote, index) => {
        const corrected = fixQuoteIndexes(quote);
        
        // Validate the correction
        const words = quote.text.split(' ');
        let isValid = true;
        
        corrected.scrambledWords.forEach(sw => {
            if (sw.index >= words.length) {
                isValid = false;
                return;
            }
            const actualWord = words[sw.index].toLowerCase().replace(/[.,!?";]/g, '');
            if (actualWord !== sw.original.toLowerCase()) {
                isValid = false;
            }
        });
        
        if (isValid) {
            console.log(`✅ ${quote.date}: Fixed successfully`);
        } else {
            console.log(`❌ ${quote.date}: Still has issues`);
        }
        
        return corrected;
    });
    
    // Generate the new file content
    const fileContent = `const quotesCalendar = ${JSON.stringify(correctedQuotes, null, 4)};

// Export for use in the main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quotesCalendar;
}`;

    // Write to a new file
    fs.writeFileSync('quotes_calendar_fixed.js', fileContent);
    
    console.log('\n✅ Generated quotes_calendar_fixed.js');
    console.log('📝 Please review the fixed file and replace the original when ready.');
    
    return correctedQuotes;
}

// Run the fix
if (require.main === module) {
    const correctedQuotes = generateCorrectedQuotesFile();
    
    // Run validation on the corrected quotes
    console.log('\n🔍 Validating corrected quotes...');
    
    let validCount = 0;
    let totalCount = correctedQuotes.length;
    
    correctedQuotes.forEach(quote => {
        const words = quote.text.split(' ');
        let isValid = true;
        
        quote.scrambledWords.forEach(sw => {
            if (sw.index >= words.length) {
                isValid = false;
                return;
            }
            const actualWord = words[sw.index].toLowerCase().replace(/[.,!?";]/g, '');
            if (actualWord !== sw.original.toLowerCase()) {
                isValid = false;
            }
        });
        
        if (isValid) {
            validCount++;
        }
    });
    
    console.log('\n📊 CORRECTION RESULTS:');
    console.log('='.repeat(50));
    console.log(`Total Quotes: ${totalCount}`);
    console.log(`Valid After Fix: ${validCount}`);
    console.log(`Success Rate: ${((validCount / totalCount) * 100).toFixed(1)}%`);
    console.log(`Improvement: +${((validCount / totalCount) * 100 - 37.0).toFixed(1)}%`);
}

module.exports = { fixQuoteIndexes, generateCorrectedQuotesFile };