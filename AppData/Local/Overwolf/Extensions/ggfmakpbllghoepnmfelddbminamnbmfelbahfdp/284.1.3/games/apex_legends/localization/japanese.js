define({
  "kill": {
    "elimination": {
      "string": "`1%s`0を撃破",
      "regex_match": "^`1.*`0を撃破$",
      "regex_extract": "`1[ ]*(.*)`"
    },
    "knockdown": {
      "string": "`1%s`0をノックダウン\n`2与ダメージ: `3%s",
      "regex_match": "^`1.*`0をノックダウン\n`2与ダメージ: `3.*$",
      "regex_extract": "`1[ ]*(.*)`0"
    },
    "assist_elimination": {
      "string": "%sの撃破をアシスト",
      "regex_match": "^.*の撃破をアシスト$",
      "regex_extract": "\\S+(?=の撃破をアシスト)"
    },
    "assist_knockdown": {
      "string": "`1%s`0のノックダウンをアシスト\n`2与ダメージ: `3%s",
      "regex_match": "^`1.*`0のノックダウンをアシスト\n`2与ダメージ: `3.*$",
      "regex_extract": "(?<=`1)\\S+(?=`0)"
    }
  },
  "killfeed": {
    "dictionary": {
      "フィニッシャー": "Finisher",
      "落下": "Fall",
      "ラインオーバー": "Out of Bounds",
      "自殺": "Committed Suicide",
      "キル": "Killed",
      "スモークランチャー": "Smoke Launcher",
      "支援爆撃": "Creeping Barrage",
      "格闘": "Melee",
      "クナイ格闘": "Kunai Melee",
      "失血死": "Bleed_out",
      "コースティックガス": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})