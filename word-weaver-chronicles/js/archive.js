// Archive Manager
class ArchiveManager {
    constructor() {
        this.stories = [
            {
                id: 1,
                title: "The Mysterious Quest",
                date: "August 1, 2025",
                description: "A brave adventurer embarks on a quest to find a legendary treasure in an enchanted forest.",
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
                description: "Captain and crew explore the galaxy, encountering alien worlds and mysterious space phenomena.",
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
                description: "A fearsome pirate captain searches for treasure and battles rival ships on the high seas.",
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
                description: "Two powerful mages face off in an epic battle of spells and magical creatures.",
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
    }

    // Initialize archive page
    init() {
        this.setCurrentDate();
        this.generateArchiveItems();
        this.createInkSplotches();
    }

    // Set current date
    setCurrentDate() {
        const now = new Date();
        const currentDateEl = document.getElementById('currentDate');
        if (currentDateEl) {
            currentDateEl.textContent = now.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    }

    // Generate archive items
    generateArchiveItems() {
        const archiveGrid = document.getElementById('archiveGrid');
        if (!archiveGrid) return;

        archiveGrid.innerHTML = '';
        
        this.stories.forEach(story => {
            const card = this.createArchiveCard(story);
            archiveGrid.appendChild(card);
        });
    }

    // Create individual archive card
    createArchiveCard(story) {
        const card = document.createElement('div');
        card.className = 'archive-card';
        card.innerHTML = `
            <div class="archive-tag">Challenge</div>
            <h3>${story.title}</h3>
            <div class="archive-date">${story.date}</div>
            <div class="archive-description">${story.description}</div>
        `;
        
        card.addEventListener('click', () => {
            this.selectStory(story);
        });
        
        return card;
    }

    // Select story and redirect to game
    selectStory(story) {
        // Store selected story in localStorage
        localStorage.setItem('selectedStory', JSON.stringify(story));
        // Redirect to game page
        window.location.href = 'game.html';
    }

    // Create ink splotches
    createInkSplotches() {
        const container = document.querySelector('.newspaper-container');
        if (!container) return;

        for (let i = 0; i < 5; i++) {
            const splotch = document.createElement('div');
            splotch.className = 'ink-splotch';
            splotch.style.top = `${Math.random() * 100}%`;
            splotch.style.left = `${Math.random() * 100}%`;
            splotch.style.opacity = Math.random() * 0.2 + 0.1;
            splotch.style.transform = `scale(${Math.random() * 0.8 + 0.5}) rotate(${Math.random() * 360}deg)`;
            container.appendChild(splotch);
        }
    }

    // Get all stories
    getAllStories() {
        return this.stories;
    }

    // Get story by ID
    getStoryById(id) {
        return this.stories.find(story => story.id === id);
    }

    // Add new story to archive
    addStory(story) {
        story.id = this.stories.length + 1;
        story.date = new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        this.stories.unshift(story); // Add to beginning
        return story;
    }

    // Save completed story to archive
    saveCompletedStory(storyData) {
        const savedStories = JSON.parse(localStorage.getItem('completedStories') || '[]');
        savedStories.push({
            ...storyData,
            completedAt: new Date().toISOString()
        });
        localStorage.setItem('completedStories', JSON.stringify(savedStories));
    }

    // Get completed stories
    getCompletedStories() {
        return JSON.parse(localStorage.getItem('completedStories') || '[]');
    }
}

// Create global instance
window.ArchiveManager = new ArchiveManager();

// Initialize archive when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('archive.html')) {
        window.ArchiveManager.init();
    }
}); 