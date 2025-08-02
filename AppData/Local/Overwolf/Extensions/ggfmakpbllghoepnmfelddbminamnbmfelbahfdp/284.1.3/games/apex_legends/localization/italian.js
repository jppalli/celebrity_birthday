define({
  "kill": {
    "elimination": {
      "string": "`1%s eliminato",
      "regex_match": "^`1.* eliminato$",
      "regex_extract": "`1[ ]*(.*) "
    },
    "knockdown": {
      "string": "`1%s KO\n`3%s`2 danni inflitti",
      "regex_match": "^`1.* KO\n`3.*`2 danni inflitti$",
      "regex_extract": "`1[ ]*(.*) KO"
    },
    "assist_elimination": {
      "string": "Assist Uccisione %s",
      "regex_match": "^Assist Uccisione .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Assist KO `1%s\n`3%s`2 danni inflitti",
      "regex_match": "^Assist KO `1.*\n`3.*`2 danni inflitti$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Esecuzione": "Finisher",
      "Caduto": "Fall",
      "Fuori dai limiti": "Out of Bounds",
      "Suicidato": "Committed Suicide",
      "Ucciso": "Killed",
      "Cortina di fumo": "Smoke Launcher",
      "Rombo di tuono": "Creeping Barrage",
      "Corpo a corpo": "Melee",
      "Corpo a corpo Kunai": "Kunai Melee",
      "Dissanguamento": "Bleed_out",
      "Gas caustico": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})