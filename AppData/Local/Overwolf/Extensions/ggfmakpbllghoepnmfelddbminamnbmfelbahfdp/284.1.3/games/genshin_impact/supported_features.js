define({
    game_info: {
        name: "game_info",
        events: {
            character_switch: {
                name: 'character_switch',
                data: null
            }
        },
        info: {
            player_id: {
                category: "game_info",
                key: "player_id",
            },
            character_name: {
                category: "character_info",
                key: "character_name",
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
            dungeon_start: {
                name: 'dungeon_start',
                data: null
            },
            dungeon_end: {
                name: 'dungeon_end',
                data: null
            },
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
})