// Debug script to test findTodayQuote function
const quotesCalendar = require('./quotes_calendar.js');

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function findTodayQuote() {
    const today = new Date();
    const todayStr = formatDate(today);
    
    console.log('Today:', todayStr);
    console.log('Available dates in quotes:');
    
    // Check first 10 quotes for dates
    for (let i = 0; i < Math.min(10, quotesCalendar.length); i++) {
        console.log(`Quote ${i}: ${quotesCalendar[i].date} - "${quotesCalendar[i].text.substring(0, 50)}..."`);
    }
    
    // Find today's quote
    const todayQuote = quotesCalendar.find(q => q.date === todayStr);
    
    if (todayQuote) {
        console.log(`✅ Found today's quote: "${todayQuote.text}"`);
        return todayQuote;
    } else {
        console.log(`❌ No quote found for today (${todayStr})`);
        console.log('Available dates:', quotesCalendar.map(q => q.date).slice(0, 10));
        return quotesCalendar[0];
    }
}

// Test the function
const result = findTodayQuote();
console.log('\nResult:', result.text); 