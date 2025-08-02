define({
  "kill": {
    "elimination": {
      "string": "已消灭 `1%s",
      "regex_match": "^已消灭 `1.*$",
      "regex_extract": "`1[ ]*(.*)$"
    },
    "knockdown": {
      "string": "击倒 `1%s\n造成 `3%s `2点伤害",
      "regex_match": "^击倒 `1.*\n造成 `3.* `2点伤害$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "助攻，消灭 %s",
      "regex_match": "^助攻，消灭 .*$",
      "regex_extract": "(?<=\\s)\\S+$"
    },
    "assist_knockdown": {
      "string": "助攻，击倒 `1%s\n`2造成 `3%s `2点伤害",
      "regex_match": "^助攻，击倒 `1.*\n`2造成 `3.* `2点伤害$",
      "regex_extract": "(?<=1)\\S+(?=\n)"
    }
  },
  "killfeed": {
    "dictionary": {
      "终结技": "Finisher",
      "坠落": "Fall",
      "越界": "Out of Bounds",
      "自杀": "Committed Suicide",
      "死亡": "Killed",
      "烟雾发射器": "Smoke Launcher",
      "渐进弹幕轰击": "Creeping Barrage",
      "近战攻击": "Melee",
      "苦无近战": "Kunai Melee",
      "失血过多": "Bleed_out",
      "侵蚀毒气": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})