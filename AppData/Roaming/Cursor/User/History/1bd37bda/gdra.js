// Game state
let currentStory = null;
let playerData = {
    totalScore: 0,
    storiesCompleted: 0,
    medals: {
        bronze: 0,
        silver: 0,
        gold: 0
    },
    playerName: "WordSmith"
};

// Word database for originality scoring
let wordDatabase = {
    "adjective": {},
    "noun": {},
    "verb, past tense": {},
    "adverb": {},
    "person's name": {},
    "object": {},
    "animal": {},
    "plant": {},
    "number": {},
    "cool ship name": {},
    "planet name": {},
    "space object": {},
    "planet type": {},
    "device": {},
    "pirate name": {},
    "treasure item": {},
    "insulting plural noun": {},
    "island name": {},
    "wizard name": {},
    "magical place": {},
    "plural noun": {},
    "magical creature": {},
    "element": {},
    "spell name": {},
    "color": {},
    "small object": {}
};

// Story database
const stories = [
    {
        id: 1,
        title: "The Mysterious Quest",
        date: "August 1, 2025",
        lines: [
            { text: "In the heart of the", inputs: [{type: "adjective"}] },
            { text: "forest, a brave", inputs: [{type: "noun"}] },
            { text: "named", inputs: [{type: "person's name"}] },
            { text: "embarked on a quest to find the legendary", inputs: [
                {type: "adjective"}, 
                {type: "object"}
            ]},
            { text: "Along the way, they encountered a", inputs: [
                {type: "adjective"}, 
                {type: "animal"}
            ]},
            { text: "who spoke in", inputs: [
                {type: "adverb"}, 
                {type: "plural noun"}
            ]},
            { text: "\"To find what you seek,\" the creature", inputs: [{type: "verb, past tense"}] },
            { text: "\"you must solve the riddle of the", inputs: [
                {type: "adjective"}, 
                {type: "object"}
            ]},
            { text: "After", inputs: [{type: "verb ending in -ing"}] },
            { text: "for what felt like", inputs: [{type: "number"}] },
            { text: "days,", inputs: [{type: "person's name"}] },
            { text: "finally discovered the", inputs: [{type: "object"}] },
            { text: "hidden beneath a", inputs: [
                {type: "adjective"}, 
                {type: "plant"}
            ]},
            { text: "They returned to their village as a", inputs: [{type: "adjective"}] },
            { text: "hero, forever changed by their", inputs: [{type: "adjective"}] },
            { text: "adventure." }
        ]
    },
    {
        id: 2,
        title: "Space Adventure",
        date: "July 28, 2025",
        lines: [
            { text: "Captain", inputs: [{type: "person's name"}] },
            { text: "and the crew of the starship", inputs: [{type: "cool ship name"}] },
            { text: "were on a", inputs: [{type: "adjective"}] },
            { text: "mission to explore the", inputs: [
                {type: "adjective"}, 
                {type: "planet name"}
            ]},
            { text: "Suddenly, their sensors detected a", inputs: [
                {type: "adjective"}, 
                {type: "space object"}
            ]},
            { text: "approaching at", inputs: [{type: "adverb"}] },
            { text: "speed. \"Brace for impact!\" shouted the captain as the ship", inputs: [{type: "verb, past tense"}] },
            { text: "violently. They found themselves on a", inputs: [
                {type: "adjective"}, 
                {type: "planet type"}
            ]},
            { text: "where the inhabitants spoke in", inputs: [
                {type: "adjective"}, 
                {type: "plural noun"}
            ]},
            { text: "The alien leader", inputs: [{type: "verb, past tense"}] },
            { text: "to them, \"We have been expecting you. We need your help to fix our", inputs: [
                {type: "adjective"}, 
                {type: "device"}
            ]},
            { text: "After", inputs: [{type: "verb ending in -ing"}] },
            { text: "for", inputs: [{type: "number"}] },
            { text: "hours, they managed to repair the device and were hailed as", inputs: [{type: "adjective"}] },
            { text: "heroes across the", inputs: [{type: "adjective"}] },
            { text: "galaxy." }
        ]
    },
    {
        id: 3,
        title: "Pirate's Tale",
        date: "July 25, 2025",
        lines: [
            { text: "The pirate captain", inputs: [{type: "pirate name"}] },
            { text: "was known as the most", inputs: [{type: "adjective"}] },
            { text: "buccaneer on the", inputs: [{type: "adjective"}] },
            { text: "seas. One day, while searching for the fabled", inputs: [
                {type: "adjective"}, 
                {type: "treasure item"}
            ]},
            { text: "the crew spotted a", inputs: [{type: "adjective"}] },
            { text: "ship on the horizon. \"Avast, ye", inputs: [{type: "insulting plural noun"}] },
            { text: "!\" cried the captain. The ships", inputs: [{type: "verb, past tense"}] },
            { text: "toward each other and soon they were", inputs: [{type: "verb ending in -ing"}] },
            { text: "in a fierce battle. After", inputs: [{type: "verb ending in -ing"}] },
            { text: "for", inputs: [{type: "number"}] },
            { text: "hours, they captured the enemy vessel and discovered a", inputs: [
                {type: "adjective"}, 
                {type: "treasure item"}
            ]},
            { text: "in the hold. The captain", inputs: [{type: "verb, past tense"}] },
            { text: "with glee as they sailed back to", inputs: [{type: "island name"}] },
            { text: "as", inputs: [{type: "adjective"}] },
            { text: "conquerors, their", inputs: [{type: "adjective"}] },
            { text: "adventure coming to a", inputs: [{type: "adjective"}] },
            { text: "end." }
        ]
    },
    {
        id: 4,
        title: "Wizard's Duel",
        date: "July 22, 2025",
        lines: [
            { text: "In the ancient city of", inputs: [{type: "magical place"}] },
            { text: "the great wizard", inputs: [{type: "wizard name"}] },
            { text: "challenged the", inputs: [{type: "adjective"}] },
            { text: "sorcerer", inputs: [{type: "sorcerer name"}] },
            { text: "to a duel of", inputs: [{type: "plural noun"}] },
            { text: "The crowd gathered in the", inputs: [{type: "adjective"}] },
            { text: "arena as the two mages", inputs: [{type: "verb, past tense"}] },
            { text: "their staffs. First, the wizard conjured a", inputs: [
                {type: "adjective"}, 
                {type: "magical creature"}
            ]},
            { text: "made of pure", inputs: [{type: "element"}] },
            { text: "The sorcerer responded by casting a spell of", inputs: [{type: "adjective"}] },
            { text: "that turned the creature into a", inputs: [{type: "animal"}] },
            { text: "For", inputs: [{type: "number"}] },
            { text: "hours they battled, until finally the wizard", inputs: [{type: "verb, past tense"}] },
            { text: "the ultimate spell - the", inputs: [
                {type: "adjective"}, 
                {type: "spell name"}
            ]},
            { text: "With a flash of", inputs: [{type: "color"}] },
            { text: "light, the sorcerer was transformed into a", inputs: [
                {type: "adjective"}, 
                {type: "small object"}
            ]},
            { text: "The crowd", inputs: [{type: "verb, past tense"}] },
            { text: "in amazement as the wizard", inputs: [{type: "verb, past tense"}] },
            { text: "away with his", inputs: [{type: "adjective"}] },
            { text: "prize." }
        ]
    }
];

