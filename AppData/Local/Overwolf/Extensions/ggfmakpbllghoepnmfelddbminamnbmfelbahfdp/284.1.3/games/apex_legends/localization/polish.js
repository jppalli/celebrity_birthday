define({
  "kill": {
    "elimination": {
      "string": "Wyeliminowano `1%s",
      "regex_match": "^Wyeliminowano `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "Powalenie gracza: `1%s\nIlość zadanych obrażeń: `3%s`2",
      "regex_match": "^Powalenie gracza: `1.*\nIlość zadanych obrażeń: `3.*`2$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Asysta, Eliminacja %s",
      "regex_match": "^Asysta, Eliminacja .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Asysta przy powaleniu gracza: `1%s\nIlość zadanych obrażeń: `3%s`2",
      "regex_match": "^Asysta przy powaleniu gracza: `1.*\nIlość zadanych obrażeń: `3.*`2$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Egzekucja": "Finisher",
      "Upadek": "Fall",
      "Wyautowanie": "Out of Bounds",
      "Samobójstwo": "Committed Suicide",
      "Zabito": "Killed",
      "Wyrzutnia Dymu": "Smoke Launcher",
      "Pełznąca salwa": "Creeping Barrage",
      "Walka wręcz": "Melee",
      "Kunai (broń do walki wręcz)": "Kunai Melee",
      "Wykrwawienie": "Bleed_out",
      "Żrący gaz": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})