define({
  "kill": {
    "elimination": {
      "string": "`1%s eliminiert",
      "regex_match": "^`1.* eliminiert$",
      "regex_extract": "`1[ ]*(.*) "
    },
    "knockdown": {
      "string": "Niedergeschlagen `1%s\n`3%s`2 Schaden verursacht",
      "regex_match": "^Niedergeschlagen `1.*\n`3.*`2 Schaden verursacht$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Assist, Eliminierung %s",
      "regex_match": "^Assist, Eliminierung .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Assist, Niederschlagen `1%s\n`3%s`2 Schaden verursacht",
      "regex_match": "^Assist, Niederschlagen `1.*\n`3.*`2 Schaden verursacht$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Finisher": "Finisher",
      "Sturz": "Fall",
      "Zutritt verboten": "Out of Bounds",
      "Selbstmord": "Committed Suicide",
      "Eliminiert": "Killed",
      "Rauchwerfer": "Smoke Launcher",
      "Kriechendes Sperrfeuer": "Creeping Barrage",
      "Nahkampf": "Melee",
      "Kunai-Nahkampf": "Kunai Melee",
      "Verbluten": "Bleed_out",
      "Ätzendes Gas": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})