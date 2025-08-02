define({
    game_info: {
        name: "game_info",
        events: {
        },
        info: {
            scene: {
                category: "game_info",
                key: "scene",
            },
            player_name: {
                category: "game_info",
                key: "player_name",
            },
            party_players: {
                category: "game_info",
                key: "party_players",
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
            death: {
                name: 'death',
                data: null
            },
            teammate_death: {
                name: 'teammate_death',
                data: null
            },
            checkpoint: {
                name: 'checkpoint',
                data: null
            },
        },
        info: {
        },
    },
})