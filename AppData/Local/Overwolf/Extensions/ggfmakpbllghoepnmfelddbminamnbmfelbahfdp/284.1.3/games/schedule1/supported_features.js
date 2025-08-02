define({
    game_info: {
        name: "game_info",
        events: {
        },
        info: {
            player_id: {
                category: "game_info",
                key: "player_id",
            },
            player_name: {
                category: "game_info",
                key: "player_name",
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
            sleep_start: {
                name: 'sleep_start',
                data: null
            },
            sleep_end: {
                name: 'sleep_end',
                data: null
            },
        },
        info: {
            player_rank: {
                category: "match_info",
                key: "player_rank",
            },
            pursuit_level: {
                category: "match_info",
                key: "pursuit_level",
            },
        },
    },
    location: {
        name: 'location',
        events: {
            location: {
                name: 'location',
                data: null
            },
        },
    },
})