define({
  "kill": {
    "elimination": {
      "string": "Eliminated `1%s",
      "regex_match": "^Eliminated `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "Knocked Down `1%s\n`3%s`2 Damage Inflicted",
      "regex_match": "^Knocked Down `1.*\n`3.*`2 Damage Inflicted$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Assist, Elimination %s",
      "regex_match": "^Assist, Elimination .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Assist, Knocked Down `1%s\n`3%s`2 Damage Inflicted",
      "regex_match": "^Assist, Knocked Down `1.*\n`3.*`2 Damage Inflicted$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "finisher": {
      "string": "FINISHER%s",
      "regex_match": "^FINISHER.*$",
    },
    "squad_wipe": {
      "string": "Squad Wipe\n %s",
      "regex_match": "^Squad Wipe\n.*$",
    }
  },
  "killfeed": {
    "dictionary": {
      "Finisher": "Finisher",
      "Fall": "Fall",
      "Out of Bounds": "Out of Bounds",
      "Committed Suicide": "Committed Suicide",
      "Killed": "Killed",
      "Smoke Launcher": "Smoke Launcher",
      "Creeping Barrage": "Creeping Barrage",
      "Melee": "Melee",
      "Kunai Melee": "Kunai Melee",
      "Bleed Out": "Bleed_out",
      "Caustic Gas": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})