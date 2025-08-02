define({
  "kill": {
    "elimination": {
      "string": "Ennemi éliminé : `1%s",
      "regex_match": "^Ennemi éliminé : `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "KO : `1%s\n`2Dégâts infligés : `3%s",
      "regex_match": "^KO : `1.*\n`2Dégâts infligés : `3.*$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Assistance ; élimination : %s",
      "regex_match": "^Assistance ; élimination : .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Assistance ; KO : `1%s\n`2Dégâts infligés : `3%s",
      "regex_match": "^Assistance ; KO : `1.*\n`2Dégâts infligés : `3.*$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Exécution": "Finisher",
      "Chute": "Fall",
      "Hors limites": "Out of Bounds",
      "Suicide": "Committed Suicide",
      "Frag": "Killed",
      "Fumée fatale": "Smoke Launcher",
      "Barrage rampant": "Creeping Barrage",
      "Mêlée": "Melee",
      "Mêlée kunaï": "Kunai Melee",
      "Hémorragie": "Bleed_out",
      "Gaz caustique": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})