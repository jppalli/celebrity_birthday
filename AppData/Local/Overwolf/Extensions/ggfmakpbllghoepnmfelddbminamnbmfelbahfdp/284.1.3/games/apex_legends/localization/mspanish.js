define({
  "kill": {
    "elimination": {
      "string": "Eliminado `1%s",
      "regex_match": "^Eliminado `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "Derribo de `1%s\n`3%s`2 Daño infligido",
      "regex_match": "^Derribo de `1.*\n`3.*`2 Daño infligido$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Asistencia, eliminación %s",
      "regex_match": "^Asistencia, eliminación .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Asistencia, derribo de `1%s\n`3%s`2 Daño infligido",
      "regex_match": "^Asistencia, derribo de `1.*\n`3.*`2 Daño infligido$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Ejecución": "Finisher",
      "Caída": "Fall",
      "Fuera de los límites": "Out of Bounds",
      "Suicidio": "Committed Suicide",
      "Eliminado": "Killed",
      "Lanzahumo": "Smoke Launcher",
      "Bombardeo progresivo": "Creeping Barrage",
      "Cuerpo a cuerpo": "Melee",
      "Cuerpo a cuerpo con kunái": "Kunai Melee",
      "Desangrado": "Bleed_out",
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