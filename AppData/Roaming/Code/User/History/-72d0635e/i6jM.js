// Quote Validation Tool
// This script validates that all word indexes in quotes match the actual word positions

const quotesCalendar = require('./quotes_calendar.js');

function validateQuotes() {
    const errors = [];
    let totalQuotes = 0;
    let validQuotes = 0;

    console.log('🔍 Validating Quote Database...\n');

    quotesCalendar.forEach((quote, quoteIndex) => {
        totalQuotes++;
        const words = quote.text.split(' ');
        let quoteValid = true;
        const quoteErrors = [];

        console.log(`📅 ${quote.date}: "${quote.text}"`);
        console.log(`👤 Author: ${quote.author} (scrambled: ${quote.scrambledAuthor})`);

        // Validate each scrambled word
        quote.scrambledWords.forEach((scrambledWord, wordIndex) => {
            const { original, scrambled, index } = scrambledWord;
            
            // Check if index is within bounds
            if (index >= words.length) {
                quoteErrors.push(`❌ Word "${original}" has index ${index} but quote only has ${words.length} words`);
                quoteValid = false;
                return;
            }

            // Get the actual word at that index
            const actualWord = words[index].toLowerCase().replace(/[.,!?";]/g, '');
            const expectedWord = original.toLowerCase();

            if (actualWord !== expectedWord) {
                quoteErrors.push(`❌ Index ${index}: Expected "${expectedWord}" but found "${actualWord}"`);
                quoteValid = false;
            } else {
                console.log(`✅ Index ${index}: "${original}" → "${scrambled}" ✓`);
            }
        });

        if (quoteValid) {
            validQuotes++;
            console.log('✅ Quote is valid!\n');
        } else {
            console.log('❌ Quote has errors:');
            quoteErrors.forEach(error => console.log(`   ${error}`));
            console.log('');
            
            errors.push({
                date: quote.date,
                text: quote.text,
                errors: quoteErrors
            });
        }
    });

    // Summary
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Quotes: ${totalQuotes}`);
    console.log(`Valid Quotes: ${validQuotes}`);
    console.log(`Invalid Quotes: ${totalQuotes - validQuotes}`);
    console.log(`Success Rate: ${((validQuotes / totalQuotes) * 100).toFixed(1)}%`);

    if (errors.length > 0) {
        console.log('\n🚨 QUOTES WITH ERRORS:');
        console.log('='.repeat(50));
        errors.forEach((error, index) => {
            console.log(`${index + 1}. ${error.date}: "${error.text}"`);
            error.errors.forEach(err => console.log(`   ${err}`));
            console.log('');
        });
    }

    return {
        totalQuotes,
        validQuotes,
        errors,
        successRate: (validQuotes / totalQuotes) * 100
    };
}

function generateCorrectedQuote(quote) {
    const words = quote.text.split(' ');
    const correctedScrambledWords = [];

    quote.scrambledWords.forEach(scrambledWord => {
        const { original, scrambled } = scrambledWord;
        
        // Find the correct index for this word
        const correctIndex = words.findIndex((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[.,!?";]/g, '');
            return cleanWord === original.toLowerCase();
        });

        if (correctIndex !== -1) {
            correctedScrambledWords.push({
                original,
                scrambled,
                index: correctIndex
            });
        } else {
            console.log(`⚠️  Could not find word "${original}" in quote: "${quote.text}"`);
        }
    });

    return {
        ...quote,
        scrambledWords: correctedScrambledWords
    };
}

// Run validation
if (require.main === module) {
    const results = validateQuotes();
    
    if (results.errors.length > 0) {
        console.log('\n🔧 Would you like to generate corrected quotes? (This would create a new file)');
    }
}

module.exports = { validateQuotes, generateCorrectedQuote };