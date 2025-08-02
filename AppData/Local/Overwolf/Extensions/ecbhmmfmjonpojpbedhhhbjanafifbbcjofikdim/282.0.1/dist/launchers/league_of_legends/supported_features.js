define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SupportedFeatures = void 0;
    exports.SupportedFeatures = {
        lcu_info: {
            feature: "lcu_info",
            infoDB: {
                token: {
                    category: "credentials",
                    key: "token"
                },
                port: {
                    category: "credentials",
                    key: "port"
                }
            }
        },
        summoner_info: {
            feature: "summoner_info",
            infoDB: {
                displayName: {
                    category: "summoner_info",
                    key: "display_name"
                },
                internalName: {
                    category: "summoner_info",
                    key: "internal_name"
                },
                accountId: {
                    category: "summoner_info",
                    key: "account_id"
                },
                summonerId: {
                    category: "summoner_info",
                    key: "summoner_id"
                },
                profileIconId: {
                    category: "summoner_info",
                    key: "profile_icon_id"
                },
                summonerLevel: {
                    category: "summoner_info",
                    key: "summoner_level"
                },
                region: {
                    category: "summoner_info",
                    key: "region"
                },
                locale: {
                    category: "summoner_info",
                    key: "locale"
                },
                webLanguage: {
                    category: "summoner_info",
                    key: "web_language"
                },
                webRegion: {
                    category: "summoner_info",
                    key: "web_region"
                },
                platformId: {
                    category: "summoner_info",
                    key: "platform_id"
                },
                isGarenaUser: {
                    category: "summoner_info",
                    key: "is_garena_user"
                },
                player_info: {
                    category: "summoner_info",
                    key: "player_info"
                },
                current_rp: {
                    category: "summoner_info",
                    key: "current_rp"
                }
            }
        },
        game_flow: {
            feature: "game_flow",
            infoDB: {
                phase: {
                    category: "game_flow",
                    key: "phase"
                }
            }
        },
        champ_select: {
            feature: "champ_select",
            infoDB: {
                raw: {
                    category: "champ_select",
                    key: "raw"
                }
            }
        },
        clash: {
            feature: "clash",
            infoDB: {
                tournament_summary: {
                    category: "clash",
                    key: "tournament_summary"
                }
            }
        },
        lobby_info: {
            feature: "lobby_info",
            infoDB: {
                queueId: {
                    category: "lobby_info",
                    key: "queueId"
                }
            }
        },
        end_game: {
            feature: "end_game",
            infoDB: {
                arena_end_game_stats: {
                    category: "end_game_arena",
                    key: "arena_end_game_stats"
                },
                tft_end_game_stats: {
                    category: "end_game_tft",
                    key: "tft_end_game_stats"
                },
                lol_end_game_stats: {
                    category: "end_game_lol",
                    key: "lol_end_game_stats"
                },
                league_points: {
                    category: "end_game_lol",
                    key: "league_points"
                }
            }
        },
        game_info: {
            feature: "game_info",
            infoDB: {
                game_version: {
                    category: "game_info",
                    key: "game_version"
                },
                close_client_during_game: {
                    category: "game_info",
                    key: "close_client_during_game"
                },
                selected_game: {
                    category: "game_info",
                    key: "selected_game"
                },
                selected_positions: {
                    category: "game_info",
                    key: "selected_positions"
                },
                quickplay_info: {
                    category: "game_info",
                    key: "quickplay_info"
                },
                quickplay_champions: {
                    category: "game_info",
                    key: "quickplay_champions"
                }
            }
        }
    };
});
