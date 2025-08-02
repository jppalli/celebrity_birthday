// Daily Quote Puzzle - Calendar Quotes Database
// Each quote includes the original text, author, scrambled words, and scrambled author name

const quotesCalendar = [
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "scrambledAuthor": "uzt oal",
        "scrambledWords": [
            {
                "original": "journey",
                "scrambled": "yenruoj",
                "index": 1
            },
            {
                "original": "thousand",
                "scrambled": "dnasuoht",
                "index": 4
            },
            {
                "original": "begins",
                "scrambled": "snigeb",
                "index": 6
            },
            {
                "original": "step",
                "scrambled": "pets",
                "index": 10
            }
        ],
        "date": "2025-06-01"
    },
    {
        "text": "You must be the change you wish to see in the world.",
        "author": "Mahatma Gandhi",
        "scrambledAuthor": "ihdnag amtaham",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 4
            },
            {
                "original": "wish",
                "scrambled": "hsiw",
                "index": 6
            },
            {
                "original": "see",
                "scrambled": "ees",
                "index": 8
            },
            {
                "original": "world",
                "scrambled": "dlrow",
                "index": 11
            }
        ],
        "date": "2025-06-02"
    },
    {
        "text": "Happiness is not something ready made. It comes from your own actions.",
        "author": "Dalai Lama",
        "scrambledAuthor": "dmaiaa lal",
        "scrambledWords": [
            {
                "original": "happiness",
                "scrambled": "ssenippah",
                "index": 0
            },
            {
                "original": "something",
                "scrambled": "gnihtemos",
                "index": 3
            },
            {
                "original": "comes",
                "scrambled": "semoc",
                "index": 7
            },
            {
                "original": "actions",
                "scrambled": "snoitca",
                "index": 11
            }
        ],
        "date": "2025-06-03"
    },
    {
        "text": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 1
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 1
            },
            {
                "original": "where",
                "scrambled": "erehw",
                "index": 8
            },
            {
                "original": "are",
                "scrambled": "era",
                "index": 10
            }
        ],
        "date": "2025-06-04"
    },
    {
        "text": "Every moment is a fresh beginning.",
        "author": "T.S. Eliot",
        "scrambledAuthor": "toile .s.t",
        "scrambledWords": [
            {
                "original": "every",
                "scrambled": "yreve",
                "index": 0
            },
            {
                "original": "moment",
                "scrambled": "tnemom",
                "index": 1
            },
            {
                "original": "fresh",
                "scrambled": "hserf",
                "index": 4
            },
            {
                "original": "beginning",
                "scrambled": "gninnigeb",
                "index": 5
            }
        ],
        "date": "2025-06-05"
    },
    {
        "text": "The only limit to our realization of tomorrow will be our doubts of today.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "limit",
                "scrambled": "timil",
                "index": 2
            },
            {
                "original": "realization",
                "scrambled": "noitazilaer",
                "index": 5
            },
            {
                "original": "doubts",
                "scrambled": "tudsbo",
                "index": 11
            },
            {
                "original": "today",
                "scrambled": "yadot",
                "index": 13
            }
        ],
        "date": "2025-06-06"
    },
    {
        "text": "To handle yourself, use your head; to handle others, use your heart.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "handle",
                "scrambled": "eldnah",
                "index": 1
            },
            {
                "original": "yourself",
                "scrambled": "flesruoy",
                "index": 2
            },
            {
                "original": "handle",
                "scrambled": "eldnah",
                "index": 1
            },
            {
                "original": "heart",
                "scrambled": "traeh",
                "index": 11
            }
        ],
        "date": "2025-06-07"
    },
    {
        "text": "The mind is everything. What you think you become.",
        "author": "Buddha",
        "scrambledAuthor": "ahddub",
        "scrambledWords": [
            {
                "original": "mind",
                "scrambled": "dnim",
                "index": 1
            },
            {
                "original": "everything",
                "scrambled": "gnihtyreve",
                "index": 3
            },
            {
                "original": "think",
                "scrambled": "kniht",
                "index": 6
            },
            {
                "original": "become",
                "scrambled": "cemebo",
                "index": 8
            }
        ],
        "date": "2025-06-08"
    },
    {
        "text": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "author": "Aristotle",
        "scrambledAuthor": "eltotsira",
        "scrambledWords": [
            {
                "original": "repeatedly",
                "scrambled": "eypltrdaee",
                "index": 4
            },
            {
                "original": "excellence",
                "scrambled": "cxleeecenl",
                "index": 6
            },
            {
                "original": "act",
                "scrambled": "tca",
                "index": 11
            },
            {
                "original": "habit",
                "scrambled": "tibah",
                "index": 14
            }
        ],
        "date": "2025-06-09"
    },
    {
        "text": "Keep your face always toward the sunshine and shadows will fall behind you.",
        "author": "Walt Whitman",
        "scrambledAuthor": "namtihw tlaw",
        "scrambledWords": [
            {
                "original": "face",
                "scrambled": "ecaf",
                "index": 2
            },
            {
                "original": "always",
                "scrambled": "syawla",
                "index": 3
            },
            {
                "original": "sunshine",
                "scrambled": "enihsnus",
                "index": 6
            },
            {
                "original": "behind",
                "scrambled": "dniheb",
                "index": 11
            }
        ],
        "date": "2025-06-10"
    },
    {
        "text": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "nosreme odlaw hplar",
        "scrambledWords": [
            {
                "original": "behind",
                "scrambled": "dniheb",
                "index": 2
            },
            {
                "original": "before",
                "scrambled": "erofeb",
                "index": 7
            },
            {
                "original": "matters",
                "scrambled": "srettam",
                "index": 11
            },
            {
                "original": "within",
                "scrambled": "nihtiw",
                "index": 16
            }
        ],
        "date": "2025-06-11"
    },
    {
        "text": "The only way to make sense out of change is to plunge into it, move with it, and enjoy the dance.",
        "author": "Alan Watts",
        "scrambledAuthor": "sttaw nala",
        "scrambledWords": [
            {
                "original": "make",
                "scrambled": "ekam",
                "index": 4
            },
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 8
            },
            {
                "original": "plunge",
                "scrambled": "egnulp",
                "index": 11
            },
            {
                "original": "enjoy",
                "scrambled": "yojne",
                "index": 18
            }
        ],
        "date": "2025-06-12"
    },
    {
        "text": "Life is either a daring adventure or nothing at all.",
        "author": "Helen Keller",
        "scrambledAuthor": "rellek neleh",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "efil",
                "index": 0
            },
            {
                "original": "daring",
                "scrambled": "gnirad",
                "index": 4
            },
            {
                "original": "adventure",
                "scrambled": "erutnevda",
                "index": 5
            },
            {
                "original": "nothing",
                "scrambled": "gnihton",
                "index": 7
            }
        ],
        "date": "2025-06-13"
    },
    {
        "text": "You miss 100 percent of the shots you don't take.",
        "author": "Wayne Gretzky",
        "scrambledAuthor": "ykzterg enyaw",
        "scrambledWords": [
            {
                "original": "miss",
                "scrambled": "ssim",
                "index": 1
            },
            {
                "original": "percent",
                "scrambled": "tnecrep",
                "index": 3
            },
            {
                "original": "shots",
                "scrambled": "stohs",
                "index": 6
            },
            {
                "original": "take",
                "scrambled": "ekat",
                "index": 9
            }
        ],
        "date": "2025-06-14"
    },
    {
        "text": "The greatest wealth is to live content with little.",
        "author": "Plato",
        "scrambledAuthor": "otalp",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tsetaerg",
                "index": 1
            },
            {
                "original": "wealth",
                "scrambled": "htlaew",
                "index": 2
            },
            {
                "original": "content",
                "scrambled": "etnonct",
                "index": 6
            },
            {
                "original": "little",
                "scrambled": "elttil",
                "index": 8
            }
        ],
        "date": "2025-06-15"
    },
    {
        "text": "Success is to be measured not by wealth, but by the legacy you leave behind.",
        "author": "Unknown",
        "scrambledAuthor": "nwonknu",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 0
            },
            {
                "original": "measured",
                "scrambled": "derusaem",
                "index": 4
            },
            {
                "original": "wealth",
                "scrambled": "htlaew",
                "index": 7
            },
            {
                "original": "legacy",
                "scrambled": "ycagel",
                "index": 11
            }
        ],
        "date": "2025-06-16"
    },
    {
        "text": "The purpose of our lives is to be happy.",
        "author": "Dalai Lama",
        "scrambledAuthor": "aadailam l",
        "scrambledWords": [
            {
                "original": "purpose",
                "scrambled": "esoprup",
                "index": 1
            },
            {
                "original": "lives",
                "scrambled": "sevil",
                "index": 4
            },
            {
                "original": "be",
                "scrambled": "eb",
                "index": 7
            },
            {
                "original": "happy",
                "scrambled": "yppah",
                "index": 8
            }
        ],
        "date": "2025-06-17"
    },
    {
        "text": "Change your thoughts and you change your world.",
        "author": "Norman Vincent Peale",
        "scrambledAuthor": "elaep tnecniv namron",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 0
            },
            {
                "original": "thoughts",
                "scrambled": "sthguoht",
                "index": 2
            },
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 0
            },
            {
                "original": "world",
                "scrambled": "dlrow",
                "index": 7
            }
        ],
        "date": "2025-06-18"
    },
    {
        "text": "The only person you are destined to become is the person you decide to be.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "nosreme odlaw hplar",
        "scrambledWords": [
            {
                "original": "person",
                "scrambled": "nosrep",
                "index": 2
            },
            {
                "original": "destined",
                "scrambled": "denitsed",
                "index": 5
            },
            {
                "original": "become",
                "scrambled": "mbeeoc",
                "index": 7
            },
            {
                "original": "decide",
                "scrambled": "ediced",
                "index": 12
            }
        ],
        "date": "2025-06-19"
    },
    {
        "text": "It is never too late to be what you might have been.",
        "author": "T.S. Eliot",
        "scrambledAuthor": "toile .s.t",
        "scrambledWords": [
            {
                "original": "never",
                "scrambled": "reven",
                "index": 2
            },
            {
                "original": "late",
                "scrambled": "etal",
                "index": 4
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 7
            },
            {
                "original": "been",
                "scrambled": "neeb",
                "index": 11
            }
        ],
        "date": "2025-06-20"
    },
    {
        "text": "You cannot shake hands with a clenched fist.",
        "author": "Mahatma Gandhi",
        "scrambledAuthor": "ihdnag amtaham",
        "scrambledWords": [
            {
                "original": "cannot",
                "scrambled": "tonnac",
                "index": 1
            },
            {
                "original": "shake",
                "scrambled": "ekahs",
                "index": 2
            },
            {
                "original": "clenched",
                "scrambled": "dehcnelc",
                "index": 6
            },
            {
                "original": "fist",
                "scrambled": "tsif",
                "index": 7
            }
        ],
        "date": "2025-06-21"
    },
    {
        "text": "The secret of getting ahead is getting started.",
        "author": "Mark Twain",
        "scrambledAuthor": "niawt kram",
        "scrambledWords": [
            {
                "original": "secret",
                "scrambled": "terces",
                "index": 1
            },
            {
                "original": "getting",
                "scrambled": "gnitteg",
                "index": 3
            },
            {
                "original": "ahead",
                "scrambled": "daeha",
                "index": 4
            },
            {
                "original": "started",
                "scrambled": "detrats",
                "index": 7
            }
        ],
        "date": "2025-06-22"
    },
    {
        "text": "What we think, we become.",
        "author": "Buddha",
        "scrambledAuthor": "ahddub",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 0
            },
            {
                "original": "think",
                "scrambled": "kniht",
                "index": 2
            },
            {
                "original": "we",
                "scrambled": "ew",
                "index": 1
            },
            {
                "original": "become",
                "scrambled": "cebmoe",
                "index": 4
            }
        ],
        "date": "2025-06-23"
    },
    {
        "text": "A goal is a dream with a deadline.",
        "author": "Napoleon Hill",
        "scrambledAuthor": "llih noelopan",
        "scrambledWords": [
            {
                "original": "goal",
                "scrambled": "laog",
                "index": 1
            },
            {
                "original": "dream",
                "scrambled": "maerd",
                "index": 4
            },
            {
                "original": "with",
                "scrambled": "htiw",
                "index": 5
            },
            {
                "original": "deadline",
                "scrambled": "enildaed",
                "index": 7
            }
        ],
        "date": "2025-06-24"
    },
    {
        "text": "Act as if what you do makes a difference. It does.",
        "author": "William James",
        "scrambledAuthor": "semaj mailliw",
        "scrambledWords": [
            {
                "original": "act",
                "scrambled": "tca",
                "index": 0
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 3
            },
            {
                "original": "makes",
                "scrambled": "sekam",
                "index": 6
            },
            {
                "original": "difference",
                "scrambled": "ecnereffid",
                "index": 8
            }
        ],
        "date": "2025-06-25"
    },
    {
        "text": "The best preparation for tomorrow is doing your best today.",
        "author": "Jesse Jackson",
        "scrambledAuthor": "noskcaj essej",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "preparation",
                "scrambled": "noitaraperp",
                "index": 2
            },
            {
                "original": "tomorrow",
                "scrambled": "worromot",
                "index": 4
            },
            {
                "original": "today",
                "scrambled": "yadot",
                "index": 9
            }
        ],
        "date": "2025-06-26"
    },
    {
        "text": "You are never too old to set another goal or to dream a new dream.",
        "author": "C.S. Lewis",
        "scrambledAuthor": "siwel .s.c",
        "scrambledWords": [
            {
                "original": "never",
                "scrambled": "reven",
                "index": 2
            },
            {
                "original": "set",
                "scrambled": "tes",
                "index": 6
            },
            {
                "original": "goal",
                "scrambled": "laog",
                "index": 8
            },
            {
                "original": "dream",
                "scrambled": "maerd",
                "index": 11
            }
        ],
        "date": "2025-06-27"
    },
    {
        "text": "The only true wisdom is in knowing you know nothing.",
        "author": "Socrates",
        "scrambledAuthor": "asrtceso",
        "scrambledWords": [
            {
                "original": "true",
                "scrambled": "eurt",
                "index": 2
            },
            {
                "original": "wisdom",
                "scrambled": "modsiw",
                "index": 3
            },
            {
                "original": "knowing",
                "scrambled": "gniknow",
                "index": 6
            },
            {
                "original": "nothing",
                "scrambled": "gnihton",
                "index": 9
            }
        ],
        "date": "2025-06-28"
    },
    {
        "text": "It is not the mountain we conquer, but ourselves.",
        "author": "Edmund Hillary",
        "scrambledAuthor": "yrallih dnumde",
        "scrambledWords": [
            {
                "original": "mountain",
                "scrambled": "niatnuom",
                "index": 4
            },
            {
                "original": "conquer",
                "scrambled": "reuqnoc",
                "index": 6
            },
            {
                "original": "but",
                "scrambled": "tub",
                "index": 7
            },
            {
                "original": "ourselves",
                "scrambled": "sevlesruo",
                "index": 8
            }
        ],
        "date": "2025-06-29"
    },
    {
        "text": "Life is short, and it is up to you to make it sweet.",
        "author": "Sarah Bernhardt",
        "scrambledAuthor": "tdrahnreb haras",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "efil",
                "index": 0
            },
            {
                "original": "short",
                "scrambled": "trohs",
                "index": 2
            },
            {
                "original": "make",
                "scrambled": "ekam",
                "index": 10
            },
            {
                "original": "sweet",
                "scrambled": "teews",
                "index": 12
            }
        ],
        "date": "2025-06-30"
    },
    {
        "text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney",
        "scrambledAuthor": "yensid tlaw",
        "scrambledWords": [
            {
                "original": "started",
                "scrambled": "detrats",
                "index": 4
            },
            {
                "original": "quit",
                "scrambled": "tiuq",
                "index": 7
            },
            {
                "original": "talking",
                "scrambled": "gniklat",
                "index": 8
            },
            {
                "original": "begin",
                "scrambled": "nigeb",
                "index": 10
            }
        ],
        "date": "2025-07-01"
    },
    {
        "text": "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        "author": "James Cameron",
        "scrambledAuthor": "noremac semaj",
        "scrambledWords": [
            {
                "original": "goals",
                "scrambled": "slaog",
                "index": 4
            },
            {
                "original": "ridiculously",
                "scrambled": "ylsuolucidri",
                "index": 5
            },
            {
                "original": "failure",
                "scrambled": "eruliaf",
                "index": 10
            },
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 17
            }
        ],
        "date": "2025-07-02"
    },
    {
        "text": "If you look at what you have in life, you'll always have more.",
        "author": "Oprah Winfrey",
        "scrambledAuthor": "yerfniw harpo",
        "scrambledWords": [
            {
                "original": "look",
                "scrambled": "kool",
                "index": 2
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 4
            },
            {
                "original": "life",
                "scrambled": "efil",
                "index": 8
            },
            {
                "original": "always",
                "scrambled": "syawla",
                "index": 10
            }
        ],
        "date": "2025-07-03"
    },
    {
        "text": "If life were predictable it would cease to be life, and be without flavor.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "efil",
                "index": 1
            },
            {
                "original": "predictable",
                "scrambled": "elbatciderp",
                "index": 3
            },
            {
                "original": "cease",
                "scrambled": "esaec",
                "index": 6
            },
            {
                "original": "flavor",
                "scrambled": "rovalf",
                "index": 13
            }
        ],
        "date": "2025-07-04"
    },
    {
        "text": "The greatest glory in living is not in never falling, but in rising every time we fall.",
        "author": "Nelson Mandela",
        "scrambledAuthor": "alednam noslen",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tsetaerg",
                "index": 1
            },
            {
                "original": "glory",
                "scrambled": "yrolg",
                "index": 2
            },
            {
                "original": "falling",
                "scrambled": "gnillaf",
                "index": 9
            },
            {
                "original": "rising",
                "scrambled": "gnisir",
                "index": 12
            }
        ],
        "date": "2025-07-05"
    },
    {
        "text": "It does not matter how slowly you go as long as you do not stop.",
        "author": "Confucius",
        "scrambledAuthor": "suicufnoc",
        "scrambledWords": [
            {
                "original": "matter",
                "scrambled": "rettam",
                "index": 3
            },
            {
                "original": "slowly",
                "scrambled": "ylwols",
                "index": 5
            },
            {
                "original": "long",
                "scrambled": "gnol",
                "index": 9
            },
            {
                "original": "stop",
                "scrambled": "pots",
                "index": 14
            }
        ],
        "date": "2025-07-06"
    },
    {
        "text": "Whether you think you can or you think you can't, you're right.",
        "author": "Henry Ford",
        "scrambledAuthor": "drof yrneh",
        "scrambledWords": [
            {
                "original": "whether",
                "scrambled": "rehtehw",
                "index": 0
            },
            {
                "original": "think",
                "scrambled": "kniht",
                "index": 2
            },
            {
                "original": "think",
                "scrambled": "kniht",
                "index": 2
            },
            {
                "original": "right",
                "scrambled": "thgir",
                "index": 11
            }
        ],
        "date": "2025-07-07"
    },
    {
        "text": "The best revenge is massive success.",
        "author": "Frank Sinatra",
        "scrambledAuthor": "artanis knarf",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "revenge",
                "scrambled": "gvnreee",
                "index": 2
            },
            {
                "original": "massive",
                "scrambled": "evissam",
                "index": 4
            },
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 5
            }
        ],
        "date": "2025-07-08"
    },
    {
        "text": "Life is what we make it, always has been, always will be.",
        "author": "Grandma Moses",
        "scrambledAuthor": "sesom amdnarg",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "efil",
                "index": 0
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 2
            },
            {
                "original": "make",
                "scrambled": "ekam",
                "index": 4
            },
            {
                "original": "always",
                "scrambled": "syawla",
                "index": 6
            }
        ],
        "date": "2025-07-09"
    },
    {
        "text": "The only impossible journey is the one you never start.",
        "author": "Tony Robbins",
        "scrambledAuthor": "snibbor ynot",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "impossible",
                "scrambled": "elbissopmi",
                "index": 2
            },
            {
                "original": "journey",
                "scrambled": "yenruoj",
                "index": 3
            },
            {
                "original": "never",
                "scrambled": "reven",
                "index": 8
            }
        ],
        "date": "2025-07-10"
    },
    {
        "text": "Believe you can and you're halfway there.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "believe",
                "scrambled": "eveileb",
                "index": 0
            },
            {
                "original": "can",
                "scrambled": "nac",
                "index": 2
            },
            {
                "original": "you're",
                "scrambled": "er'uoy",
                "index": 4
            },
            {
                "original": "halfway",
                "scrambled": "yawflah",
                "index": 5
            }
        ],
        "date": "2025-07-11"
    },
    {
        "text": "It is during our darkest moments that we must focus to see the light.",
        "author": "Aristotle",
        "scrambledAuthor": "eltotsira",
        "scrambledWords": [
            {
                "original": "during",
                "scrambled": "gnirud",
                "index": 2
            },
            {
                "original": "darkest",
                "scrambled": "tsekrad",
                "index": 4
            },
            {
                "original": "moments",
                "scrambled": "stnemom",
                "index": 5
            },
            {
                "original": "focus",
                "scrambled": "sucof",
                "index": 9
            }
        ],
        "date": "2025-07-12"
    },
    {
        "text": "Don't let yesterday take up too much of today.",
        "author": "Will Rogers",
        "scrambledAuthor": "sregor lliw",
        "scrambledWords": [
            {
                "original": "yesterday",
                "scrambled": "yadretsey",
                "index": 2
            },
            {
                "original": "take",
                "scrambled": "ekat",
                "index": 3
            },
            {
                "original": "much",
                "scrambled": "hcum",
                "index": 6
            },
            {
                "original": "today",
                "scrambled": "yadot",
                "index": 8
            }
        ],
        "date": "2025-07-13"
    },
    {
        "text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney",
        "scrambledAuthor": "yensid tlaw",
        "scrambledWords": [
            {
                "original": "started",
                "scrambled": "detrats",
                "index": 4
            },
            {
                "original": "quit",
                "scrambled": "tiuq",
                "index": 7
            },
            {
                "original": "talking",
                "scrambled": "gniklat",
                "index": 8
            },
            {
                "original": "doing",
                "scrambled": "gniod",
                "index": 11
            }
        ],
        "date": "2025-07-14"
    },
    {
        "text": "Your time is limited, don't waste it living someone else's life.",
        "author": "Steve Jobs",
        "scrambledAuthor": "sboj evets",
        "scrambledWords": [
            {
                "original": "time",
                "scrambled": "emit",
                "index": 1
            },
            {
                "original": "limited",
                "scrambled": "detimil",
                "index": 3
            },
            {
                "original": "waste",
                "scrambled": "etsaw",
                "index": 5
            },
            {
                "original": "living",
                "scrambled": "gnivil",
                "index": 7
            }
        ],
        "date": "2025-07-15"
    },
    {
        "text": "The best time to plant a tree was 20 years ago. The second best time is now.",
        "author": "Chinese Proverb",
        "scrambledAuthor": "brevorp esenihc",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "plant",
                "scrambled": "tnalp",
                "index": 4
            },
            {
                "original": "years",
                "scrambled": "sraey",
                "index": 9
            },
            {
                "original": "second",
                "scrambled": "dnoces",
                "index": 12
            }
        ],
        "date": "2025-07-16"
    },
    {
        "text": "Innovation distinguishes between a leader and a follower.",
        "author": "Steve Jobs",
        "scrambledAuthor": "sboj evets",
        "scrambledWords": [
            {
                "original": "innovation",
                "scrambled": "noitavonni",
                "index": 0
            },
            {
                "original": "distinguishes",
                "scrambled": "sehsiugnitsid",
                "index": 1
            },
            {
                "original": "leader",
                "scrambled": "redael",
                "index": 4
            },
            {
                "original": "follower",
                "scrambled": "rewollof",
                "index": 7
            }
        ],
        "date": "2025-07-17"
    },
    {
        "text": "The only thing we have to fear is fear itself.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "gniht",
                "index": 2
            },
            {
                "original": "fear",
                "scrambled": "raef",
                "index": 6
            },
            {
                "original": "itself",
                "scrambled": "flesti",
                "index": 9
            }
        ],
        "date": "2025-07-18"
    },
    {
        "text": "In the middle of difficulty lies opportunity.",
        "author": "Albert Einstein",
        "scrambledAuthor": "nietsnie trebla",
        "scrambledWords": [
            {
                "original": "middle",
                "scrambled": "elddim",
                "index": 2
            },
            {
                "original": "difficulty",
                "scrambled": "ytluciffid",
                "index": 4
            },
            {
                "original": "lies",
                "scrambled": "seil",
                "index": 5
            },
            {
                "original": "opportunity",
                "scrambled": "nyrioutppot",
                "index": 6
            }
        ],
        "date": "2025-07-19"
    },
    {
        "text": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "author": "Winston Churchill",
        "scrambledAuthor": "llihcruhc notsniw",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 0
            },
            {
                "original": "failure",
                "scrambled": "eruliaf",
                "index": 4
            },
            {
                "original": "courage",
                "scrambled": "egaruoc",
                "index": 11
            },
            {
                "original": "continue",
                "scrambled": "eunitnoc",
                "index": 13
            }
        ],
        "date": "2025-07-20"
    },
    {
        "text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "erutuf",
                "index": 1
            },
            {
                "original": "belongs",
                "scrambled": "sgnoleb",
                "index": 2
            },
            {
                "original": "believe",
                "scrambled": "eveileb",
                "index": 6
            },
            {
                "original": "beauty",
                "scrambled": "ytuaeb",
                "index": 9
            }
        ],
        "date": "2025-07-21"
    },
    {
        "text": "Be yourself; everyone else is already taken.",
        "author": "Oscar Wilde",
        "scrambledAuthor": "edliw racso",
        "scrambledWords": [
            {
                "original": "yourself",
                "scrambled": "flesruoy",
                "index": 1
            },
            {
                "original": "everyone",
                "scrambled": "enoyreve",
                "index": 2
            },
            {
                "original": "already",
                "scrambled": "ydaerla",
                "index": 5
            },
            {
                "original": "taken",
                "scrambled": "nekat",
                "index": 6
            }
        ],
        "date": "2025-07-22"
    },
    {
        "text": "Life is what happens when you're busy making other plans.",
        "author": "John Lennon",
        "scrambledAuthor": "nonnel nhoj",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 2
            },
            {
                "original": "happens",
                "scrambled": "sneppah",
                "index": 3
            },
            {
                "original": "busy",
                "scrambled": "ysub",
                "index": 6
            },
            {
                "original": "making",
                "scrambled": "gnikam",
                "index": 7
            }
        ],
        "date": "2025-07-23"
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "scrambledAuthor": "sboj evets",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "great",
                "scrambled": "taerg",
                "index": 5
            },
            {
                "original": "work",
                "scrambled": "krow",
                "index": 6
            },
            {
                "original": "love",
                "scrambled": "evol",
                "index": 9
            }
        ],
        "date": "2025-07-24"
    },
    {
        "text": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        "author": "Benjamin Franklin",
        "scrambledAuthor": "nilknarf nimajneb",
        "scrambledWords": [
            {
                "original": "tell",
                "scrambled": "llet",
                "index": 0
            },
            {
                "original": "forget",
                "scrambled": "tegrof",
                "index": 4
            },
            {
                "original": "remember",
                "scrambled": "rebmemer",
                "index": 9
            },
            {
                "original": "learn",
                "scrambled": "nrael",
                "index": 14
            }
        ],
        "date": "2025-07-25"
    },
    {
        "text": "You have been assigned this mountain to show others it can be moved.",
        "author": "Unknown",
        "scrambledAuthor": "nwonknu",
        "scrambledWords": [
            {
                "original": "assigned",
                "scrambled": "dengissa",
                "index": 3
            },
            {
                "original": "mountain",
                "scrambled": "niatnuom",
                "index": 5
            },
            {
                "original": "show",
                "scrambled": "wohs",
                "index": 7
            },
            {
                "original": "moved",
                "scrambled": "devom",
                "index": 12
            }
        ],
        "date": "2025-07-26"
    },
    {
        "text": "Do not go where the path may lead, go where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "nosreme odlaw hplar",
        "scrambledWords": [
            {
                "original": "where",
                "scrambled": "erehw",
                "index": 3
            },
            {
                "original": "path",
                "scrambled": "htap",
                "index": 5
            },
            {
                "original": "where",
                "scrambled": "erehw",
                "index": 3
            },
            {
                "original": "trail",
                "scrambled": "liart",
                "index": 17
            }
        ],
        "date": "2025-07-27"
    },
    {
        "text": "It is better to be hated for what you are than to be loved for what you are not.",
        "author": "André Gide",
        "scrambledAuthor": "edig érdna",
        "scrambledWords": [
            {
                "original": "better",
                "scrambled": "retteb",
                "index": 2
            },
            {
                "original": "hated",
                "scrambled": "detah",
                "index": 5
            },
            {
                "original": "loved",
                "scrambled": "devol",
                "index": 13
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 7
            }
        ],
        "date": "2025-07-28"
    },
    {
        "text": "Always remember that you are absolutely unique. Just like everyone else.",
        "author": "Mark Twain",
        "scrambledAuthor": "niawt kram",
        "scrambledWords": [
            {
                "original": "remember",
                "scrambled": "rebmemer",
                "index": 1
            },
            {
                "original": "absolutely",
                "scrambled": "yletulosba",
                "index": 5
            },
            {
                "original": "unique",
                "scrambled": "euqinu",
                "index": 6
            },
            {
                "original": "everyone",
                "scrambled": "enoyreve",
                "index": 9
            }
        ],
        "date": "2025-07-29"
    },
    {
        "text": "When you reach the end of your rope, tie a knot in it and hang on.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "reach",
                "scrambled": "hcaer",
                "index": 2
            },
            {
                "original": "rope",
                "scrambled": "epor",
                "index": 7
            },
            {
                "original": "knot",
                "scrambled": "tonk",
                "index": 10
            },
            {
                "original": "hang",
                "scrambled": "gnah",
                "index": 14
            }
        ],
        "date": "2025-07-30"
    },
    {
        "text": "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        "author": "Mother Teresa",
        "scrambledAuthor": "aseret rehtom",
        "scrambledWords": [
            {
                "original": "spread",
                "scrambled": "daerps",
                "index": 0
            },
            {
                "original": "everywhere",
                "scrambled": "erehwyreve",
                "index": 2
            },
            {
                "original": "leaving",
                "scrambled": "gnivael",
                "index": 13
            },
            {
                "original": "happier",
                "scrambled": "reippah",
                "index": 14
            }
        ],
        "date": "2025-07-31"
    },
    {
        "text": "The only real mistake is the one from which we learn nothing.",
        "author": "Henry Ford",
        "scrambledAuthor": "drof yrneh",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "mistake",
                "scrambled": "imktase",
                "index": 3
            },
            {
                "original": "learn",
                "scrambled": "nrael",
                "index": 10
            },
            {
                "original": "nothing",
                "scrambled": "gnihton",
                "index": 11
            }
        ],
        "date": "2025-08-01"
    },
    {
        "text": "The future starts today, not tomorrow.",
        "author": "Pope John Paul II",
        "scrambledAuthor": "ii luap nhoj epop",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "erutuf",
                "index": 1
            },
            {
                "original": "starts",
                "scrambled": "strats",
                "index": 2
            },
            {
                "original": "today",
                "scrambled": "yadot",
                "index": 3
            },
            {
                "original": "tomorrow",
                "scrambled": "worromot",
                "index": 5
            }
        ],
        "date": "2025-08-02"
    },
    {
        "text": "You don't have to be great to start, but you have to start to be great.",
        "author": "Zig Ziglar",
        "scrambledAuthor": "ralgiz giz",
        "scrambledWords": [
            {
                "original": "great",
                "scrambled": "taerg",
                "index": 5
            },
            {
                "original": "start",
                "scrambled": "trats",
                "index": 7
            },
            {
                "original": "start",
                "scrambled": "trats",
                "index": 7
            },
            {
                "original": "great",
                "scrambled": "taerg",
                "index": 5
            }
        ],
        "date": "2025-08-03"
    },
    {
        "text": "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
        "author": "Oprah Winfrey",
        "scrambledAuthor": "yerfniw harpo",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tsetaerg",
                "index": 1
            },
            {
                "original": "discovery",
                "scrambled": "yrevocsid",
                "index": 2
            },
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 11
            },
            {
                "original": "attitude",
                "scrambled": "ieautttd",
                "index": 18
            }
        ],
        "date": "2025-08-04"
    },
    {
        "text": "Do one thing every day that scares you.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "one",
                "scrambled": "eno",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "gniht",
                "index": 2
            },
            {
                "original": "day",
                "scrambled": "yad",
                "index": 4
            },
            {
                "original": "scares",
                "scrambled": "seracs",
                "index": 6
            }
        ],
        "date": "2025-08-05"
    },
    {
        "text": "What you do today can improve all your tomorrows.",
        "author": "Ralph Nader",
        "scrambledAuthor": "redan hplar",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 0
            },
            {
                "original": "today",
                "scrambled": "yadot",
                "index": 3
            },
            {
                "original": "improve",
                "scrambled": "evorpmi",
                "index": 5
            },
            {
                "original": "tomorrows",
                "scrambled": "sworromot",
                "index": 8
            }
        ],
        "date": "2025-08-06"
    },
    {
        "text": "Success is not the absence of obstacles, but the courage to push through them.",
        "author": "Unknown",
        "scrambledAuthor": "nwonknu",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 0
            },
            {
                "original": "absence",
                "scrambled": "ecnesba",
                "index": 4
            },
            {
                "original": "courage",
                "scrambled": "egaruoc",
                "index": 9
            },
            {
                "original": "through",
                "scrambled": "hguorht",
                "index": 12
            }
        ],
        "date": "2025-08-07"
    },
    {
        "text": "The only thing standing between you and your goal is the story you keep telling yourself.",
        "author": "Tony Robbins",
        "scrambledAuthor": "snibbor ynot",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "standing",
                "scrambled": "gnidnats",
                "index": 3
            },
            {
                "original": "goal",
                "scrambled": "laog",
                "index": 8
            },
            {
                "original": "telling",
                "scrambled": "gnillet",
                "index": 14
            }
        ],
        "date": "2025-08-08"
    },
    {
        "text": "You can't go back and change the beginning, but you can start where you are and change the ending.",
        "author": "C.S. Lewis",
        "scrambledAuthor": "siwel .s.c",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 5
            },
            {
                "original": "beginning",
                "scrambled": "gninnigeb",
                "index": 7
            },
            {
                "original": "start",
                "scrambled": "trats",
                "index": 11
            },
            {
                "original": "ending",
                "scrambled": "gnidne",
                "index": 18
            }
        ],
        "date": "2025-08-09"
    },
    {
        "text": "The best way to predict the future is to create it.",
        "author": "Peter Drucker",
        "scrambledAuthor": "rekcurd retep",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "predict",
                "scrambled": "tciderp",
                "index": 4
            },
            {
                "original": "future",
                "scrambled": "erutuf",
                "index": 6
            },
            {
                "original": "create",
                "scrambled": "etaerc",
                "index": 9
            }
        ],
        "date": "2025-08-10"
    },
    {
        "text": "It is not what you look at that matters, it is what you see.",
        "author": "Henry David Thoreau",
        "scrambledAuthor": "uaeroht divad yrneh",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 3
            },
            {
                "original": "look",
                "scrambled": "kool",
                "index": 5
            },
            {
                "original": "matters",
                "scrambled": "srettam",
                "index": 8
            },
            {
                "original": "see",
                "scrambled": "ees",
                "index": 13
            }
        ],
        "date": "2025-08-11"
    },
    {
        "text": "The only way to achieve the impossible is to believe it is possible.",
        "author": "Lewis Carroll",
        "scrambledAuthor": "llorrac siwel",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "achieve",
                "scrambled": "eveihca",
                "index": 4
            },
            {
                "original": "impossible",
                "scrambled": "elbissopmi",
                "index": 6
            },
            {
                "original": "believe",
                "scrambled": "eveileb",
                "index": 9
            }
        ],
        "date": "2025-08-12"
    },
    {
        "text": "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "author": "A.A. Milne",
        "scrambledAuthor": "enlim .a.a",
        "scrambledWords": [
            {
                "original": "braver",
                "scrambled": "revarb",
                "index": 2
            },
            {
                "original": "believe",
                "scrambled": "eveileb",
                "index": 5
            },
            {
                "original": "stronger",
                "scrambled": "regnorts",
                "index": 6
            },
            {
                "original": "smarter",
                "scrambled": "retrams",
                "index": 11
            }
        ],
        "date": "2025-08-13"
    },
    {
        "text": "The greatest risk is not taking any risk at all.",
        "author": "Mark Zuckerberg",
        "scrambledAuthor": "grebrekcuz kram",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tsetaerg",
                "index": 1
            },
            {
                "original": "risk",
                "scrambled": "ksir",
                "index": 2
            },
            {
                "original": "taking",
                "scrambled": "gnikat",
                "index": 5
            },
            {
                "original": "risk",
                "scrambled": "ksir",
                "index": 2
            }
        ],
        "date": "2025-08-14"
    },
    {
        "text": "Don't watch the clock; do what it does. Keep going.",
        "author": "Sam Levenson",
        "scrambledAuthor": "nosnevel mas",
        "scrambledWords": [
            {
                "original": "watch",
                "scrambled": "hctaw",
                "index": 1
            },
            {
                "original": "clock",
                "scrambled": "kcolc",
                "index": 3
            },
            {
                "original": "does",
                "scrambled": "seod",
                "index": 7
            },
            {
                "original": "keep",
                "scrambled": "peek",
                "index": 8
            }
        ],
        "date": "2025-08-15"
    },
    {
        "text": "The only limit to our realization of tomorrow is our doubts of today.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "limit",
                "scrambled": "timil",
                "index": 2
            },
            {
                "original": "realization",
                "scrambled": "noitazilaer",
                "index": 5
            },
            {
                "original": "tomorrow",
                "scrambled": "worromot",
                "index": 7
            },
            {
                "original": "doubts",
                "scrambled": "dtoubs",
                "index": 10
            }
        ],
        "date": "2025-08-16"
    },
    {
        "text": "Your life does not get better by chance, it gets better by change.",
        "author": "Jim Rohn",
        "scrambledAuthor": "nhor mij",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "efil",
                "index": 1
            },
            {
                "original": "better",
                "scrambled": "retteb",
                "index": 5
            },
            {
                "original": "chance",
                "scrambled": "ecnahc",
                "index": 7
            },
            {
                "original": "change",
                "scrambled": "egnahc",
                "index": 12
            }
        ],
        "date": "2025-08-17"
    },
    {
        "text": "The only person you should try to be better than is the person you were yesterday.",
        "author": "Unknown",
        "scrambledAuthor": "nwonknu",
        "scrambledWords": [
            {
                "original": "person",
                "scrambled": "nosrep",
                "index": 2
            },
            {
                "original": "try",
                "scrambled": "yrt",
                "index": 5
            },
            {
                "original": "better",
                "scrambled": "retteb",
                "index": 8
            },
            {
                "original": "yesterday",
                "scrambled": "yadretsey",
                "index": 15
            }
        ],
        "date": "2025-08-18"
    },
    {
        "text": "Success is walking from failure to failure with no loss of enthusiasm.",
        "author": "Winston Churchill",
        "scrambledAuthor": "llihcruhc notsniw",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "sseccus",
                "index": 0
            },
            {
                "original": "failure",
                "scrambled": "eruliaf",
                "index": 4
            },
            {
                "original": "failure",
                "scrambled": "eruliaf",
                "index": 4
            },
            {
                "original": "enthusiasm",
                "scrambled": "hatseisumn",
                "index": 11
            }
        ],
        "date": "2025-08-19"
    },
    {
        "text": "The best way out is always through.",
        "author": "Robert Frost",
        "scrambledAuthor": "tsorf trebor",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "way",
                "scrambled": "yaw",
                "index": 2
            },
            {
                "original": "always",
                "scrambled": "syawla",
                "index": 5
            },
            {
                "original": "through",
                "scrambled": "hguorht",
                "index": 6
            }
        ],
        "date": "2025-08-20"
    },
    {
        "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "author": "Zig Ziglar",
        "scrambledAuthor": "ralgiz giz",
        "scrambledWords": [
            {
                "original": "achieving",
                "scrambled": "gniveihca",
                "index": 4
            },
            {
                "original": "goals",
                "scrambled": "slaog",
                "index": 6
            },
            {
                "original": "important",
                "scrambled": "tnatropmi",
                "index": 10
            },
            {
                "original": "become",
                "scrambled": "bemceo",
                "index": 14
            }
        ],
        "date": "2025-08-21"
    },
    {
        "text": "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible.",
        "author": "Irving Babbitt",
        "scrambledAuthor": "ttibbab gnivri",
        "scrambledWords": [
            {
                "original": "thing",
                "scrambled": "gniht",
                "index": 2
            },
            {
                "original": "dream",
                "scrambled": "maerd",
                "index": 9
            },
            {
                "original": "will",
                "scrambled": "lliw",
                "index": 12
            },
            {
                "original": "belief",
                "scrambled": "feileb",
                "index": 17
            }
        ],
        "date": "2025-08-22"
    },
    {
        "text": "You must do the thing you think you cannot do.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "must",
                "scrambled": "tsum",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "gniht",
                "index": 4
            },
            {
                "original": "think",
                "scrambled": "kniht",
                "index": 6
            },
            {
                "original": "cannot",
                "scrambled": "tonnac",
                "index": 8
            }
        ],
        "date": "2025-08-23"
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "scrambledAuthor": "sboj evets",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "great",
                "scrambled": "taerg",
                "index": 5
            },
            {
                "original": "love",
                "scrambled": "evol",
                "index": 9
            },
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 10
            }
        ],
        "date": "2025-08-24"
    },
    {
        "text": "If you want to lift yourself up, lift up someone else.",
        "author": "Booker T. Washington",
        "scrambledAuthor": "notgnihsaw .t rekoob",
        "scrambledWords": [
            {
                "original": "want",
                "scrambled": "tnaw",
                "index": 2
            },
            {
                "original": "lift",
                "scrambled": "tfil",
                "index": 4
            },
            {
                "original": "yourself",
                "scrambled": "flesruoy",
                "index": 5
            },
            {
                "original": "someone",
                "scrambled": "enoemos",
                "index": 9
            }
        ],
        "date": "2025-08-25"
    },
    {
        "text": "The greatest glory is not in never failing, but in rising up every time we fail.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "nosreme odlaw hplar",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tsetaerg",
                "index": 1
            },
            {
                "original": "glory",
                "scrambled": "yrolg",
                "index": 2
            },
            {
                "original": "failing",
                "scrambled": "gniliaf",
                "index": 7
            },
            {
                "original": "rising",
                "scrambled": "gnisir",
                "index": 10
            }
        ],
        "date": "2025-08-26"
    },
    {
        "text": "The only limit is the one you set yourself.",
        "author": "Unknown",
        "scrambledAuthor": "nwonknu",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "limit",
                "scrambled": "timil",
                "index": 2
            },
            {
                "original": "set",
                "scrambled": "tes",
                "index": 7
            },
            {
                "original": "yourself",
                "scrambled": "flesruoy",
                "index": 8
            }
        ],
        "date": "2025-08-27"
    },
    {
        "text": "You have within you, right now, everything you need to deal with whatever the world can throw at you.",
        "author": "Brian Tracy",
        "scrambledAuthor": "ycart nairb",
        "scrambledWords": [
            {
                "original": "within",
                "scrambled": "nihtiw",
                "index": 2
            },
            {
                "original": "right",
                "scrambled": "thgir",
                "index": 4
            },
            {
                "original": "everything",
                "scrambled": "gnihtyreve",
                "index": 6
            },
            {
                "original": "deal",
                "scrambled": "laed",
                "index": 10
            }
        ],
        "date": "2025-08-28"
    },
    {
        "text": "The only way to discover the limits of the possible is to go beyond them into the impossible.",
        "author": "Arthur C. Clarke",
        "scrambledAuthor": "ekralc .c ruhtra",
        "scrambledWords": [
            {
                "original": "discover",
                "scrambled": "revocsid",
                "index": 4
            },
            {
                "original": "limits",
                "scrambled": "stimil",
                "index": 6
            },
            {
                "original": "possible",
                "scrambled": "elbissop",
                "index": 9
            },
            {
                "original": "impossible",
                "scrambled": "elbissopmi",
                "index": 17
            }
        ],
        "date": "2025-08-29"
    },
    {
        "text": "What we achieve inwardly will change outer reality.",
        "author": "Plutarch",
        "scrambledAuthor": "hcratulp",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "tahw",
                "index": 0
            },
            {
                "original": "achieve",
                "scrambled": "eveihca",
                "index": 2
            },
            {
                "original": "inwardly",
                "scrambled": "ylwardni",
                "index": 3
            },
            {
                "original": "reality",
                "scrambled": "rialyet",
                "index": 7
            }
        ],
        "date": "2025-08-30"
    },
    {
        "text": "The only thing we have to fear is fear itself.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "tlevesoor erodoeht",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "ylno",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "gniht",
                "index": 2
            },
            {
                "original": "fear",
                "scrambled": "raef",
                "index": 6
            },
            {
                "original": "itself",
                "scrambled": "flesti",
                "index": 9
            }
        ],
        "date": "2025-08-31"
    }
];

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quotesCalendar;
}
