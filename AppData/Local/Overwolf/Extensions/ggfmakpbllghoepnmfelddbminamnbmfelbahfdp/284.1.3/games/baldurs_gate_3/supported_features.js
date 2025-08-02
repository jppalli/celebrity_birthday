define({
    game_info: {
        name: "game_info",
        info: {
            scene: {
                category: "game_info",
                key: "scene",
            }
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
            kill: {
                name: 'kill',
                data: null
            },
            death: {
                name: 'death',
                data: null
            }
        },
        info: {
            match_state: {
                category: 'match_info',
                key: 'match_state'
            },
            match_outcome: {
                category: 'match_info',
                key: 'match_outcome'
            },
        },
    },
    location: {
        name: "location",
        info: {
            location_camera: {
                category: "location",
                key: "location_camera",
            },
            location_players: {
                category: "location",
                key: "location_players",
            },
            main_map: {
                category: "location",
                key: "main_map",
            },
            sub_map: {
                category: "location",
                key: "sub_map",
            }
        },
    },
})