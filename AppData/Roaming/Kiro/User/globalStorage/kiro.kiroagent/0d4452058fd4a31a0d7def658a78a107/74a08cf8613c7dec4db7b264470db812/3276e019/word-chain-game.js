// Word Chain - Daily Challenge Game with Arkadium SDK Integration

class WordChainGame {
    constructor() {
        this.currentWord = [];
        this.foundWords = [];
        this.availableLetters = [];
        this.score = 0;
        this.streak = 0;
        this.maxWordLength = 8;
        this.targetWordsCount = 10;
        this.gameComplete = false;
        
        // Daily challenge letters (changes based on date)
        this.dailyLetters = this.getDailyLetters();
        
        // DOM elements
        this.statusMessage = document.getElementById('status-message');
        this.sdkStatus = document.getElementById('sdk-status');
        this.wordChain = document.getElementById('word-chain');
        this.currentWordEl = document.getElementById('current-word');
        this.availableLettersEl = document.getElementById('available-letters');
        this.scoreEl = document.getElementById('score');
        this.wordsFoundEl = document.getElementById('words-found');
        this.streakEl = document.getElementById('streak');
        this.targetInfo = document.getElementById('target-info');
        this.progressInfo = document.getElementById('progress-info');
        
        // Initialize Arkadium SDK
        this.initializeSDK();
        
        // Initialize game
        this.init();
    }
    
    async initializeSDK() {
        try {
            this.updateSDKStatus('Checking for Arkadium SDK...');
            
            // Wait for SDK to be available
            let attempts = 0;
            while (!window.ArkadiumGameSDK && attempts < 20) {
                this.updateSDKStatus(`Waiting for SDK (${attempts + 1}/20)...`);
                await new Promise(resolve => setTimeout(resolve, 250));
                attempts++;
            }
            
            if (!window.ArkadiumGameSDK) {
                this.updateSDKStatus('SDK not found - running in standalone mode');
                console.warn('Arkadium SDK not available - game will run without SDK features');
                return;
            }
            
            this.updateSDKStatus('SDK found, initializing...');
            
            // Initialize SDK
            this.sdk = await window.ArkadiumGameSDK.getInstance({
                gameId: 'word-chain',
                version: '1.0.0',
                debug: true
            });
            
            this.updateSDKStatus('SDK initialized successfully');
            
            // Enable debug mode if available
            if (this.sdk.setDebugMode) {
                this.sdk.setDebugMode(true);
            }
            
            // Signal game is loading
            if (this.sdk.lifecycle && this.sdk.lifecycle.onLoading) {
                this.sdk.lifecycle.onLoading();
            }
            
            // Store SDK reference globally
            window.gameSDK = this.sdk;
            window.wordChainGame = this;
            
            this.updateSDKStatus('SDK ready for sandbox testing');
            
        } catch (e) {
            this.updateSDKStatus(`SDK Error: ${e.message}`);
            console.error('SDK initialization error:', e);
        }
    }
    
    updateSDKStatus(message) {
        if (this.sdkStatus) {
            this.sdkStatus.textContent = message;
        }
        console.log('SDK: ' + message);
    }
    
    updateStatus(message) {
        if (this.statusMessage) {
            this.statusMessage.textContent = message;
        }
    }
    
    getDailyLetters() {
        // Generate daily letters based on current date
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        
        // Predefined letter sets for different days
        const letterSets = [
            ['A', 'E', 'R', 'T', 'S', 'N', 'I', 'O'],
            ['L', 'A', 'N', 'D', 'E', 'R', 'S', 'T'],
            ['C', 'H', 'A', 'I', 'R', 'S', 'E', 'T'],
            ['P', 'L', 'A', 'N', 'T', 'E', 'R', 'S'],
            ['W', 'A', 'T', 'E', 'R', 'S', 'H', 'I'],
            ['F', 'L', 'O', 'W', 'E', 'R', 'S', 'T'],
            ['G', 'A', 'R', 'D', 'E', 'N', 'S', 'T']
        ];
        
        return letterSets[dayOfYear % letterSets.length];
    }
    
