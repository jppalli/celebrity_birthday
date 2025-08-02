// Debug script to test findTodayQuote function
// We need to manually include the quotes data since it's not a module

// Copy the quotes data from quotes_calendar.js
const quotesCalendar = [
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "scrambledAuthor": "aLo zuT",
        "scrambledWords": [
            {
                "original": "journey",
                "scrambled": "uernjoy",
                "index": 1
            },
            {
                "original": "thousand",
                "scrambled": "osnathdu",
                "index": 4
            },
            {
                "original": "begins",
                "scrambled": "sgineb",
                "index": 6
            },
            {
                "original": "step",
                "scrambled": "spet",
                "index": 10
            }
        ],
        "date": "2025-06-01"
    },
    {
        "text": "The future starts today, not tomorrow.",
        "author": "Pope John Paul II",
        "scrambledAuthor": "Ppoe oJhn ualP II",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "furtue",
                "index": 1
            },
            {
                "original": "starts",
                "scrambled": "stsart",
                "index": 2
            },
            {
                "original": "today",
                "scrambled": "ayotd",
                "index": 3
            },
            {
                "original": "tomorrow",
                "scrambled": "wmooortr",
                "index": 5
            }
        ],
        "date": "2025-08-02"
    }
];

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
    
    // Check all quotes for dates
    quotesCalendar.forEach((quote, i) => {
        console.log(`Quote ${i}: ${quote.date} - "${quote.text.substring(0, 50)}..."`);
    });
    
    // Find today's quote
    const todayQuote = quotesCalendar.find(q => q.date === todayStr);
    
    if (todayQuote) {
        console.log(`✅ Found today's quote: "${todayQuote.text}"`);
        return todayQuote;
    } else {
        console.log(`❌ No quote found for today (${todayStr})`);
        console.log('Available dates:', quotesCalendar.map(q => q.date));
        return quotesCalendar[0];
    }
}

// Test the function
const result = findTodayQuote();
console.log('\nResult:', result.text); 