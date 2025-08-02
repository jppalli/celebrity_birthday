define({
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
            assist: {
                name: 'assist',
                data: null
            },
            kill_feed: {
                name: 'kill_feed',
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
            headshot: {
                name: 'headshot',
                data: null
            }
        },
        info: {
            roster_: {
                key: 'roster_',
                category: 'match_info'
            },
            game_mode: {
                key: 'game_mode',
                category: 'match_info'
            },
            match_outcome: {
                key: 'match_outcome',
                category: 'match_info'
            },
            map_name: {
                key: 'map_name',
                category: 'live_data'
            },
            steam_id: {
                key: 'steam_id',
                category: 'live_data'
            },
            mode_name: {
                key: 'mode_name',
                category: 'live_data'
            },
            game_phase: {
                key: 'game_phase',
                category: 'live_data'
            },
            round_phase: {
                key: 'round_phase',
                category: 'live_data'
            },
            score: {
                key: 'score',
                category: 'live_data'
            },
            kills: {
                key: 'kills',
                category: 'match_info'
            },
            deaths: {
                key: 'deaths',
                category: 'match_info'
            },
            assists: {
                key: 'assists',
                category: 'match_info'
            },
            mvps: {
                key: 'mvps',
                category: 'match_info'
            },
            pseudo_match_id: {
                key: 'pseudo_match_id',
                category: 'match_info'
            },
            elo_points: {
                key: 'elo_points',
                category: 'match_info'
            },
            round_number: {
                key: 'round_number',
                category: 'live_data'
            },
            is_ranked: {
                key: 'is_ranked',
                category: 'match_info'
            },
            mm_state: {
                key: 'mm_state',
                category: 'match_info'
            },
        },
    },
    live_data: {
        name: "live_data",
        events: {
        },
        info: {
            player: {
                key: 'player',
                category: 'live_data'
            },
            provider: {
                key: 'provider',
                category: 'live_data'
            },
            round: {
                key: 'round',
                category: 'live_data'
            },
            map: {
                key: 'map',
                category: 'live_data'
            },
        },
    },
})