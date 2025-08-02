define({
  "kill": {
    "elimination": {
      "string": "Уничтожен `1%s",
      "regex_match": "^Уничтожен `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "Нокаутирован `1%s\n`2Нанесено урона: `3%s",
      "regex_match": "^Нокаутирован `1.*\n`2Нанесено урона: `3.*$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "Содействие в уничтожении %s",
      "regex_match": "^Содействие в уничтожении .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "Содействие в нокауте `1%s\n`2Нанесено урона: `3%s",
      "regex_match": "^Содействие в нокауте `1.*\n`2Нанесено урона: `3.*$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "Казнь": "Finisher",
      "Падение": "Fall",
      "Вне границ": "Out of Bounds",
      "Самоубийство": "Committed Suicide",
      "Убит": "Killed",
      "Дымовая пушка": "Smoke Launcher",
      "Огневой вал": "Creeping Barrage",
      "Рукопашный бой": "Melee",
      "Удар кунаем": "Kunai Melee",
      "Потеря крови": "Bleed_out",
      "Ядовитый газ": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})