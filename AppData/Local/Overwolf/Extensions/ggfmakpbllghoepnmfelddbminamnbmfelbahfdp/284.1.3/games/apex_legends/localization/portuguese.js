define({
  "kill": {
    "elimination": {
      "string": "Eliminou `1%s",
      "regex_match": "^Eliminou `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "Derrubou `1%s\nDano causado: `3%s`2",
      "regex_match": "^Derrubou `1.*\nDano causado: `3.*`2$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Assistência, Eliminação %s",
      "regex_match": "^Assistência, Eliminação .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Assistência, Derrubou `1%s\nDano causado: `3%s`2",
      "regex_match": "^Assistência, Derrubou `1.*\nDano causado: `3.*`2$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Finalização": "Finisher",
      "Queda": "Fall",
      "Além do Limite": "Out of Bounds",
      "Suicídio": "Committed Suicide",
      "Eliminado": "Killed",
      "Lançador de Fumaça": "Smoke Launcher",
      "Barragem Crescente": "Creeping Barrage",
      "Corpo a corpo": "Melee",
      "Corpo a corpo com kunai": "Kunai Melee",
      "Hemorragia": "Bleed_out",
      "Gás Cáustico": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})