// Data management functions
function loadWordDatabase() {
    const savedDB = localStorage.getItem('wordDatabase');
    if (savedDB) {
        wordDatabase = JSON.parse(savedDB);
    }
}

function saveWordDatabase() {
    localStorage.setItem('wordDatabase', JSON.stringify(wordDatabase));
}

function loadPlayerData() {
    const savedData = localStorage.getItem('playerData');
    if (savedData) {
        playerData = JSON.parse(savedData);
        updateScoreDisplay();
    }
}

function savePlayerData() {
    localStorage.setItem('playerData', JSON.stringify(playerData));
}

function updateScoreDisplay() {
    const totalScoreEl = document.getElementById('totalScore');
    if (totalScoreEl) {
        totalScoreEl.textContent = playerData.totalScore;
    }
    
    // Show medals based on achievements
    const bronzeMedal = document.getElementById('bronzeMedal');
    const silverMedal = document.getElementById('silverMedal');
    const goldMedal = document.getElementById('goldMedal');
    
    if (bronzeMedal) bronzeMedal.style.display = playerData.medals.bronze ? 'inline-block' : 'none';
    if (silverMedal) silverMedal.style.display = playerData.medals.silver ? 'inline-block' : 'none';
    if (goldMedal) goldMedal.style.display = playerData.medals.gold ? 'inline-block' : 'none';
}

