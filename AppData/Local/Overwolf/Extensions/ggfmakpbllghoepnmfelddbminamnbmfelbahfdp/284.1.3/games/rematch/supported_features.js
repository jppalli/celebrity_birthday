define({
    game_info: {
        name: "game_info",
        events: {
        },
        info: {
            player_name: {
                category: "game_info",
                key: "player_name",
            },
            player_id: {
                category: "game_info",
                key: "player_id",
            },
            scene: {
                category: "game_info",
                key: "scene",
            },
            game_mode: {
                category: "game_info",
                key: "game_mode",
            },
        },
    },
    match_info: {
        name: "match_info",
        events: {
            match_start: {
                name: 'match_start',
                data: null
            },
            match_end: {
                name: 'match_end',
                data: null
            },
            team_goal: {
                name: 'team_goal',
                data: null
            },
            opponent_goal: {
                name: 'opponent_goal',
                data: null
            },
            score_right: {
                name: 'score_right',
                data: null
            },
            score_left: {
                name: 'score_left',
                data: null
            },
        },
        info: {
            match_outcome: {
                category: "match_info",
                key: "match_outcome",
            },
            score: {
                category: "match_info",
                key: "score",
            },
        },
    },
})