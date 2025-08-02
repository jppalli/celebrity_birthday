define({
  "kill": {
    "elimination": {
      "string": "消滅了 `1%s",
      "regex_match": "^消滅了 `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "擊倒 `1%s\n造成 `3%s`2 點傷害",
      "regex_match": "^擊倒 `1.*\n造成 `3.*`2 點傷害$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "助攻，消滅了 %s",
      "regex_match": "^助攻，消滅了 .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "助攻、擊倒 `1%s\n造成 `3%s`2 點傷害",
      "regex_match": "^助攻、擊倒 `1.*\n造成 `3.*`2 點傷害$",
      "regex_extract": "`1[ ]*(.*)\\n"
    }
  },
  "killfeed": {
    "dictionary": {
      "終結者": "Finisher",
      "墜落": "Fall",
      "出界": "Out of Bounds",
      "自殺": "Committed Suicide",
      "已擊殺": "Killed",
      "煙霧發射器": "Smoke Launcher",
      "詭異砲火": "Creeping Barrage",
      "近戰": "Melee",
      "苦無近戰": "Kunai Melee",
      "失血": "Bleed_out",
      "腐蝕毒氣": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})