// Story rendering functions
function renderStory(story) {
    const storyContainer = document.getElementById('storyContainer');
    const storyTitle = document.getElementById('storyTitle');
    
    if (!storyContainer || !storyTitle) return;
    
    // Clear previous content
    storyContainer.innerHTML = '';
    storyTitle.textContent = story.title;
    
    // Create the story elements
    story.lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'story-line';
        
        // Add text part
        if (line.text) {
            const textPart = document.createElement('span');
            textPart.className = 'story-text-part';
            textPart.textContent = line.text;
            lineDiv.appendChild(textPart);
        }
        
        // Add inputs
        if (line.inputs) {
            line.inputs.forEach(input => {
                const inputContainer = document.createElement('div');
                inputContainer.className = 'inline-input';
                
                const inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.className = 'word-input';
                inputEl.dataset.type = input.type;
                
                const label = document.createElement('div');
                label.className = 'word-type-label';
                label.textContent = `(${input.type})`;
                
                inputContainer.appendChild(inputEl);
                inputContainer.appendChild(label);
                lineDiv.appendChild(inputContainer);
            });
        }
        
        storyContainer.appendChild(lineDiv);
    });
    
    // Set current story
    currentStory = story;
    
    // Add event listeners to inputs
    addInputEventListeners();
}

function addInputEventListeners() {
    document.querySelectorAll('.word-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = "0 0 0 2px var(--accent-color)";
            this.style.background = "rgba(255, 255, 255, 0.9)";
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = "0 0 0 1px rgba(139, 0, 0, 0.2)";
            this.style.background = "rgba(255, 255, 255, 0.5)";
        });
    });
}