    async init() {
        this.updateStatus('Initializing Word Chain...');
        
        // Set up available letters
        this.availableLetters = [...this.dailyLetters];
        
        // Create UI
        this.createCurrentWordSlots();
        this.createAvailableLetters();
        this.addEventListeners();
        this.updateDisplay();
        
        // Clear initial placeholder
        this.wordChain.innerHTML = '';
        
        // Wait for game to be fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateStatus('Find words using the letters below!');
        
        // Signal game ready
        if (this.sdk && this.sdk.lifecycle && this.sdk.lifecycle.onTestReady) {
            this.updateSDKStatus('Game ready - calling onTestReady()...');
            this.sdk.lifecycle.onTestReady();
            this.updateSDKStatus('Game loaded successfully!');
        }
    }
    
    createCurrentWordSlots() {
        this.currentWordEl.innerHTML = '';
        for (let i = 0; i < this.maxWordLength; i++) {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            slot.dataset.index = i;
            this.currentWordEl.appendChild(slot);
        }
    }
    
    createAvailableLetters() {
        this.availableLettersEl.innerHTML = '';
        this.availableLetters.forEach((letter, index) => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            btn.dataset.letter = letter;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.addLetter(letter, index));
            this.availableLettersEl.appendChild(btn);
        });
    }
    
    addEventListeners() {
        document.getElementById('clear-btn').addEventListener('click', () => this.clearCurrentWord());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitWord());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.gameComplete) return;
            
            const key = e.key.toUpperCase();
            if (key === 'ENTER') {
                this.submitWord();
            } else if (key === 'BACKSPACE') {
                this.removeLastLetter();
            } else if (key.match(/[A-Z]/) && key.length === 1) {
                const availableIndex = this.availableLetters.findIndex(letter => letter === key);
                if (availableIndex !== -1) {
                    this.addLetter(key, availableIndex);
                }
            }
        });
    }
    
    addLetter(letter, index) {
        if (this.currentWord.length >= this.maxWordLength) return;
        
        // Add letter to current word
        this.currentWord.push({ letter, originalIndex: index });
        
        // Remove from available letters
        this.availableLetters.splice(index, 1);
        
        // Update display
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    removeLastLetter() {
        if (this.currentWord.length === 0) return;
        
        const lastLetter = this.currentWord.pop();
        
        // Add back to available letters in original position
        this.availableLetters.splice(lastLetter.originalIndex, 0, lastLetter.letter);
        this.availableLetters.sort();
        
        // Update display
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    clearCurrentWord() {
        // Return all letters to available
        this.currentWord.forEach(item => {
            this.availableLetters.push(item.letter);
        });
        this.availableLetters.sort();
        
        this.currentWord = [];
        this.updateCurrentWordDisplay();
        this.createAvailableLetters();
    }
    
    updateCurrentWordDisplay() {
        const slots = this.currentWordEl.querySelectorAll('.letter-slot');
        slots.forEach((slot, index) => {
            if (index < this.currentWord.length) {
                slot.textContent = this.currentWord[index].letter;
                slot.classList.add('filled');
                slot.classList.remove('active');
            } else if (index === this.currentWord.length) {
                slot.textContent = '';
                slot.classList.remove('filled');
                slot.classList.add('active');
            } else {
                slot.textContent = '';
                slot.classList.remove('filled', 'active');
            }
        });
    }
    
    submitWord() {
        if (this.currentWord.length < 3) {
            this.showMessage('Words must be at least 3 letters long!');
            return;
        }
        
        const word = this.currentWord.map(item => item.letter).join('');
        
        // Check if word already found
        if (this.foundWords.includes(word)) {
            this.showMessage('Word already found!');
            return;
        }
        
        // Check if valid word (simplified validation)
        if (this.isValidWord(word)) {
            this.addFoundWord(word);
            this.clearCurrentWord();
            this.updateScore(word);
            this.checkGameComplete();
        } else {
            this.showMessage('Not a valid word!');
            this.animateInvalidWord();
        }
    }
    
    isValidWord(word) {
        // Comprehensive dictionary with common English words
        const validWords = [
            // 3-letter words
            'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE', 'OUR',
            'HAD', 'TWO', 'HOW', 'ITS', 'WHO', 'OIL', 'SIT', 'NOW', 'SET', 'HAD', 'LET', 'SAY', 'SHE',
            'MAY', 'USE', 'HER', 'HIM', 'HAS', 'HIS', 'OLD', 'SEE', 'WAY', 'BOY', 'DID', 'GET', 'MAN',
            'NEW', 'DAY', 'TOO', 'ANY', 'SUN', 'EYE', 'AGE', 'OFF', 'FAR', 'OWN', 'OUT', 'BAD', 'BAG',
            'BED', 'BIG', 'BOX', 'BUS', 'CAR', 'CAT', 'CUP', 'CUT', 'DOG', 'EAR', 'EAT', 'EGG', 'END',
            'FUN', 'GOT', 'GUN', 'HAT', 'HIT', 'HOT', 'JOB', 'LEG', 'LOT', 'MAP', 'MOM', 'PEN', 'PET',
            'PIG', 'PUT', 'RAN', 'RED', 'RUN', 'SAD', 'SAT', 'SEA', 'SIX', 'TEN', 'TOP', 'TRY', 'WIN',
            'YES', 'YET', 'ZOO', 'ART', 'ASK', 'BAT', 'BIT', 'BUY', 'COW', 'CRY', 'DIG', 'FIX', 'FLY',
            'GOD', 'ICE', 'JOY', 'KEY', 'LAY', 'LIE', 'MIX', 'PAY', 'ROW', 'SKY', 'TAX', 'TIE', 'TOY',
            'WAR', 'WET', 'WHY', 'WIN', 'ARM', 'BAD', 'BAN', 'BAR', 'BAY', 'BEE', 'BET', 'BOW', 'BUG',
            'CAN', 'COD', 'COG', 'COT', 'COX', 'CUB', 'CUD', 'CUE', 'DAD', 'DAM', 'DEN', 'DEW', 'DIM',
            'DIP', 'DOC', 'DOT', 'DRY', 'DUB', 'DUD', 'DUE', 'DUG', 'DUN', 'DYE', 'ELF', 'ELK', 'ELM',
            'ERA', 'EVE', 'FAN', 'FAT', 'FAX', 'FED', 'FEW', 'FIG', 'FIN', 'FIR', 'FIT', 'FOG', 'FOX',
            'FRY', 'FUR', 'GAG', 'GAP', 'GAS', 'GEL', 'GEM', 'GET', 'GIG', 'GIN', 'GNU', 'GOO', 'GUM',
            'GUT', 'GUY', 'GYM', 'HAM', 'HEN', 'HEX', 'HID', 'HIP', 'HIT', 'HOG', 'HOP', 'HOW', 'HUB',
            'HUG', 'HUM', 'HUT', 'INK', 'INN', 'ION', 'IRE', 'IVY', 'JAB', 'JAG', 'JAM', 'JAR', 'JAW',
            'JET', 'JIG', 'JOG', 'JOT', 'JUG', 'KEG', 'KID', 'KIN', 'KIT', 'LAB', 'LAD', 'LAG', 'LAP',
            'LAW', 'LAX', 'LEA', 'LED', 'LID', 'LIP', 'LOG', 'LOP', 'LOW', 'LYE', 'MAD', 'MAT', 'MAX',
            'MEN', 'MET', 'MID', 'MIL', 'MOB', 'MOD', 'MOP', 'MUD', 'MUG', 'NAB', 'NAG', 'NAP', 'NET',
            'NIL', 'NIT', 'NOB', 'NOD', 'NOR', 'NOT', 'NOW', 'NUB', 'NUN', 'NUT', 'OAK', 'OAR', 'OAT',
            'ODD', 'ORB', 'ORE', 'OWL', 'PAD', 'PAL', 'PAN', 'PAP', 'PAR', 'PAT', 'PAW', 'PEA', 'PEG',
            'PEW', 'PIE', 'PIN', 'PIT', 'PLY', 'POD', 'POP', 'POT', 'PRO', 'PRY', 'PUB', 'PUG', 'PUN',
            'PUP', 'PUS', 'RAG', 'RAM', 'RAP', 'RAT', 'RAW', 'RAY', 'RIB', 'RID', 'RIG', 'RIM', 'RIP',
            'ROB', 'ROD', 'ROT', 'RUB', 'RUG', 'RUM', 'RUT', 'RYE', 'SAC', 'SAG', 'SAP', 'SAW', 'SAX',
            'SHY', 'SIN', 'SIP', 'SIR', 'SIS', 'SKI', 'SLY', 'SOB', 'SOD', 'SON', 'SOP', 'SOT', 'SOW',
            'SOY', 'SPA', 'SPY', 'STY', 'SUB', 'SUM', 'SUN', 'SUP', 'TAB', 'TAD', 'TAG', 'TAN', 'TAP',
            'TAR', 'TEA', 'TIC', 'TIN', 'TIP', 'TOE', 'TON', 'TOW', 'TUB', 'TUG', 'TWO', 'URN', 'USE',
            'VAN', 'VAT', 'VET', 'VIA', 'VIE', 'VOW', 'WAD', 'WAG', 'WAN', 'WAX', 'WEB', 'WED', 'WEE',
            'WHO', 'WIG', 'WIT', 'WOE', 'WOK', 'WON', 'WOO', 'WOW', 'YAK', 'YAM', 'YAP', 'YAW', 'YEA',
            'YEP', 'YEW', 'YIN', 'YIP', 'YON', 'YOU', 'YOW', 'YUK', 'YUM', 'ZAP', 'ZED', 'ZEE', 'ZEN',
            'ZIP', 'ZIT', 'ZOO',
            
            // 4-letter words
            'ABLE', 'ACID', 'AGED', 'ALSO', 'AREA', 'ARMY', 'AWAY', 'BABY', 'BACK', 'BALL', 'BAND',
            'BANK', 'BASE', 'BATH', 'BEAR', 'BEAT', 'BEEN', 'BELL', 'BEST', 'BIRD', 'BLOW', 'BLUE',
            'BOAT', 'BODY', 'BONE', 'BOOK', 'BORN', 'BOTH', 'BOYS', 'BUSY', 'CALL', 'CAME', 'CAMP',
            'CARD', 'CARE', 'CARS', 'CASE', 'CASH', 'CAST', 'CELL', 'CHAT', 'CITY', 'CLUB', 'COAL',
            'COAT', 'CODE', 'COLD', 'COME', 'COOL', 'COPY', 'CORN', 'COST', 'CREW', 'CROP', 'DARK',
            'DATA', 'DATE', 'DAYS', 'DEAD', 'DEAL', 'DEAR', 'DEBT', 'DEEP', 'DESK', 'DIAL', 'DIED',
            'DIET', 'DISK', 'DOES', 'DONE', 'DOOR', 'DOWN', 'DRAW', 'DREW', 'DROP', 'DRUG', 'DUAL',
            'DUCK', 'DUTY', 'EACH', 'EARN', 'EAST', 'EASY', 'EDGE', 'ELSE', 'EVEN', 'EVER', 'EVIL',
            'EXIT', 'FACE', 'FACT', 'FAIL', 'FAIR', 'FALL', 'FARM', 'FAST', 'FATE', 'FEAR', 'FEED',
            'FEEL', 'FEET', 'FELL', 'FELT', 'FILE', 'FILL', 'FILM', 'FIND', 'FINE', 'FIRE', 'FIRM',
            'FISH', 'FIVE', 'FLAG', 'FLAT', 'FLEW', 'FLOW', 'FOOD', 'FOOT', 'FORD', 'FORM', 'FORT',
            'FOUR', 'FREE', 'FROM', 'FUEL', 'FULL', 'FUND', 'GAIN', 'GAME', 'GATE', 'GAVE', 'GEAR',
            'GIFT', 'GIRL', 'GIVE', 'GLAD', 'GOAL', 'GOES', 'GOLD', 'GOLF', 'GONE', 'GOOD', 'GRAB',
            'GRAY', 'GREW', 'GRID', 'GROW', 'GULF', 'HAIR', 'HALF', 'HALL', 'HAND', 'HANG', 'HARD',
            'HARM', 'HATE', 'HAVE', 'HEAD', 'HEAR', 'HEAT', 'HELD', 'HELL', 'HELP', 'HERE', 'HERO',
            'HIDE', 'HIGH', 'HILL', 'HIRE', 'HOLD', 'HOLE', 'HOLY', 'HOME', 'HOPE', 'HOST', 'HOUR',
            'HUGE', 'HUNG', 'HUNT', 'HURT', 'IDEA', 'INCH', 'INTO', 'IRON', 'ITEM', 'JACK', 'JANE',
            'JAZZ', 'JOHN', 'JOIN', 'JUMP', 'JUNE', 'JURY', 'JUST', 'KEEN', 'KEEP', 'KEPT', 'KEYS',
            'KICK', 'KILL', 'KIND', 'KING', 'KNEE', 'KNEW', 'KNOW', 'LACK', 'LADY', 'LAID', 'LAKE',
            'LAND', 'LANE', 'LAST', 'LATE', 'LEAD', 'LEFT', 'LESS', 'LIFE', 'LIFT', 'LIKE', 'LINE',
            'LINK', 'LIST', 'LIVE', 'LOAN', 'LOCK', 'LONG', 'LOOK', 'LORD', 'LOSE', 'LOSS', 'LOST',
            'LOTS', 'LOUD', 'LOVE', 'LUCK', 'MADE', 'MAIL', 'MAIN', 'MAKE', 'MALE', 'MALL', 'MANY',
            'MARK', 'MASS', 'MATE', 'MATH', 'MEAL', 'MEAN', 'MEAT', 'MEET', 'MENU', 'MERE', 'MICE',
            'MILD', 'MILE', 'MILK', 'MIND', 'MINE', 'MISS', 'MODE', 'MOOD', 'MOON', 'MORE', 'MOST',
            'MOVE', 'MUCH', 'MUST', 'NAME', 'NAVY', 'NEAR', 'NECK', 'NEED', 'NEWS', 'NEXT', 'NICE',
            'NINE', 'NODE', 'NONE', 'NOON', 'NOSE', 'NOTE', 'NOUN', 'NUDE', 'NUTS', 'OBEY', 'ODDS',
            'OKAY', 'ONCE', 'ONLY', 'ONTO', 'OPEN', 'ORAL', 'OVER', 'PACE', 'PACK', 'PAGE', 'PAID',
            'PAIN', 'PAIR', 'PALM', 'PARK', 'PART', 'PASS', 'PAST', 'PATH', 'PEAK', 'PICK', 'PILE',
            'PINK', 'PIPE', 'PLAN', 'PLAY', 'PLOT', 'PLUG', 'PLUS', 'POEM', 'POET', 'POLL', 'POOL',
            'POOR', 'PORT', 'POST', 'POUR', 'PRAY', 'PULL', 'PURE', 'PUSH', 'QUIT', 'RACE', 'RAIL',
            'RAIN', 'RANK', 'RARE', 'RATE', 'READ', 'REAL', 'REAR', 'RELY', 'RENT', 'REST', 'RICH',
            'RIDE', 'RING', 'RISE', 'RISK', 'ROAD', 'ROCK', 'ROLE', 'ROLL', 'ROOF', 'ROOM', 'ROOT',
            'ROPE', 'ROSE', 'RULE', 'SAFE', 'SAID', 'SAIL', 'SAKE', 'SALE', 'SALT', 'SAME', 'SAND',
            'SAVE', 'SEAT', 'SEED', 'SEEK', 'SEEM', 'SEEN', 'SELF', 'SELL', 'SEND', 'SENT', 'SHIP',
            'SHOP', 'SHOT', 'SHOW', 'SHUT', 'SICK', 'SIDE', 'SIGN', 'SING', 'SINK', 'SIZE', 'SKIN',
            'SLIP', 'SLOW', 'SNAP', 'SNOW', 'SOAP', 'SOFT', 'SOIL', 'SOLD', 'SOLE', 'SOME', 'SONG',
            'SOON', 'SORT', 'SOUL', 'SOUP', 'SPOT', 'STAR', 'STAY', 'STEP', 'STOP', 'SUCH', 'SUIT',
            'SURE', 'TAKE', 'TALE', 'TALK', 'TALL', 'TANK', 'TAPE', 'TASK', 'TEAM', 'TELL', 'TEND',
            'TERM', 'TEST', 'TEXT', 'THAN', 'THAT', 'THEM', 'THEN', 'THEY', 'THIN', 'THIS', 'THUS',
            'TIDE', 'TIED', 'TIME', 'TINY', 'TOLD', 'TONE', 'TOOK', 'TOOL', 'TOPS', 'TORN', 'TOUR',
            'TOWN', 'TREE', 'TRIP', 'TRUE', 'TUNE', 'TURN', 'TWIN', 'TYPE', 'UNIT', 'UPON', 'USED',
            'USER', 'VARY', 'VAST', 'VIEW', 'VOTE', 'WAGE', 'WAIT', 'WAKE', 'WALK', 'WALL', 'WANT',
            'WARD', 'WARM', 'WARN', 'WASH', 'WAVE', 'WAYS', 'WEAK', 'WEAR', 'WEEK', 'WELL', 'WENT',
            'WERE', 'WEST', 'WHAT', 'WHEN', 'WIDE', 'WIFE', 'WILD', 'WILL', 'WIND', 'WINE', 'WING',
            'WIRE', 'WISE', 'WISH', 'WITH', 'WOOD', 'WORD', 'WORE', 'WORK', 'YARD', 'YEAH', 'YEAR',
            'YOUR', 'ZERO', 'ZONE',
            
            // 5+ letter words
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
            'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD',
            'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW',
            'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLAST', 'BLIND', 'BLOCK', 'BLOOD',
            'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK',
            'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE',
            'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE',
            'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS',
            'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD',
            'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD',
            'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT',
            'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM',
            'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT',
            'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY',
            'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY',
            'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE',
            'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT',
            'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND',
            'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS',
            'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL',
            'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY',
            'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
            'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS',
            'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
            'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR',
            'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH',
            'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED',
            'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT',
            'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE',
            'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER',
            'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE',
            'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
            'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL',
            'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE',
            'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE',
            'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT',
            'SHOWN', 'SIGHT', 'SILLY', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE',
            'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH',
            'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF',
            'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STICK',
            'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY',
            'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES',
            'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE',
            'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB',
            'TIGHT', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK',
            'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK',
            'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNDER', 'UNDUE', 'UNION',
            'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO',
            'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE',
            'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE',
            'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YOUNG', 'YOUTH'
        ];
        
        return validWords.includes(word.toUpperCase());
    }
    
    addFoundWord(word) {
        this.foundWords.push(word);
        
        // Add to word chain display
        const wordBubble = document.createElement('div');
        wordBubble.className = 'word-bubble';
        wordBubble.textContent = word;
        this.wordChain.appendChild(wordBubble);
        
        // Scroll to show new word
        this.wordChain.scrollTop = this.wordChain.scrollHeight;
        
        this.showMessage(`Great! Found "${word}"`);
    }
    
    updateScore(word) {
        // Score based on word length
        const points = word.length * 10;
        this.score += points;
        this.streak++;
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreEl.textContent = this.score;
        this.wordsFoundEl.textContent = this.foundWords.length;
        this.streakEl.textContent = this.streak;
        this.progressInfo.textContent = `Progress: ${this.foundWords.length}/${this.targetWordsCount} words found`;
    }
    
    checkGameComplete() {
        if (this.foundWords.length >= this.targetWordsCount) {
            this.gameComplete = true;
            this.updateStatus('🎉 Daily Challenge Complete! Well done!');
            this.showMessage('Challenge completed! Great job!');
        }
    }
    
    animateInvalidWord() {
        this.currentWordEl.style.animation = 'shake 0.5s';
        setTimeout(() => {
            this.currentWordEl.style.animation = '';
        }, 500);
    }
    
    showMessage(text) {
        // Remove existing message
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'game-message';
        message.style.cssText = `
            position: fixed;
            top: 25%;
            left: 50%;
            transform: translateX(-50%);
            background: #1a1a1a;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideDown 0.2s ease;
            letter-spacing: 0.25px;
        `;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }
    
    async showHint() {
        try {
            this.updateStatus('Loading rewarded ad for hint...');
            this.updateSDKStatus('Checking SDK ad capabilities...');
            
            // Show loading state
            const hintBtn = document.getElementById('hint-btn');
            const originalText = hintBtn.textContent;
            hintBtn.textContent = 'Loading Ad...';
            hintBtn.disabled = true;
            
            // Check SDK availability and ad methods
            if (!this.sdk) {
                throw new Error('SDK not available');
            }
            
            console.log('SDK object:', this.sdk);
            console.log('SDK methods:', Object.keys(this.sdk));
            
            // Try different possible ad API structures
            let adResult = null;
            
            if (this.sdk.ads && typeof this.sdk.ads.showRewardedAd === 'function') {
                // Standard ads API
                this.updateSDKStatus('Using standard ads API...');
                adResult = await this.sdk.ads.showRewardedAd({
                    placement: 'hint_reward',
                    description: 'Watch an ad to get a helpful hint!'
                });
            } else if (this.sdk.showRewardedAd && typeof this.sdk.showRewardedAd === 'function') {
                // Direct method on SDK
                this.updateSDKStatus('Using direct showRewardedAd method...');
                adResult = await this.sdk.showRewardedAd({
                    placement: 'hint_reward',
                    description: 'Watch an ad to get a helpful hint!'
                });
            } else if (this.sdk.advertising && typeof this.sdk.advertising.showRewardedAd === 'function') {
                // Alternative advertising namespace
                this.updateSDKStatus('Using advertising API...');
                adResult = await this.sdk.advertising.showRewardedAd({
                    placement: 'hint_reward',
                    description: 'Watch an ad to get a helpful hint!'
                });
            } else if (this.sdk.monetization && typeof this.sdk.monetization.showRewardedAd === 'function') {
                // Monetization namespace
                this.updateSDKStatus('Using monetization API...');
                adResult = await this.sdk.monetization.showRewardedAd({
                    placement: 'hint_reward',
                    description: 'Watch an ad to get a helpful hint!'
                });
            } else {
                // Log available methods for debugging
                console.log('Available SDK properties:', Object.keys(this.sdk));
                if (this.sdk.ads) {
                    console.log('Available ads methods:', Object.keys(this.sdk.ads));
                }
                
                // Simulate ad for testing purposes
                this.updateSDKStatus('No ad API found - simulating ad for testing...');
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate ad loading
                adResult = { success: true, rewarded: true }; // Simulate successful ad
            }
            
            // Reset button
            hintBtn.textContent = originalText;
            hintBtn.disabled = false;
            
            if (adResult && adResult.success && adResult.rewarded) {
                // User watched the ad successfully
                this.updateSDKStatus('Rewarded ad completed successfully');
                this.displayHint();
                this.updateStatus('Hint unlocked! Keep building words.');
            } else if (adResult && adResult.cancelled) {
                // User cancelled the ad
                this.updateSDKStatus('Rewarded ad was cancelled');
                this.showMessage('Ad cancelled. No hint this time.');
                this.updateStatus('Ad cancelled. Try again for a hint!');
            } else {
                // Ad failed to load or other error
                this.updateSDKStatus('Rewarded ad failed to load');
                this.showMessage('Ad failed to load. Try again later.');
                this.updateStatus('Ad unavailable. Try the hint again later.');
            }
            
        } catch (error) {
            // Handle any errors
            console.error('Rewarded ad error:', error);
            this.updateSDKStatus(`Ad error: ${error.message}`);
            
            // Reset button
            const hintBtn = document.getElementById('hint-btn');
            hintBtn.textContent = 'Hint';
            hintBtn.disabled = false;
            
            // For development/testing - show hint with a simulated ad experience
            this.updateSDKStatus('Simulating ad experience for testing...');
            this.showMessage('🎬 Simulated Ad: Thanks for watching!');
            
            // Simulate ad delay then show hint
            setTimeout(() => {
                this.displayHint();
                this.updateStatus('Hint unlocked! (Simulated ad completed)');
            }, 1500);
        }
    }
    
    displayHint() {
        const hints = [
            "Try common 3-letter words like THE, AND, FOR",
            "Look for words ending in -ING, -ER, -ED", 
            "Don't forget about short words like IS, IT, IN",
            "Try building longer words from shorter ones",
            "Common letter combinations: TH, ER, AN, RE, ED, ON, ES, ST, EN, OF",
            "Look for plural forms by adding S to words",
            "Past tense words often end in -ED",
            "Try words that start with common prefixes: UN-, RE-, IN-",
            "Short connecting words: TO, OF, IN, ON, AT, BY",
            "Action words (verbs): RUN, WALK, TALK, SING, READ"
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        
        // Show hint with special styling to indicate it was earned
        this.showRewardedMessage(`💡 Hint: ${randomHint}`, 4000);
        
        // Track hint usage for analytics
        if (this.sdk && this.sdk.analytics) {
            this.sdk.analytics.trackEvent('hint_used', {
                hintsUsed: (this.hintsUsed || 0) + 1,
                currentScore: this.score,
                wordsFound: this.foundWords.length
            });
        }
        
        this.hintsUsed = (this.hintsUsed || 0) + 1;
    }
    
    showRewardedMessage(text, duration = 3000) {
        // Remove existing message
        const existingMessage = document.querySelector('.rewarded-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'rewarded-message';
        message.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: #6aaa64;
            color: white;
            padding: 16px 24px;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #5a9a5a;
            animation: rewardedSlide 0.3s ease;
            max-width: 80%;
            text-align: center;
            line-height: 1.4;
            letter-spacing: 0.5px;
        `;
        message.innerHTML = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, duration);
    }
    
    // SDK Integration Methods
    getGameState() {
        return {
            currentWord: this.currentWord,
            foundWords: this.foundWords,
            score: this.score,
            streak: this.streak,
            gameComplete: this.gameComplete,
            availableLetters: this.availableLetters
        };
    }
    
    pauseGame() {
        this.gamePaused = true;
        this.updateStatus('Game paused');
    }
    
    resumeGame() {
        this.gamePaused = false;
        this.updateStatus(this.gameComplete ? 'Challenge completed!' : 'Find words using the letters below!');
    }
    
    resetGame() {
        this.currentWord = [];
        this.foundWords = [];
        this.availableLetters = [...this.dailyLetters];
        this.score = 0;
        this.streak = 0;
        this.gameComplete = false;
        
        this.wordChain.innerHTML = '';
        this.createCurrentWordSlots();
        this.createAvailableLetters();
        this.updateDisplay();
        this.updateStatus('Find words using the letters below!');
    }
}

// Add CSS for animations and clean NYT-style design
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
    }
    
    @keyframes slideDown {
        from { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-8px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0); 
        }
    }
    
    @keyframes rewardedSlide {
        0% { 
            transform: translateX(-50%) translateY(-12px);
            opacity: 0;
        }
        100% { 
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    /* Clean hint button styling with ad indicator */
    #hint-btn {
        position: relative;
        background: #787c7e !important;
        border-color: #787c7e !important;
    }
    
    #hint-btn:hover {
        background: #565758 !important;
        border-color: #565758 !important;
    }
    
    #hint-btn::after {
        content: "AD";
        position: absolute;
        top: -6px;
        right: -6px;
        background: #1a1a1a;
        color: white;
        border-radius: 2px;
        width: 18px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    
    #hint-btn:disabled {
        background: #f6f7f8 !important;
        color: #d3d6da !important;
        border-color: #e6e6e6 !important;
        cursor: not-allowed;
    }
    
    #hint-btn:disabled::after {
        display: none;
    }
    
    /* Clean message styling */
    .game-message {
        font-family: 'NYTimes', 'Helvetica Neue', Arial, sans-serif;
    }
    
    .rewarded-message {
        font-family: 'NYTimes', 'Helvetica Neue', Arial, sans-serif;
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wordChainGame = new WordChainGame();
});