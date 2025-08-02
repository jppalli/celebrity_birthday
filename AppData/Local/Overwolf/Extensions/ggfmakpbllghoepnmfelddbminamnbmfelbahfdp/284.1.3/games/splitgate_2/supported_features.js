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
            scene: {
                category: "game_info",
                key: "scene",
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
            round_start: {
                name: 'round_start',
                data: null
            },
            round_end: {
                name: 'round_end',
                data: null
            },
            kill: {
                name: 'kill',
                data: null
            },
            death: {
                name: 'death',
                data: null
            },
        },
        info: {
            map: {
                category: "match_info",
                key: "map",
            },
            match_outcome: {
                category: "match_info",
                key: "match_outcome",
            },
            round_outcome: {
                category: "match_info",
                key: "round_outcome",
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