// Scoring functions
function calculateComplexity(word) {
    // Longer words get more points
    let score = Math.min(20, word.length * 2);
    
    // Words with uncommon letters get bonus
    const uncommonLetters = ['z', 'x', 'q', 'j', 'k', 'v', 'b', 'y', 'f', 'w'];
    const uncommonCount = [...word].filter(char => uncommonLetters.includes(char)).length;
    score += uncommonCount * 3;
    
    // Words with uppercase letters (proper nouns) get bonus
    if (/[A-Z]/.test(word)) {
        score += 5;
    }
    
    // Words with apostrophes or hyphens get bonus
    if (/['-]/.test(word)) {
        score += 4;
    }
    
    return Math.round(score);
}

function calculateOriginality(word, type) {
    // Check if word exists in our database
    const wordLower = word.toLowerCase();
    const usageCount = wordDatabase[type][wordLower] || 0;
    
    // Less used words get higher scores
    if (usageCount === 0) return 30; // Brand new word!
    if (usageCount === 1) return 25;
    if (usageCount === 2) return 20;
    if (usageCount <= 5) return 15;
    if (usageCount <= 10) return 10;
    return 5; // Very common word
}

function updateWordDatabase(word, type) {
    const wordLower = word.toLowerCase();
    
    if (!wordDatabase[type][wordLower]) {
        wordDatabase[type][wordLower] = 0;
    }
    
    wordDatabase[type][wordLower]++;
    saveWordDatabase();
}

// Game action functions
function generateRandomWords() {
    const inputs = document.querySelectorAll('.word-input');
    const wordTypes = {
        'adjective': ['mysterious', 'sparkling', 'ancient', 'gigantic', 'tiny', 'magical', 'whispering', 'glowing'],
        'noun': ['dragon', 'wizard', 'treasure', 'castle', 'forest', 'ocean', 'mountain', 'artifact'],
        'verb, past tense': ['ran', 'jumped', 'sang', 'discovered', 'created', 'whispered', 'flew', 'vanished'],
        'adverb': ['silently', 'quickly', 'mysteriously', 'happily', 'bravely', 'foolishly', 'elegantly', 'suddenly'],
        'person\'s name': ['Elara', 'Thorn', 'Alder', 'Lyra', 'Finn', 'Rowan', 'Sorin', 'Kael'],
        'object': ['crown', 'sword', 'mirror', 'key', 'map', 'crystal', 'lantern', 'amulet'],
        'animal': ['owl', 'fox', 'raven', 'lion', 'wolf', 'dolphin', 'eagle', 'serpent'],
        'plant': ['oak', 'willow', 'rose', 'fern', 'mushroom', 'ivy', 'lotus', 'cactus'],
        'number': ['three', 'seven', 'twelve', 'forty', 'two dozen', 'a hundred', 'five', 'nine']
    };
    
    inputs.forEach(input => {
        const type = input.dataset.type;
        if (wordTypes[type]) {
            const words = wordTypes[type];
            const word = words[Math.floor(Math.random() * words.length)];
            input.value = word;
            
            // Animation effect
            input.style.transform = "scale(1.1)";
            input.style.boxShadow = "0 0 0 2px var(--accent-color)";
            setTimeout(() => {
                input.style.transform = "scale(1)";
                input.style.boxShadow = "0 0 0 1px rgba(139, 0, 0, 0.2)";
            }, 300);
        }
    });
}

function weaveStory() {
    const inputs = document.querySelectorAll('.word-input');
    const values = Array.from(inputs).map(input => input.value.trim());
    
    // Check if all fields are filled
    let allFilled = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.boxShadow = "0 0 0 2px red";
            allFilled = false;
        }
    });
    
    if (!allFilled) {
        alert('Please fill in all the blanks to weave your story!');
        return;
    }
    
    // Create the completed story
    let completedStory = '';
    let inputIndex = 0;
    
    currentStory.lines.forEach(line => {
        let lineText = '';
        
        if (line.text) {
            lineText += line.text;
        }
        
        if (line.inputs) {
            line.inputs.forEach(() => {
                lineText += ` <span class="highlight">${values[inputIndex]}</span> `;
                inputIndex++;
            });
        }
        
        completedStory += `<p>${lineText}</p>`;
    });
    
    // Calculate score
    let totalScore = 0;
    const scoreDetails = [];
    
    inputs.forEach((input, index) => {
        const word = input.value.trim();
        const type = input.dataset.type;
        
        if (word === '') return;
        
        // Update word database
        updateWordDatabase(word, type);
        
        // Calculate scores
        const complexity = calculateComplexity(word);
        const originality = calculateOriginality(word, type);
        const wordScore = complexity + originality;
        
        totalScore += wordScore;
        
        // Add to details
        scoreDetails.push({
            word,
            type,
            complexity,
            originality,
            wordScore
        });
    });
    
    // Update player data
    playerData.totalScore += totalScore;
    playerData.storiesCompleted++;
    
    // Award medals based on score
    if (totalScore > 250) {
        playerData.medals.gold++;
    } else if (totalScore > 180) {
        playerData.medals.silver++;
    } else if (totalScore > 120) {
        playerData.medals.bronze++;
    }
    
    // Save player data
    savePlayerData();
    updateScoreDisplay();
    
    // Display the result
    displayResult(completedStory, totalScore, scoreDetails);
}

