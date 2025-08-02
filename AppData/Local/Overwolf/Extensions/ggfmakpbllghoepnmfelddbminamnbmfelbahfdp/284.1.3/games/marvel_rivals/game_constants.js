define([], function () {
    const Constants = {
        character_id: {
            0: null,
            1011: "BRUCE BANNER",
            1014: "THE PUNISHER",
            1015: "STORM",
            1016: "LOKI",
            1017: "HUMAN TORCH",
            1018: "DOCTOR STRANGE",
            1020: "MANTIS",
            1021: "HAWKEYE",
            1022: "CAPTAIN AMERICA",
            1023: "ROCKET RACCOON",
            1024: "HELA",
            1025: "CLOAK & DAGGER",
            1026: "BLACK PANTHER",
            1027: "GROOT",
            1028: "ULTRON",
            1029: "MAGIK",
            1030: "MOON KNIGHT",
            1031: "LUNA SNOW",
            1032: "SQUIRREL GIRL",
            1033: "BLACK WIDOW",
            1034: "IRON MAN",
            1035: "VENOM",
            1036: "SPIDER-MAN",
            1037: "MAGNETO",
            1038: "SCARLET WITCH",
            1039: "THOR",
            1040: "MISTER FANTASTIC",
            1041: "WINTER SOLDIER",
            1042: "PENI PARKER",
            1043: "STAR-LORD",
            1045: "NAMOR",
            1046: "ADAM WARLOCK",
            1047: "JEFF THE LAND SHARK",
            1048: "PSYLOCKE",
            1049: "WOLVERINE",
            1050: "INVISIBLE WOMAN",
            1051: "THE THING",
            1052: "IRON FIST",
            1053: "EMMA FROST",
            1054: "PHOENIX"
        },
        mode_id: {
            "1247": {
                "game_type": "Practice",
                "map": "Practice Range",
                "game_mode": "Practice Range"
            },
            "1253": {
                "game_type": "Practice",
                "map": "Shin-shibuya",
                "game_mode": "Tutorial"
            },
            "1261": {
                "game_type": "Practice",
                "map": "Royal palace",
                "game_mode": "Domination tutorial"
            },
            "1262": {
                "game_type": "Practice",
                "map": "Yggdrasill path",
                "game_mode": "Convoy tutorial"
            },
            "1266": {
                "game_type": "Practice",
                "map": "Shin-shibuya",
                "game_mode": "Hero tutorial"
            },
            "1293": {
                "game_type": "Practice",
                "map": "Sanctum sanctorum",
                "game_mode": "Doom match",
            },
            "1032": {
                "game_type": "Quick match",
                "map": "Yggdrasill path",
                "game_mode": "Convoy"
            },
            "1034": {
                "game_type": "Quick match",
                "map": "Shin-shibuya",
                "game_mode": "Convergence"
            },
            "1101": {
                "game_type": "Quick match",
                "map": "Hall of Djalia",
                "game_mode": "Convergence"
            },
            "1148": {
                "game_type": "Quick match",
                "map": "Spider-islands",
                "game_mode": "Convoy"
            },
            "1170": {
                "game_type": "Quick match",
                "map": "Royal palace",
                "game_mode": "Domination"
            },
            "1201": {
                "game_type": "Quick match",
                "map": "Midtown",
                "game_mode": "Convoy"
            },
            "1217": {
                "game_type": "Quick match",
                "map": "Central park",
                "game_mode": "Convergence"
            },
            "1235": {
                "game_type": "Quick match",
                "map": "Birnin t'challa",
                "game_mode": "Domination"
            },
            "1240": {
                "game_type": "Quick match",
                "map": "Symbiotic surface",
                "game_mode": "Convergence"
            },
            "1286": {
                "game_type": "Quick match",
                "map": "Arakko",
                "game_mode": "Convoy"
            },
            "1287": {
                "game_type": "Quick match",
                "map": "Hell's heaven",
                "game_mode": "Domination"
            },
            "1309": {
                "game_type": "Quick match",
                "map": "Krakoa",
                "game_mode": "Domination"
            },
             "1317": {
                "game_type": "Quick match",
                "map": "Celestial husk",
                "game_mode": "Domination"
            },
            "1230": {
                "game_type": "Competitive",
                "map": "Shin-shibuya",
                "game_mode": "Convergence"
            },
            "1231": {
                "game_type": "Competitive",
                "map": "Yggdrasill path",
                "game_mode": "Convoy"
            },
            "1236": {
                "game_type": "Competitive",
                "map": "Royal palace",
                "game_mode": "Domination"
            },
            "1245": {
                "game_type": "Competitive",
                "map": "Spider-islands",
                "game_mode": "Convoy"
            },
            "1267": {
                "game_type": "Competitive",
                "map": "Hall of Djalia",
                "game_mode": "Convergence"
            },
            "1272": {
                "game_type": "Competitive",
                "map": "Birnin t'challa",
                "game_mode": "Domination"
            },
            "1288": {
                "game_type": "Competitive",
                "map": "Hell's heaven",
                "game_mode": "Domination"
            },
            "1290": {
                "game_type": "Competitive",
                "map": "Symbiotic surface",
                "game_mode": "Convergence"
            },
            "1291": {
                "game_type": "Competitive",
                "map": "Midtown",
                "game_mode": "Convoy"
            },
            "1292": {
                "game_type": "Competitive",
                "map": "Central park",
                "game_mode": "Convergence"
            },
            "1310": {
                "game_type": "Competitive",
                "map": "Krakoa",
                "game_mode": "Domination"
            },
            "1311": {
                "game_type": "Competitive",
                "map": "Arakko",
                "game_mode": "Convoy"
            },
            "1118": {
                "game_type": "Arcade",
                "map": "Sanctum sanctorum",
                "game_mode": "Doom match"
            },
            "1246": {
                "game_type": "Arcade",
                "map": "Ninomaru",
                "game_mode": "Conquest"
            },
            "1254": {
                "game_type": "Arcade",
                "map": "Royal palace",
                "game_mode": "Jeff's winter splash festival"
            },
            "1289": {
                "game_type": "Arcade",
                "map": "World Arena",
                "game_mode": "Clash of dancing lions"
            },
            "1312": {
                "game_type": "Arcade",
                "map": "Ninomaru",
                "game_mode": "Giant size brain blast"
            },
             "1314": {
                "game_type": "Arcade",
                "map": "Digital duel grounds",
                "game_mode": "Ultrons battle matrix protac"
            },
        },
    };

    return Constants;
});