define({
  "kill": {
    "elimination": {
      "string": "`1%s 제거",
      "regex_match": "^`1.* 제거$",
      "regex_extract": "`1[ ]*(.*) "
    },
    "knockdown": {
      "string": "녹다운 `1%s\n가한 대미지 `3%s`2",
      "regex_match": "^녹다운 `1.*\n가한 대미지 `3.*`2$",
      "regex_extract": "`1[ ]*(.*)\\n"
    },
    "assist_elimination": {
      "string": "%s 처치 지원",
      "regex_match": "^.* 처치 지원$",
      "regex_extract": "\\S+(?= 처치 지원)"
    },
    "assist_knockdown": {
      "string": "1%s 녹다운 지원\n`2가한 대미지:`3%s",
      "regex_match": "^1.* 녹다운 지원\n`2가한 대미지:`3.*$",
      "regex_extract": "(?<=1)\\S+(?= 녹다운)"
    }
  },
  "killfeed": {
    "dictionary": {
      "피니셔": "Finisher",
      "추락": "Fall",
      "장외 이탈": "Out of Bounds",
      "자살": "Committed Suicide",
      "처치": "Killed",
      "스모크 런처": "Smoke Launcher",
      "잠행 탄막": "Creeping Barrage",
      "근접 공격": "Melee",
      "쿠나이 근접 무기": "Kunai Melee",
      "출혈": "Bleed_out",
      "부식성 가스": "Caustic Gas"
    },
    "regex": {
      "match": "`\\d(\\[.*\\])?\\s?.*`\\d \\[.*\\] `\\d(\\[.*\\])?\\s?.*$",
      "victimName": "(?<=`2(\\[.*\\])?\\s?).*$",
      "attackerName": "(?<=`1(\\[.*\\])?\\s?).*(?=`3)",
      "action": "(?<=`3\\s\\[).*(?=\\]\\s`2)"
    }
  }
})