function displayResult(completedStory, totalScore, scoreDetails) {
    const resultSection = document.getElementById('resultSection');
    const completedStoryEl = document.getElementById('completedStory');
    const resultScoreEl = document.getElementById('resultScore');
    const resultMedalEl = document.getElementById('resultMedal');
    const scoreDetailsEl = document.getElementById('scoreDetails');
    
    if (completedStoryEl) completedStoryEl.innerHTML = completedStory;
    if (resultScoreEl) resultScoreEl.textContent = totalScore;
    
    // Set medal display
    if (resultMedalEl) {
        resultMedalEl.className = 'medal';
        if (totalScore > 250) {
            resultMedalEl.classList.add('gold');
        } else if (totalScore > 180) {
            resultMedalEl.classList.add('silver');
        } else if (totalScore > 120) {
            resultMedalEl.classList.add('bronze');
        } else {
            resultMedalEl.style.display = 'none';
        }
    }
    
    // Display score breakdown
    if (scoreDetailsEl) {
        scoreDetailsEl.innerHTML = '';
        
        scoreDetails.forEach(detail => {
            const wordScoreEl = document.createElement('div');
            wordScoreEl.className = 'word-score';
            
            wordScoreEl.innerHTML = `
                <div>
                    <strong>${detail.word}</strong> (${detail.type})
                </div>
                <div>
                    Complexity: <span class="score-pill">${detail.complexity}</span>
                    Originality: <span class="score-pill">${detail.originality}</span>
                    Total: <span class="score-pill">${detail.wordScore}</span>
                </div>
            `;
            
            scoreDetailsEl.appendChild(wordScoreEl);
        });
        
        // Add total score row
        const totalScoreEl = document.createElement('div');
        totalScoreEl.className = 'word-score';
        totalScoreEl.style.fontWeight = 'bold';
        totalScoreEl.style.marginTop = '10px';
        totalScoreEl.style.borderTop = '2px solid var(--accent-color)';
        totalScoreEl.style.paddingTop = '10px';
        totalScoreEl.innerHTML = `
            <div>Total Score</div>
            <div>${totalScore}</div>
        `;
        
        scoreDetailsEl.appendChild(totalScoreEl);
    }
    
    // Show the result section
    if (resultSection) {
        resultSection.style.display = 'block';
    }
}

function closeResult() {
    const resultSection = document.getElementById('resultSection');
    if (resultSection) {
        resultSection.style.display = 'none';
    }
}

function newStory() {
    document.querySelectorAll('.word-input').forEach(input => {
        input.value = '';
        input.style.boxShadow = "0 0 0 1px rgba(139, 0, 0, 0.2)";
    });
    closeResult();
}

function saveStory() {
    alert('Story saved to your archive!');
    closeResult();
}

// Initialize game
function initGame() {
    // Load data
    loadWordDatabase();
    loadPlayerData();
    
    // Set current date
    const now = new Date();
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        currentDateEl.textContent = now.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }
    
    // Check if a story was selected from archive
    const selectedStory = localStorage.getItem('selectedStory');
    if (selectedStory) {
        currentStory = JSON.parse(selectedStory);
        localStorage.removeItem('selectedStory'); // Clear after loading
    } else {
        currentStory = stories[0];
    }
    
    // Render the story
    renderStory(currentStory);
    
    // Add event listeners
    addGameEventListeners();
}

function addGameEventListeners() {
    // Random word generator
    const randomBtn = document.getElementById('randomBtn');
    if (randomBtn) {
        randomBtn.addEventListener('click', generateRandomWords);
    }
    
    // Weave story functionality
    const weaveBtn = document.getElementById('weaveBtn');
    if (weaveBtn) {
        weaveBtn.addEventListener('click', weaveStory);
    }
    
    // Close result overlay
    const closeResultBtn = document.getElementById('closeResult');
    if (closeResultBtn) {
        closeResultBtn.addEventListener('click', closeResult);
    }
    
    // New story button
    const newStoryBtn = document.getElementById('newStoryBtn');
    if (newStoryBtn) {
        newStoryBtn.addEventListener('click', newStory);
    }
    
    // Save story button
    const saveStoryBtn = document.getElementById('saveStoryBtn');
    if (saveStoryBtn) {
        saveStoryBtn.addEventListener('click', saveStory);
    }
}

// Export functions for use in other modules
window.GameManager = {
    initGame,
    renderStory,
    generateRandomWords,
    weaveStory,
    displayResult,
    closeResult,
    newStory,
    saveStory,
    loadPlayerData,
    updateScoreDisplay,
    stories
}; 